const { Database } = require("../config.js");
module.exports = {
  username: Database.username,
  password: Database.password,
  database: Database.database,
  host: Database.host,
  dialect: Database.dialect,
  define: {
    timestamps: false,
    underscored: true,
  },
};