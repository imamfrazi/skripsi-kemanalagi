const { SerialPort } = require("serialport");
const logger = require("../logger");
const port = "COM2";

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

openSerial = (io) => {
  serialPort.on("open", function () {
    logger.debug("[openSerial] Connection to serialPort is opened");
    serialPort.on("data", function (data) {
      logger.debug(
        `[openSerial] Data is received by serialPort: ${JSON.stringify(data)}`
      );
      logger.debug(
        `[openSerial] scan_qr_code is emitted by serialPort: ${JSON.stringify({
          state: true,
          data: JSON.parse(data),
        })}`
      );
      io.emit("scan_qr_code", {
        state: true,
        data: JSON.parse(data),
      });
    });
  });
};

const receive = {
  openSerial,
};

module.exports = receive;
