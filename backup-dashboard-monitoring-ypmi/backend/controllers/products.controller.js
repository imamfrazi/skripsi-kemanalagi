const db = require("../models");
const fs = require("fs");
const User = db.users;
const Product = db.products;
const DeleteFiles = db.delete_files;
const ProductInspection = db.products_inspections;
const History = db.history;
const { Op, fn, col } = require("sequelize");
const { parser, hidRelay } = require("../modules");
const { use } = require("../app");
const { directory } = require("../modules");

const logger = require("../logger");

exports.saveProduct = (req, res) => {
  // Save Product to Database
  logger.debug(
    `[saveProduct] Call method to save qrCode with userId: ${req.body.userId}; qrCode: ${req.body.qrCode};`
  );
  try {
    if (!req.body.userId || !req.body.qrCode) {
      logger.debug(
        `[saveProduct] Request error with userId: ${req.body.userId}; qrCode: ${req.body.qrCode};`
      );
      res.status(400).send({ message: "Unprocessable request" });
    }

    const qrParser = parser.qrCodeParser(req.body.qrCode);
    logger.debug(
      `[saveProduct] Save data product with qrCode parse: ${JSON.stringify(
        qrParser
      )}`
    );

    logger.debug(
      `[saveProduct] Start query create Product with data: ${JSON.stringify({
        noShot: qrParser.modelName,
        qrCode: qrParser.qrCode,
        userId: req.body.userId,
        status: "not good",
      })}`
    );
    Product.create({
      userId: req.body.userId,
      status: "not good",
      qrCode: qrParser.qrCode,
      noShot: qrParser.modelName,
    })
      .then(() => {
        logger.debug("[saveProduct] Trigger relay after create product");
        hidRelay.triggerRelay(true, 0);
        setTimeout(() => hidRelay.triggerRelay(false, 0), 2000);
        logger.debug("[saveProduct] Product successfully added");
        res
          .status(200)
          .send({ message: "Product has been added successfully!" });
      })
      .catch((err) => {
        logger.error(
          `[saveProduct] Query create product error: ${JSON.stringify(err)}`
        );
        res.status(400).send({ message: err.message });
      });
  } catch (error) {
    logger.error(
      `[saveProduct] saveProduct method error: ${JSON.stringify(error)}`
    );
    res.status(400).send({ message: error.message });
  }
};

exports.product = (req, res) => {
  // get latest product
  logger.debug(
    `[product] Call method to display product detail with userId: ${req.body.userId}; qrCode: ${req.body.qrCode};`
  );
  try {
    if (!req.body.userId || !req.body.qrCode) {
      logger.debug(
        `[product] Request error with userId: ${req.body.userId}; qrCode: ${req.body.qrCode};`
      );
      res.status(400).send({ message: "Unprocessable request" });
    }

    const qrParser = parser.qrCodeParser(req.body.qrCode);
    logger.debug(
      `[product] Start query findOne Product with userId: ${req.body.userId}; qrCode: ${qrParser.qrCode};`
    );
    Product.findOne({
      where: {
        qrCode: { [Op.eq]: qrParser.qrCode },
        userId: { [Op.eq]: req.body.userId },
      },
      include: [
        {
          model: User,
          required: true,
          attributes: ["firstName", "lastName"],
        },
      ],
      order: [["id", "DESC"]],
    }).then(async (item) => {
      if (item !== null) {
        logger.debug("[product] Query findOne Product is not null");
        logger.debug(
          `[product] Parse response query qrCode: ${JSON.stringify(
            item.qrCode
          )}`
        );
        logger.debug(
          `[product] Query count ProductInspection with productId: ${
            item.id
          }; aiGenerated: ${true}; aiStatus: not good;`
        );
        
        hidRelay.triggerRelay(true, 1);
        setTimeout(() => hidRelay.triggerRelay(false, 1), 2000);

        res.status(200).send({
          data: {
            id: item.id,
            qrCode: item.qrCode,
            userId: item.userId,
            status: item.status,
            user: item.user,
            noShot: item.noShot,
          },
        });
      } else {
        logger.debug("[product] Query findOne Product is not found");
        res.status(400).send({
          message: "Data not found!",
        });
      }
    });
  } catch (error) {
    logger.error(`[product] product method error: ${JSON.stringify(error)}`);
    res.status(400).send({ message: error.message });
  }
};

