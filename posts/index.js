const express = require('express');


const post = require('./components/post/routes');
const errors = require('../network/errors');
const config = require('../config');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTER
app.use('/api/posts', post);

app.use(errors);

app.listen(config.post.port, () => {
    console.log('Servicio posts escuchando en el puerto ', config.post.port);
});