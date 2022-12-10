const express = require("express");
const router = express.Router();

const { auth } = require("../middlewares");
const controllerProducts = require("../controllers/products.controller");

router.post("/save", [auth.verifyTokenAdmin], controllerProducts.saveProduct);
router.post(
  "/list",
  [auth.verifyTokenAdmin],
  controllerProducts.latestProductList
);
router.post("/detail", [auth.verifyTokenAdmin], controllerProducts.product);
router.post(
  "/update",
  [auth.verifyTokenAdmin],
  controllerProducts.updateStatus
);
router.post(
  "/update/delete",
  [auth.verifyTokenAdmin],
  controllerProducts.updateStatusDelete
);
router.post(
  "/delete/images",
  [auth.verifyTokenAdmin],
  controllerProducts.deleteUnusedFile
);
router.get(
  "/history/:limit/:page",
  [auth.verifyTokenAdmin],
  controllerProducts.productList
);
router.get(
  "/inspection/:productId",
  [auth.verifyTokenAdmin],
  controllerProducts.productInspectionById
);
router.get("/info", [auth.verifyTokenAdmin], controllerProducts.infoDetail);
router.get(
  "/directory/size",
  [auth.verifyTokenAdmin],
  controllerProducts.directoryImgDetail
);

module.exports = router;
