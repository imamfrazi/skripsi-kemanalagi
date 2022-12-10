const fs = require("fs");
const { readdir, stat } = require("fs/promises");
const path = require("path");
const axios = require("axios");
const FormData = require("form-data");

const { triggerRelay } = require("./hid");
const { Op, fn, col } = require("sequelize");

const logger = require("../logger");
const db = require("../models");
const Product = db.products;
const ProductInspection = db.products_inspections;

const dirSize = async (dir) => {
  try {
    const files = await readdir(dir, { withFileTypes: true });
    const paths = files.map(async (file) => {
      const filePath = path.join(dir, file.name);

      if (file.isDirectory()) return await dirSize(filePath);

      if (file.isFile()) {
        const { size } = await stat(filePath);

        return size;
      }

      return 0;
    });

    return (await Promise.all(paths))
      .flat(Infinity)
      .reduce((i, size) => i + size, 0);
  } catch (error) {
    return 0;
  }
};

checkCurrentDir = () => {
  //joining path of directory
  const directoryPath = process.env.SCAN_IMG_URL;

  try {
    const files = fs
      .readdirSync(directoryPath, { withFileTypes: true })
      .filter((dirent) => dirent.isFile())
      .map((dirent) => dirent.name);
    return files.length;
  } catch (error) {
    throw error;
  }
};

saveImageToDB = (qrCode, userId) => {
  //joining path of directory
  logger.debug(
    `[saveImageToDB] Method is called with parameter qrCode: ${qrCode}; userId: ${userId}`
  );
  const directoryPath = process.env.SCAN_IMG_URL;
  logger.debug(
    `[saveImageToDB] Method is called with directoryPath: ${directoryPath}`
  );

  return new Promise((myResolve, myReject) => {
    try {
      const files = fs
        .readdirSync(directoryPath, { withFileTypes: true })
        .filter((dirent) => dirent.isFile())
        .map((dirent) => dirent.name);

      logger.debug(
        `[saveImageToDB] Reading files in a folder before saving the image: ${JSON.stringify(
          files
        )}`
      );
      const filesLength = files.length;
      logger.debug(
        `[saveImageToDB] Total length of the files in the folder: ${filesLength}`
      );
      let countFile = 0;
      logger.debug(
        `[upload2AiScan] Query Product with qrCode: ${qrCode} and userId: ${userId}`
      );
      Product.findOne({
        where: {
          qrCode: { [Op.eq]: qrCode },
          userId: { [Op.eq]: userId },
        },
        order: [["id", "DESC"]],
      }).then(async (item) => {
        if (item !== null) {
          logger.debug(
            `[saveImageToDB] Product is not null with parameter qrCode: ${qrCode}; userId: ${userId}`
          );
          logger.debug("[saveImageToDB] File loop will start");

          const getImage = await ProductInspection.findAll({
            attributes: [[fn("DISTINCT", col("image")), "image"]],
          });
          const listImage = getImage.map((data) => data.image);
          for (let idx = 0; idx < filesLength; idx++) {
            if (!listImage.includes(files[idx])) {
              logger.debug(
                `[saveImageToDB] Query ProductInspection with image equal: ${files[idx]}`
              );
              await ProductInspection.findOne({
                where: {
                  image: {
                    [Op.eq]: files[idx],
                  },
                },
              })
                .then((product) => {
                  const imagePath = `${process.env.SCAN_IMG_URL}/${files[idx]}`;
                  if (product === null) {
                    // && countFile < 8
                    logger.debug(
                      `[saveImageToDB] Image is saved in ProductInspection with image name: ${
                        files[idx]
                      }; idx: ${idx}; product: ${
                        product === null
                      }; countFile: ${countFile}`
                    );
                    countFile += 1;
                    const props = {
                      productId: item.id,
                      image: files[idx],
                      imagePath,
                    };
                    ProductInspection.create({
                      ...props,
                    }).then(() => {
                      logger.debug(
                        `[saveImageToDB] Image has been successfully saved to db: ${JSON.stringify(
                          props
                        )}`
                      );
                    });
                  } else {
                    logger.debug(
                      `[saveImageToDB] Image is not saved in ProductInspection with image name: ${
                        files[idx]
                      }; idx: ${idx}; product: ${
                        product === null
                      }; countFile: ${countFile}`
                    );
                  }
                })
                .catch((err) => {
                  logger.error(
                    `[saveImageToDB] Error when query findOne in ProductInspection: ${JSON.stringify(
                      err
                    )}`
                  );
                });
            }
          }
          logger.debug("[saveImageToDB] All image has been saved completely");
          myResolve({
            status: 200,
            message: "Product function has finished running",
          });
        } else {
          logger.debug(
            `[saveImageToDB] Product is null with parameter qrCode: ${qrCode}; userId: ${userId}`
          );
          myReject({
            status: 400,
            message: "Product data is null",
          });
        }
      });
    } catch (error) {
      logger.error(`[saveImageToDB] Error: ${JSON.stringify(error)}`);
      myReject({ status: 400, message: error });
    }
  });
};

