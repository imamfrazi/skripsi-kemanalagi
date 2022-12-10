const { SerialPort } = require("serialport");
const logger = require("../logger");
const port = "COM1";
const message = JSON.stringify({
  qrCode: "517RF234",
  status: "not good",
});

const serialPort = new SerialPort(
  {
    path: port,
    baudRate: parseInt(process.env.SERIAL_PORT_QR),
  },
  function (err) {
    if (err) {
      logger.error(
        `[serialPort] Error serialPort Port: ${port}; connection: ${JSON.stringify(
          err
        )}; baudRate: ${JSON.stringify(process.env.SERIAL_PORT_QR)}`
      );
      return console.log("Error: ", err.message);
    }
  }
);

sendSerial = () => {
  serialPort.write(message, function (err) {
    if (err) {
      logger.error(
        `[sendSerial] Error on serialPort when write: ${JSON.stringify(err)}`
      );
      return console.log("Error on write: ", err.message);
    }
    logger.debug(
      `[sendSerial] serialPort sent message successfully: ${JSON.stringify(
        message
      )}`
    );
    console.log("Message sent successfully");
  });
};

const send = {
  sendSerial,
};

module.exports = send;
