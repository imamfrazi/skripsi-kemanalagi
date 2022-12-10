const db = require("../models");
const User = db.users;
const DeleteFiles = db.delete_files;
const TimeConfig = db.time_config;
const { Op } = require("sequelize");

const SecretJwt = process.env.SECRET_JWT;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const moment = require("moment");

exports.signup = (req, res) => {
  // Save User to Database
  if (!req.body.firstName) {
    return res.status(400).send({ message: "Unprocessable request" });
  }
  User.findOne({
    where: {
      firstName: { [Op.eq]: req.body.firstName },
      lastName: { [Op.eq]: req.body.lastName },
      deletedAt: {
        [Op.eq]: null,
      },
    },
  }).then((item) => {
    if (item !== null) {
      res.status(400).send({
        message: "Data already exist!",
      });
    }
    User.create({
      ...req.body,
    })
      .then(() => {
        res.status(200).send({ message: "User was registered successfully!" });
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: {
        [Op.eq]: req.body.email,
      },
      deletedAt: {
        [Op.eq]: null,
      },
    },
  })
    .then(async (user) => {
      if (!user) {
        return res.status(400).send({ message: "User Not found." });
      }

      if (!user.isAdmin) {
        return res.status(401).send({
          message: "User is not admin",
        });
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      await User.update(
        {
          lastLogin: moment().format(),
        },
        {
          where: {
            email: {
              [Op.eq]: req.body.email,
            },
          },
          individualHooks: true,
        }
      );

      const token = jwt.sign(
        { id: user.id, isAdmin: user.isAdmin },
        SecretJwt,
        {
          expiresIn: user.isAdmin ? 86400 : 30, // 30 minutes for admin & 30 seconds for not admin
        }
      );

      deleteStatus = await DeleteFiles.findOne({
        where: {
          userId: {
            [Op.eq]: user.id,
          },
        },
      });

      res.status(200).send({
        id: user.id,
        fullName: user.lastName
          ? `${user.firstName} ${user.lastName}`
          : user.firstName,
        email: user.email,
        accessToken: token,
        isActive: user.isActive,
        isDelete: deleteStatus.isDelete ? deleteStatus.isDelete : "",
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.deactivate = (req, res) => {
  if (!req.body.email)
    res.status(500).send({ message: "Unprocessable request" });

  User.findOne({
    where: {
      email: {
        [Op.eq]: req.body.email,
      },
      deletedAt: {
        [Op.eq]: null,
      },
    },
  })
    .then(async (user) => {
      if (!user) {
        return res.status(400).send({ message: "User Not found." });
      }

      if (!user.isAdmin) {
        return res.status(401).send({
          message: "User is not admin",
        });
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          message: "Invalid Password!",
        });
      }

      await User.update(
        {
          isActive: req.body.isActive,
        },
        {
          where: {
            email: {
              [Op.eq]: req.body.email,
            },
          },
          individualHooks: true,
        }
      );

      res.status(200).send({
        id: user.id,
        fullName: user.lastName
          ? `${user.firstName} ${user.lastName}`
          : user.firstName,
        email: user.email,
        isActive: req.body.isActive,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.removeUser = (req, res) => {
  if (!req.body.id)
    res.status(500).send({ message: "Input id that want to be removed" });

  User.destroy({
    where: {
      id: { [Op.in]: req.body.id },
    },
  })
    .then(() => {
      res.status(200).send({ message: "User was removed successfully!" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.userList = (req, res) => {
  User.findAll({
    attributes: ["id", "firstName", "lastName", "email", "lastLogin"],
    where: {
      isAdmin: {
        [Op.eq]: false,
      },
      deletedAt: {
        [Op.eq]: null,
      },
    },
    order: [["createdAt", "DESC"]],
  })
    .then((user) => {
      if (!user) {
        return res.status(400).send({ message: "User Not found." });
      }

      const result = user.map((data) => ({
        id: data.id,
        fullName: data.lastName
          ? `${data.firstName} ${data.lastName}`
          : data.firstName,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        lastLogin: data.lastLogin,
      }));

      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.updateUser = (req, res) => {
  try {
    if (!req.body.id) {
      res.status(400).send({ message: "Unprocessable request" });
    }

    const query = {};
    if (req.body.firstName) query.firstName = req.body.firstName;
    if (req.body.lastName) query.lastName = req.body.lastName;

    User.findOne({
      where: {
        firstName: { [Op.eq]: req.body.firstName },
        lastName: { [Op.eq]: req.body.lastName },
        deletedAt: {
          [Op.eq]: null,
        },
      },
    }).then((item) => {
      if (item !== null) {
        res.status(400).send({
          message: "Data already exist!",
        });
      }

      User.update(
        {
          ...query,
        },
        {
          where: { id: req.body.id },
          individualHooks: true,
        }
      )
        .then((result) => {
          res.status(200).send(result);
        })
        .catch((err) => {
          res.status(500).send({ message: err.message });
        });
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.updateTimeConfig = (req, res) => {
  try {
    if (!req.body.userId) {
      res.status(400).send({ message: "Unprocessable request" });
    }

    const query = {};
    if (req.body.delayTime) query.delayTime = req.body.delayTime;
    if (req.body.allowanceTime) query.allowanceTime = req.body.allowanceTime;
    if (req.body.outputRedirectTime)
      query.outputRedirectTime = req.body.outputRedirectTime;

    TimeConfig.update(
      {
        ...query,
      },
      {
        where: { userId: req.body.userId },
        individualHooks: true,
      }
    )
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getTimeConfig = (req, res) => {
  // get latest product
  try {
    if (!req.params.userId) {
      res.status(400).send({ message: "Unprocessable request" });
    }

    TimeConfig.findOne({
      where: {
        userId: { [Op.eq]: req.params.userId },
      },
    }).then((item) => {
      if (item !== null) {
        res.status(200).send(item);
      } else {
        res.status(400).send({
          message: "Data not found!",
        });
      }
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
