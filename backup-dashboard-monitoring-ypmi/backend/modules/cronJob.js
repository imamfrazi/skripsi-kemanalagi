const schedule = require("node-schedule");

runJob = (io) => {
  schedule.scheduleJob("14 1 * *", function () {
    // console.log("The answer to life, the universe, and everything!");
    io.emit("backup_notification", {
      message: "Data will be deleted one hour from now",
    });
  });
};

const cronJob = {
  runJob,
};

module.exports = cronJob;
