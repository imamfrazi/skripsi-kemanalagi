const express = require("express");
const router = express.Router();

const { auth } = require("../middlewares");
const controllerAuth = require("../controllers/auth.controller");

router.post("/signin", controllerAuth.signin);
router.post("/signup", [auth.verifyTokenAdmin], controllerAuth.signup);
router.post("/user/remove", [auth.verifyTokenAdmin], controllerAuth.removeUser);
router.post("/user/update", [auth.verifyTokenAdmin], controllerAuth.updateUser);
router.post(
  "/user/time",
  [auth.verifyTokenAdmin],
  controllerAuth.updateTimeConfig
);
router.post(
  "/user/deactivate",
  [auth.verifyTokenAdmin],
  controllerAuth.deactivate
);
router.get("/user/list", [auth.verifyTokenAdmin], controllerAuth.userList);
router.get(
  "/user/:userId/time",
  [auth.verifyTokenAdmin],
  controllerAuth.getTimeConfig
);

module.exports = router;