upload2AiScan = (qrCode, userId) => {
  logger.debug(
    `[upload2AiScan] Method is called with parameter qrCode: ${qrCode}; userId: ${userId}`
  );
  return new Promise((myResolve, myReject) => {
    const staticImgPath = process.env.SCAN_IMG_URL;
    try {
      if (!userId || !qrCode) {
        logger.debug(
          `[upload2AiScan] Parameter qrCode: ${qrCode} or userId: ${userId} is empty`
        );
        myReject({ status: 400, message: "Unprocessable request" });
      }

      logger.debug(
        `[upload2AiScan] Query Product with qrCode: ${qrCode} and userId: ${userId}`
      );
      Product.findOne({
        where: {
          qrCode: { [Op.eq]: qrCode },
          userId: { [Op.eq]: userId },
        },
        order: [["id", "DESC"]],
      }).then((item) => {
        if (item === null) {
          logger.debug(
            `[upload2AiScan] Query Product with qrCode: ${qrCode} and userId: ${userId} is empty`
          );
          myReject({ status: 400, message: "Data not found!" });
        } else {
          logger.debug(
            `[upload2AiScan] Query Product with qrCode: ${qrCode} and userId: ${userId} is found`
          );
          logger.debug(
            `[upload2AiScan] Query ProductInspection with productId equal: ${item.id} with order by id in DESC mode`
          );
          ProductInspection.findAll({
            where: {
              productId: {
                [Op.eq]: item.id,
              },
              aiGenerated: {
                [Op.eq]: false,
              },
            },
            order: [["id", "DESC"]],
            // limit: 8,
          })
            .then(async (resp) => {
              if (resp.length === 0) {
                logger.debug(
                  `[upload2AiScan] Query ProductInspection with productId equal: ${item.id} is empty`
                );
                myReject({
                  status: 400,
                  message: "Product Inspection Not found.",
                });
              } else {
                // const latestDate = new Date(resp[0].createdAt);
                // const result = resp.filter((item) => {
                //   const itemDate = new Date(item.createdAt);
                //   const diffInSecond =
                //     (latestDate.getTime() - itemDate.getTime()) / 1000;
                //   return diffInSecond < 15;
                // });
                logger.debug(
                  `[upload2AiScan] Query ProductInspection with productId equal: ${item.id} is found`
                );
                const result = resp;
                const resultLength = result.length > 8 ? 8 : result.length;
                const form = new FormData();
                logger.debug(
                  `[upload2AiScan] Response length is: ${result.length} and changed to: ${resultLength}`
                );
                let lengthFile = 0;
                for (let idx = 0; idx < resultLength; idx++) {
                  const totalFile = await ProductInspection.count({
                    where: {
                      image: {
                        [Op.eq]: result[idx].image,
                      },
                      aiGenerated: {
                        [Op.eq]: true,
                      },
                    },
                  });
                  if (totalFile === 0) {
                    lengthFile += 1;
                    const imgPath = path.join(staticImgPath, result[idx].image);
                    const file = fs.createReadStream(imgPath);

                    form.append("files", file);
                  }
                }
                logger.debug(
                  `[upload2AiScan] Form created for scanAI: ${JSON.stringify(
                    form
                  )}`
                );

                logger.debug("[upload2AiScan] scanAI method is called");
                if (lengthFile !== 0) {
                  scanAI(qrCode, userId, form, result)
                    .then((resp) => {
                      logger.debug(
                        `[upload2AiScan] scanAI method is success, message: ${JSON.stringify(
                          resp
                        )}`
                      );
                      myResolve({ status: 200, message: resp.message });
                    })
                    .catch((err) => {
                      logger.error(
                        `[upload2AiScan] scanAI method is error, error: ${JSON.stringify(
                          err
                        )}`
                      );
                      myReject({ status: 400, message: err.message });
                    });
                } else {
                  myReject({
                    status: 400,
                    message: "File ai is already exist",
                  });
                }
              }
            })
            .catch((err) => {
              logger.error(
                `[upload2AiScan] Query ProductInspection with productId equal: ${
                  item.id
                } error: ${JSON.stringify(err)}`
              );
              myReject({ status: 400, message: err.message });
            });
        }
      });
    } catch (error) {
      logger.error(
        `[upload2AiScan] Method with parameter qrCode: ${qrCode}; userId: ${userId}; error: ${JSON.stringify(
          error
        )}`
      );
      myReject({ status: 400, message: error.message });
    }
  });
};

