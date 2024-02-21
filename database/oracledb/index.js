const oracledb = require('oracledb');
const dbConfig = require("../../config/configOracle");

const libPath = 'D:\\oracle\\instantclient_21_3'

async function connection() {
  oracledb.initOracleClient({ libDir: libPath })
  try {
    const poll = await oracledb.createPool(dbConfig.hrPool);
  }catch(e){
    if(e) throw e;
  }
};

const close = async () => {
  try {
    await oracledb.getPool().close(0)
  }catch(e) {
    if(e) return e;
    process.exit(1);
  }
}

const execute = async (query) => {
  try{
    const connection = await oracledb.getConnection(); 
    const result = await connection.execute(query);
    await connection.close();
    return result;
  }catch(e) {
    if(e) throw e;
    console.log(e)
  }
}

module.exports.connection = connection;
module.exports.close = close;
module.exports.execute = execute;