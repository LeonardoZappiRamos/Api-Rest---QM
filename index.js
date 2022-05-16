const express = require('express');

const AuthRouter = require('./routes/auth');
const ReportRouter = require('./routes/report');

const app = express();

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/user', AuthRouter);
app.use('/api/report', ReportRouter);

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

const PORT = process.env.PORT || 3000;

app.listen(PORT, 'localhost', () => {
  console.log('listening on port ' + PORT)
});

