const express = require('express');
const config = require('../config');
const swagger = require('swagger-ui-express')
const app = express();

const users = require('./components/users/network');
const auth = require('./components/auth/network');
const swaggerDoc = require('./swagger.json');

const errors = require('../network/errors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api-docs', swagger.serve, swagger.setup(swaggerDoc));

app.use(errors);

app.listen(config.api.port, ()=>{
    console.log(`Api escuchando en el puerto ${config.api.port}`);
});