const { Op } = require("sequelize");
const {
  checkCurrentDir,
  saveImageToDB,
  upload2AiScan,
} = require("./directory");
const { qrCodeParser } = require("./parser");

const db = require("../models");
const logger = require("../logger");
const ProductInspection = db.products_inspections;

scanAi = (io, msg) => {
  logger.debug("[scanAi] scanAi method in modules/event.js file is called");
  return new Promise((myResolve, myReject) => {
    upload2AiScan(msg.qrCode, msg.userId)
      .then((resp) => {
        // io.emit("scan_ai", {
        //   status: resp.status,
        //   success: true,
        //   message: resp.message,
        // });
        myResolve(resp);
      })
      .catch((err) => {
        // io.emit("scan_ai", {
        //   status: err.status,
        //   success: false,
        //   message: err.message,
        // });
        myReject(err);
      });
  });
};

scanImgDir = async (io, msg) => {
  if (msg.state === true) {
    try {
      const checkDir = checkCurrentDir();
      let totalInit = msg.totalInit;
      if (msg.totalInit === null) {
        totalInit = await ProductInspection.count({
          where: {
            aiGenerated: {
              [Op.eq]: false,
            },
          },
        });
        logger.debug(
          `[scanImgDir] Total number of images in database at the beginning before the scan: ${totalInit}`
        );
      }
      if (checkDir - totalInit >= 8) {
        logger.debug(
          "[scanImgDir] Image scan is finished because the total image is the same or more than 8"
        );
        // saveImageToDB(msg.qrCode, msg.userId);
        setTimeout(() => {
          io.emit("scan_img_dir", {
            state: false,
            message: "Scan directory is finished",
          });
        }, 1000);
      } else
        setTimeout(() => {
          io.emit("scan_img_dir", {
            state: true,
            message: "Scan directory in progress",
            data: {
              totalInit,
            },
          });
        }, 1000);
    } catch (error) {
      logger.error(
        `[scanImgDir] An error occurs when the image scan is running: ${JSON.stringify(
          error
        )}`
      );
      setTimeout(() => {
        io.emit("scan_img_dir", {
          state: false,
          error,
        });
      }, 1000);
    }
  } else {
    logger.debug(`[scanImgDir] Image scan is stopped: ${JSON.stringify(msg)}`);
    setTimeout(() => {
      io.emit("scan_img_dir", {
        state: false,
        message: "Scan directory is stopped!",
      });
    }, 1000);
  }
};

scanImgSave = (io, msg) => {
  logger.debug(
    "[scanImgSave] scanImgSave method in modules/event.js file is called"
  );
  const parseQrCode = qrCodeParser(msg.qrCode);
  msg.qrCode = parseQrCode.qrCode
  saveImageToDB(msg.qrCode, msg.userId)
    .then(() => {
      scanAi(io, msg)
        .then((resp) => {
          io.emit("scan_img_save", {
            status: resp.status,
            message: resp.message,
          });
        })
        .catch((err) => {
          io.emit("scan_img_save", {
            status: err.status,
            message: err.message,
          });
        });
    })
    .catch((err) => {
      io.emit("scan_img_save", {
        status: err.status,
        message: err.message,
      });
    });
};

const event = {
  scanAi,
  scanImgDir,
  scanImgSave,
};

module.exports = event;