exports.productList = async (req, res) => {
  // get latest product
  try {
    const totalData = await ProductInspection.count({
      where: {
        aiGenerated: {
          [Op.eq]: true,
        },
        deletedAt: {
          [Op.eq]: null,
        },
      },
      distinct: true,
      col: "product_id",
    });
    const pagination = req.params.page * req.params.limit;
    Product.findAll({
      order: [["id", "DESC"]],
      limit: req.params.limit,
      offset: pagination,
      include: [
        {
          model: User,
          required: true,
          attributes: ["firstName", "lastName"],
        },
        {
          model: ProductInspection,
          required: true,
          attributes: [],
          where: {
            aiGenerated: {
              [Op.eq]: true,
            },
            deletedAt: {
              [Op.eq]: null,
            },
          },
        },
      ],
    })
      .then((resp) => {
        res.status(200).send({ total: totalData, data: resp });
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

exports.productInspectionById = (req, res) => {
  // get latest product
  try {
    if (!req.params.productId) {
      res.status(400).send({ message: "Unprocessable request" });
    }

    History.findAll({
      where: {
        productId: {
          [Op.eq]: req.params.productId,
        },
        aiGenerated: {
          [Op.eq]: true,
        },
      },
      order: [["id", "DESC"]],
      include: [
        {
          model: Product,
          required: true,
          attributes: ["noShot", "qrCode"],
          include: [
            {
              model: User,
              required: true,
              attributes: ["firstName", "lastName"],
            },
          ],
        },
      ],
    })
      .then((response) => {
        res.status(200).send(response);
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

exports.latestProductList = (req, res) => {
  // get latest product
  try {
    let queryProduct = {};
    if ((!req.body.userId || !req.body.qrCode) && !req.body.productId) {
      res.status(400).send({ message: "Unprocessable request" });
    }
    logger.debug(
      `[latestProductList] call method with userId: ${JSON.stringify(
        req.body.userId
      )}; qrCode: ${JSON.stringify(
        req.body.qrCode
      )}; productId: ${JSON.stringify(req.body.productId)}`
    );

    if (req.body.productId) {
      queryProduct = {
        id: { [Op.eq]: req.body.productId },
      };
    } else {
      const qrParser = parser.qrCodeParser(req.body.qrCode);
      logger.debug(`[latestProductList] qrParser: ${JSON.stringify(qrParser)}`);
      queryProduct = {
        qrCode: { [Op.eq]: qrParser.qrCode },
        userId: { [Op.eq]: req.body.userId },
      };
    }
    logger.debug(
      `[latestProductList] queryProduct: ${JSON.stringify(queryProduct)}`
    );
    logger.debug("[latestProductList] call Product query");
    Product.findOne({
      where: {
        ...queryProduct,
      },
      include: [
        {
          model: User,
          required: true,
          attributes: ["firstName", "lastName"],
        },
      ],
      order: [["id", "DESC"]],
    }).then((item) => {
      if (item !== null) {
        logger.debug("[latestProductList] Product query is not null");
        logger.debug(
          `[latestProductList] call ProductInspection query with productId: ${item.id}`
        );
        ProductInspection.findAll({
          where: {
            productId: {
              [Op.eq]: item.id,
            },
            aiGenerated: {
              [Op.eq]: true,
            },
          },
          order: [["id", "DESC"]],
          limit: 8,
        })
          .then((responseAi) => {
            if (responseAi.length !== 0) {
              logger.debug(
                "[latestProductList] ProductInspection query is not null"
              );
              const latestDateAi = new Date(responseAi[0].createdAt);
              const resultAi = responseAi.filter((item) => {
                const itemDate = new Date(item.createdAt);
                const diffInSecond =
                  (latestDateAi.getTime() - itemDate.getTime()) / 1000;
                return diffInSecond < 15;
              });

              const array2Dict = {};
              for (let idx = 0; idx < resultAi.length; idx++) {
                const arrayItem = resultAi[idx];
                array2Dict[arrayItem.image] = [arrayItem];
              }
              logger.debug(
                `[latestProductList] call ProductInspection secondary query with productId: ${
                  item.id
                }; aiGenerated: ${true}`
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
              })
                .then((response) => {
                  if (response.length === 0) {
                    logger.debug(
                      "[latestProductList] ProductInspection secondary query is null"
                    );
                    res.status(400).send({ message: err.message });
                  } else {
                    logger.debug(
                      "[latestProductList] ProductInspection secondary query is not null"
                    );
                    console.log("====== response =======", response);
                    console.log("====== array2dictionary =======", array2Dict);
                    for (let idx = 0; idx < response.length; idx++) {
                      const arrayItem = response[idx];
                      if (array2Dict[arrayItem.image] != undefined) {
                        array2Dict[arrayItem.image].push(arrayItem);
                      }
                    }
                    const lastResult = Object.values(array2Dict);
                    res.status(200).send({ meta: item, data: lastResult });
                  }
                })
                .catch((err) => {
                  res.status(400).send({ message: err.message });
                });
            } else {
              logger.debug(
                "[latestProductList] ProductInspection query is null"
              );
              res
                .status(400)
                .send({ message: "Product Inspection Not found." });
            }
          })
          .catch((err) => {
            res.status(400).send({ message: err.message });
          });
      } else {
        logger.debug("[latestProductList] Product query is null");
        res.status(400).send({
          message: "Data not found!",
        });
      }
    });
  } catch (error) {
    logger.debug(
      `[latestProductList] function is error: ${JSON.stringify(error)}`
    );
    res.status(400).send({ message: error.message });
  }
};

exports.updateStatus = (req, res) => {
  try {
    if ((!req.body.userStatus && !req.body.note) || !req.body.id) {
      res.status(400).send({ message: "Unprocessable request" });
    }

    let query = {};
    if (req.body.userStatus) {
      query.userStatus = req.body.userStatus;
    }
    if (req.body.note) {
      query.note = req.body.note;
    }

    ProductInspection.update(query, {
      where: { id: req.body.id },
      individualHooks: true,
    })
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

exports.infoDetail = async (req, res) => {
  // get latest product
  try {
    const aiStatus = await ProductInspection.findAll({
      where: {
        aiGenerated: {
          [Op.eq]: true,
        },
        userStatus: {
          [Op.eq]: null,
        },
      },
      group: ["status"],
      attributes: [
        ["ai_status", "status"],
        [fn("COUNT", "status"), "count"],
      ],
    });
    const userStatus = await ProductInspection.findAll({
      where: {
        aiGenerated: {
          [Op.eq]: true,
        },
        userStatus: {
          [Op.not]: null,
        },
      },
      group: ["status"],
      attributes: [
        ["user_status", "status"],
        [fn("COUNT", "status"), "count"],
      ],
    });
    const merge = [...aiStatus, ...userStatus];
    const result = {
      total: 0,
      good: 0,
      "not good": 0,
      disposition: 0,
    };
    merge.forEach((item) => {
      const data = item.dataValues;
      result["total"] += parseInt(data.count);
      result[data.status] += parseInt(data.count);
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

exports.directoryImgDetail = async (req, res) => {
  try {
    const sizeScanImg = await directory.dirSize(process.env.SCAN_IMG_URL);
    const sizeAiImg = await directory.dirSize(process.env.AI_IMG_URL);
    res.status(200).send({
      size: {
        scanImg: sizeScanImg,
        aiImg: sizeAiImg,
      },
    });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

exports.updateStatusDelete = (req, res) => {
  try {
    if (!req.body.userId) {
      res.status(400).send({ message: "Unprocessable request" });
    }
    DeleteFiles.update(
      {
        isDelete: req.body.isDelete,
      },
      {
        where: { userId: req.body.userId },
        individualHooks: true,
      }
    )
      .then((result) => {
        res.status(200).send(result[1][0]);
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

exports.deleteUnusedFile = (req, res) => {
  try {
    ProductInspection.findAll({
      attributes: [[fn("DISTINCT", col("image")), "image"]],
    }).then((image) => {
      const directoryPath = process.env.SCAN_IMG_URL;
      const images = image.map((data) => data.image);
      const files = fs
        .readdirSync(directoryPath, { withFileTypes: true })
        .filter((dirent) => dirent.isFile())
        .map((dirent) => dirent.name);
      for (let index = 0; index < files.length; index++) {
        if (!images.includes(files[index])) {
          fs.unlink(
            `${process.env.SCAN_IMG_URL}/${files[index]}`,
            function (err) {
              if (err) return console.log(err);
              console.log(`file ${files[index]} deleted successfully`);
            }
          );
        }
      }
      res.status(200).send({ data: images });
    });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
