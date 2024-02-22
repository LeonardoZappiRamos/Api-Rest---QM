const express = require('express');
const db = require('./models/index');
const AuthRouter = require('./routes/auth');
const ReportRouter = require('./routes/report');
const UserRouter = require('./routes/user');
const RoleRouter = require('./routes/role');

const { connection } = require('./database/oracledb')

const app = express();

require('dotenv').config()

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/auth', 
  // #swagger.tags = ['Auth']
  AuthRouter
);

app.use('/api/user', 
  // #swagger.tags = ['User']
  UserRouter
);
app.use('/api/report', 
  // #swagger.tags = ['Report']
  ReportRouter
);

app.use('/api/role', 
  // #swagger.tags = ['Role']
  RoleRouter
);

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

start();

app.listen(PORT, 'localhost', () => {
  console.log('listening on port ' + PORT)
});

async function start(){
  try {
    await connection();
    await db.sequelize.authenticate();
    console.log('DataBase connection was a success.')
  }catch(err){
    if(err){
      throw err;
    }
  }
};