const fs = require("fs");
const moment = require("moment");
const { Client } = require("pg");

renameFile = (files, pathFrom, pathTo) => {
  fs.rename(
    `${pathFrom}/${files}`,
    `${pathTo}/${files}`,
    (err) => {
      if (err) throw err;
      console.log(
        `${pathFrom}/${
          files
        } was copied ${pathTo}/${files}`
      );
    }
  );
}
moveData = async () => {
  //joining path of directory
  const getDate = Date.now()
  const directory = `D:/images-ypmi/${getDate}`;
  if (!fs.existsSync(`${directory}/AI`)){
    fs.mkdirSync(`${directory}/AI`, { recursive: true });
  }
  if (!fs.existsSync(`${directory}/Ori`)){
    fs.mkdirSync(`${directory}/Ori`, { recursive: true });
  }
  const directoryPathOri = "D:/Images/Scan/Crack Detection/Picture";
  const directoryPathAi = "D:/Images/AI";

  try {
    const filesAi = fs
      .readdirSync(directoryPathAi, { withFileTypes: true })
      .filter((dirent) => dirent.isFile())
      .map((dirent) => dirent.name);
    const filesOri = fs
      .readdirSync(directoryPathOri, { withFileTypes: true })
      .filter((dirent) => dirent.isFile())
      .map((dirent) => dirent.name);

    for (let index = 0; index < filesOri.length; index++) {
      // copyFile or rename
      const setDate = moment().format();
      const query = {
        text: `UPDATE products_inspections
      SET deleted_at = $1
      WHERE image = $2`,
        values: [setDate, filesOri[index]],
      };
      client.query(query, (err, res) => {
        if (err) {
          console.log(err.stack);
        } else {
          console.log(`Move image ${filesOri[index]}`);
          renameFile(filesOri[index], directoryPathOri, `${directory}/Ori`)
        }
      });
    }
    for (let index = 0; index < filesAi.length; index++) {
      // copyFile or rename
      console.log(`Move image ${filesAi[index]}`);
      renameFile(filesAi[index], directoryPathAi, `${directory}/AI`)
    }
    return filesOri;
  } catch (error) {
    throw error;
  }
};

const client = new Client({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "root",
  database: "ypmi",
});
client.connect((err) => {
  if (err) {
    console.error("connection error", err.stack);
  } else {
    const query = {
      text: "SELECT * from delete_files where user_id = $1",
      values: [1],
    };
    // callback
    client.query(query, (err, res) => {
      if (err) {
        console.log(err.stack);
      } else {
        const response = res.rows;
        if (response && response[0].is_delete) {
          // console.log(response[0]);
          moveData();
        } else {
          console.log("empty");
        }
      }
    });
  }
});
// moveData();
