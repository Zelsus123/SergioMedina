require("dotenv").config();
const Config = {
  PORT: process.env.PORT,
};

const Database = {
  username: process.env.DB_USERNAME || "avnadmin",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_DATABASE || "defaultdb",
  host: process.env.DB_HOST || "mysql-1e69a219-sergiomedina.e.aivencloud.com",
  dialect:  "mysql",
};

module.exports = {
  Config,
  Database,
};