require("dotenv").config();
const Config = {
  PORT: process.env.PORT,
};

const Database = {
  username: process.env.DB_USERNAME || "sql10709750",
  password: process.env.DB_PASSWORD || "wcZISxUkAB",
  database: process.env.DB_DATABASE || "sql10709750",
  host: process.env.DB_HOST || "sql10.freesqldatabase.com",
  dialect:  "mysql",
};

module.exports = {
  Config,
  Database,
};