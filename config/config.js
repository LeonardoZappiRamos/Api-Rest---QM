require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.DATABASE_USERNAME,
    "password": process.env.DATABASE_PASS,
    "database": process.env.DATABASE_NAME,
    "host": process.env.DATABASE_HOSTNAME,
    "port": process.env.DATABASE_PORT,
    "dialect": process.env.DATABASE_NAME
  }
}