scanAI = (qrCode, userId, form, result) => {
  logger.debug(
    `[scanAI] Method is called with parameter qrCode: ${qrCode}; userId: ${userId}; form: ${JSON.stringify(
      form
    )};`
  );
  return new Promise(async (myResolve, myReject) => {
    logger.debug(
      `[scanAI] Called endpoint AI: ${
        process.env.AI_URL
      }/recognition/; with parameter form: ${JSON.stringify(
        form
      )}; access_token: ${process.env.ACCESS_TOKEN_AI}`
    );
    await axios
      .post(`${process.env.AI_URL}/recognition/`, form, {
        headers: {
          ...form.getHeaders(),
          access_token: process.env.ACCESS_TOKEN_AI,
        },
      })
      .then(async (respAI) => {
        if (respAI.status === 422) {
          logger.error(
            `[scanAI] There is an error when AI Endpoint check the image!`
          );
          myReject({
            message: "There is an error when AI check the image!",
          });
        }

        const respData = respAI.data;

        logger.debug("[scanAI] saveImageAiToDB method is called");
        saveImageAiToDB(qrCode, userId, respData.data, result)
          .then(() => {
            logger.debug(
              `[scanAI] saveImageAiToDB method is success, message: ${JSON.stringify(
                { message: "Check AI has been finished" }
              )}`
            );
            myResolve({ message: "Check AI has been finished" });
          })
          .catch((err) => {
            logger.error(
              `[scanAI] saveImageAiToDB method is error, error: ${JSON.stringify(
                err
              )}`
            );
            myReject({ message: err });
          });
      });
  });
};

