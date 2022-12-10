const jwt = require("jsonwebtoken");
const db = require("../models");

const User = db.users;
const SecretJwt = process.env.SECRET_JWT;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, SecretJwt, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    next();
  });
};

verifyTokenAdmin = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, SecretJwt, (err, decoded) => {
    if (err || !decoded.isAdmin) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    next();
  });
};

verifyDuplicateEmail = (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (user) {
      res.status(400).send({
        message: "Failed! Email is already in use!",
      });
      return;
    }
    next();
  });
};

const auth = {
  verifyToken,
  verifyTokenAdmin,
  verifyDuplicateEmail,
};

module.exports = auth;
