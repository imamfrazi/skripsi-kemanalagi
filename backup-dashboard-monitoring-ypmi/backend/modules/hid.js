const HID = require("node-hid");
const _ = require("lodash");
const logger = require("../logger");

setup = () => {
  relay = _.find(HID.devices(), function (item) {
    return item.product == process.env.HID_RELAY;
  });
  console.log("[setup] relay: ", relay)

  if (relay) {
    logger.debug(`[setup] Relay is found: ${process.env.HID_RELAY}`);
    return new HID.HID(relay.path);
  } else {
    logger.debug("[setup] No relay found!");
    return false;
  }
};

const device = setup();

getState = () => {
  // Byte 8 = State. 3 = on, 0 = off
  if (device !== false)
    return device.getFeatureReport(0x00, 0x10)[8] !== 0 ? true : false;
  else return { msg: "Relay not found" };
};

setState = (state, channel) => {
  // Byte 0 = Report ID
  // Byte 1 = State
  // Byte 2 = Relay
  // Bytes 3-8 = Padding
  console.log("state: ", state)
  console.log("channel: ", channel)
  const ON = [
    [0x00, 0xff, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
    [0x00, 0xff, 0x02, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
    [0x00, 0xff, 0x03, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
    [0x00, 0xff, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
  ];
  const OFF = [
    [0x00, 0xfd, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
    [0x00, 0xfd, 0x02, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
    [0x00, 0xfd, 0x03, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
    [0x00, 0xfd, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
  ];
  device.sendFeatureReport(state ? ON[channel] : OFF[channel]);
};

triggerRelay = (state, channel) => {
  try {
    logger.debug("[triggerRelay] Relay is triggered");
    console.log("[triggerRelay] state: ", state)
    console.log("[triggerRelay] channel: ", channel)
    if (device !== false) {
      console.log("[triggerRelay] device: ", device)
      setState(state, channel);
      console.log("[triggerRelay] setState")
      logger.debug(
        `[triggerRelay] Relay enabled: ${JSON.stringify(getState())}`
      );
    } else{       
      console.log("[triggerRelay] device: ", device)
      return { msg: "Relay not found" };
    }
  } catch (error) {
    logger.error(`[triggerRelay] Call triggerRelay error: ${error}`);
  }
};
// console.log(HID.devices())
// triggerRelay(true, 0);
// setTimeout(() => triggerRelay(false, 0), 2000);
const hidRelay = {
  setup,
  getState,
  triggerRelay,
};

module.exports = hidRelay;
