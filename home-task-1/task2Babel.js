import csv from "csvtojson";
import fs from "fs";

const FILE_NAME = "nodejs-hw1-ex1";

const csvFilePath = `./${FILE_NAME}.csv`;

//loading the whole file in memory
csv()
  .fromFile(csvFilePath)
  .then((jsonObj) => {
    console.log(typeof jsonObj);
    fs.writeFile(
      `./${FILE_NAME}-with-babel.txt`,
      JSON.stringify(jsonObj),
      { flag: "w+" },
      (err) => {
        if (err) console.log(err);
      }
    );
  });

//loading line by line
csv()
  .fromFile(csvFilePath)
  .subscribe(
    (json, lineNumber) => {
      fs.writeFile(
        `./${FILE_NAME}-line-by-line-with-babel.txt`,
        JSON.stringify(json),
        { flag: "a+" },
        (err) => {
          if (err) console.log(err);
        }
      );
    },
    (err) => {
      if (err) console.log(err);
    },
    () => {}
  );
