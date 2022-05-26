require('dotenv').config();

module.exports = {
  hrPool: {
    user: process.env.NODE_ORACLEDB_USER || "user",

    password: process.env.NODE_ORACLEDB_PASSWORD || "password",

    connectString: process.env.NODE_ORACLEDB_CONNECTIONSTRING || "tns"
  }
};