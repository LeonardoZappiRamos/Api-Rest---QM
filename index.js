const express = require('express');

const AuthRouter = require('./routes/auth');
const ReportRouter = require('./routes/report');
const UserRouter = require('./routes/user');
const RoleRouter = require('./routes/role');

const app = express();

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/auth', AuthRouter);
app.use('/api/user', UserRouter);
app.use('/api/report', ReportRouter);
app.use('/api/role', RoleRouter);

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

const PORT = process.env.PORT || 3000;

app.listen(PORT, 'localhost', () => {
  console.log('listening on port ' + PORT)
});