saveImageAiToDB = (qrCode, userId, data, result) => {
  logger.debug(
    `[saveImageAiToDB] Method is called with parameter qrCode: ${qrCode}; userId: ${userId}; data: ${JSON.stringify(
      data
    )}; result: ${JSON.stringify(result)};`
  );
  return new Promise(async (myResolve, myReject) => {
    try {
      logger.debug(
        `[saveImageAiToDB] Query Product with qrCode: ${qrCode} and userId: ${userId} and order by id = DESC`
      );
      await Product.findOne({
        where: {
          qrCode: { [Op.eq]: qrCode },
          userId: { [Op.eq]: userId },
        },
        order: [["id", "DESC"]],
      }).then(async (item) => {
        if (item === null) {
          logger.debug(
            `[saveImageAiToDB] Query Product with qrCode: ${qrCode} and userId: ${userId} is empty`
          );
          myReject({ status: 400, message: "Data not found" });
        }

        logger.debug(
          `[saveImageAiToDB] Start looping using data length: ${data.length}`
        );
        let notGood = 0;
        for (let idx = 0; idx < data.length; idx++) {
          const fileName = result[idx].image;
          const imagePath = `${process.env.AI_IMG_URL}/${fileName}`;
          const props = {
            productId: item.id,
            image: fileName,
            imagePath,
            aiStatus:
              data[idx].status == "ok" || data[idx].status == "good"
                ? "good"
                : "not good",
            aiCrackDimensions: {
              total_crack: data[idx].total_crack,
              dimensions: data[idx].dimensions,
            },
            aiGenerated: true,
          };
          if (props.aiStatus === "not good") notGood += 1;
          logger.debug(
            `[saveImageAiToDB] Create data to save in ProductInspection table: ${JSON.stringify(
              props
            )}`
          );
          // convert base64 to image and saved
          logger.debug(
            `[saveImageAiToDB] saveBase64ToImage method is called with props base64: data[${idx}].base64; imgName: ${fileName};`
          );
          await saveBase64ToImage(data[idx].base64, fileName)
            .then(() => {
              logger.debug(
                "[saveImageAiToDB] saveBase64ToImage method is success"
              );
              ProductInspection.create({
                ...props,
              })
                .then(() => {
                  logger.debug(
                    `[saveImageAiToDB] Image AI has been successfully saved to db: ${fileName}`
                  );
                })
                .catch((error) => {
                  logger.error(
                    `[saveImageAiToDB] Error when save image ai:  ${JSON.stringify(
                      error
                    )}`
                  );
                });
            })
            .catch((error) => {
              logger.error(
                `[saveImageAiToDB] Method saveBase64ToImage is error:  ${JSON.stringify(
                  error
                )}`
              );
            });
        }
        const statusProduct = notGood != 0 ? "not good" : "good";
        if (statusProduct == "not good") {
          triggerRelay(true, 2);
          setTimeout(() => triggerRelay(false, 2), 2000);
        }
        logger.debug(
          `[saveImageAiToDB] statusProduct: ${statusProduct}; not good: ${notGood}`
        );
        await Product.update(
          {
            status: statusProduct,
          },
          {
            where: { id: item.id },
            individualHooks: true,
          }
        )
          .then(() => {
            logger.debug(
              "[saveImageAiToDB] Product status update successfully"
            );
          })
          .catch(() => {
            logger.error("[saveImageAiToDB] Product status failed to update");
          });
        logger.debug(
          "[saveImageAiToDB] All image AI has been saved completely"
        );
        myResolve({ status: 200, message: "Image AI successfully saved" });
      });
    } catch (error) {
      logger.error(
        `[saveImageAiToDB] saveImageAiToDB method is error, error: ${JSON.stringify(
          error
        )}`
      );
      myReject(error);
    }
  });
};

saveBase64ToImage = (base64, imgName) => {
  logger.debug(
    `[saveBase64ToImage] Method is called with parameter imgName: ${imgName};`
  );
  return new Promise(async (myResolve, myReject) => {
    try {
      const directoryPath = process.env.AI_IMG_URL;
      const buffer = Buffer.from(base64, "base64");
      fs.writeFileSync(`${directoryPath}/${imgName}`, buffer);
      logger.debug(
        `[saveBase64ToImage] Image AI successfully saved in folder: ${directoryPath}/${imgName};`
      );
      myResolve({
        status: 200,
        message: "Image AI successfully saved in folder",
      });
    } catch (error) {
      myReject({ status: 400, message: error });
    }
  });
};

const directory = {
  dirSize,
  checkCurrentDir,
  saveImageToDB,
  saveImageAiToDB,
  upload2AiScan,
};

module.exports = directory;
