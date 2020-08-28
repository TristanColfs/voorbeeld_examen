const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");
const couchimport = require("couchimport");
const port = 3000;
const urlDB = "http://admin:admin@localhost:5984";
const nano = require("nano")(urlDB);
const dbName = "countries";
const opts = { delimiter: "\t", url: urlDB, database: dbName };
const data_file_path = "./dat/countries.txt";

const prepData = (urlDB) => {
  try {
    console.log(`Data file: ${data_file_path}\nDatabase: ${dbName}.`);

    if (!fs.existsSync(data_file_path)) {
      console.log("Data file not found, cannot refresh database");
      return;
    }

    nano.db.list().then((body) => {
      body.forEach((db) => {
        if (db.equals(dbName)) {
          nano.db.destroy(dbName).then((body) => {
            console.log("Database destroyed.");
          });
        }
      });
    });

    nano.db.create(dbName).then((body) => {
      console.log("Database (re-)initiated.");
    });

    couchimport.importFile(data_file_path, opts, (err, data) => {
      console.log("Database re-created.");
    });
  } catch (err) {
    console.error(err);
  }
};

const getData = (entity, lang, filter, res, limit = 50) => {
  const nameField = "Name_" + lang;
  const query = {
    selector: {},
    fields: ["Alpha_2", "Alpha_3", nameField, "Population"],
    limit: limit,
  };

  query["selector"][nameField] = { $regex: filter };

  nano.db
    .use(entity)
    .find(query)
    .then((fnd_res) => res.json(fnd_res.docs));
};

app.use(express.static(path.join(__dirname, "build")));

app
  .get("/:entity/:lang", (req, res) => {
    getData(req.params.entity, req.params.lang, ".*", res);
  })
  .get("/:entity/:lang/:filter", (req, res) => {
    getData(
      req.params.entity,
      req.params.lang,
      "(?i)" + req.params.filter,
      res
    );
  });

app.listen(port, () => console.log(`Listening on port ${port}`));

prepData();
