const oracledb = require('oracledb');

require('dotenv').config();

dir = 'D:\\oracle\\orant\\instantclient_11_2'

const init = async () => {
  try {
    oracledb.initOracleClient({
      libDir: dir
    });
    const conn = await oracledb.getConnection({
      user: process.env.ORACLE_DATABASE_USER,
      password: process.env.ORACLE_DATABASE_PASSWORD,
      connectString: process.env.ORACLE_DATABASE_STRING
    });

    return conn;
  }catch (err) {
    console.log(err);
    process.exit(1);
  }
};

const close = async (connection) => {
  try {
    oracledb.close(connection);
  }catch (err) {
    console.log(err);
    process.exit(1);
  }
};

const execute = async (connection, sqlString) => {
  try {
    const result = await connection.execute(sqlString);

    return result;
  }catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports.init = init;
module.exports.close = close;
module.exports.execute = execute;