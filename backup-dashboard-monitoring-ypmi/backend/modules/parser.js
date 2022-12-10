const code2Date = {
  A: 10,
  B: 11,
  C: 12,
  D: 13,
  E: 14,
  F: 15,
  G: 16,
  H: 17,
  J: 18,
  K: 19,
  L: 20,
  M: 21,
  N: 22,
  P: 23,
  Q: 24,
  R: 25,
  S: 26,
  T: 27,
  U: 28,
  V: 29,
  W: 30,
  X: 31,
};
const code2Month = {
  O: "JAN",
  P: "FEB",
  Q: "MAR",
  R: "APR",
  S: "MAY",
  T: "JUN",
  U: "JUL",
  V: "AUG",
  W: "SEPT",
  X: "OCT",
  Y: "NOV",
  Z: "DES",
};

// qrCodeParser = (code) => {
//   const qrCode = code.toUpperCase();
//   const codePartHC = parseInt(qrCode.substring(0, 1));
//   const prodYear = parseInt(`20${qrCode.substring(1, 3)}`);
//   const prodMonth = code2Month[qrCode.substring(3, 4)];
//   const prodDate = parseInt(qrCode.substring(4, 5))
//     ? parseInt(qrCode.substring(4, 5))
//     : code2Date[qrCode.substring(4, 5)];
//   const numberShotMachine = parseInt(qrCode.substring(5));

//   return {
//     codePartHC,
//     prodYear,
//     prodMonth,
//     prodDate,
//     numberShotMachine,
//   };
// };
qrCodeParser = (code) => {
  const modelName = code.substring(0, 3);
  const qrCode = code.substring(3, 11);
  return {
    modelName,
    qrCode,
  };
};

const parser = {
  qrCodeParser,
};

module.exports = parser;
