const express = require('express');
const response = require('../../../network/response')
const controller = require('./index');
const router = express.Router();

router.post('/login', async (req, res)=> {
    try {
        const data = await controller.login(req.body.username, req.body.password);
        response.success(req, res, data, 200);
    } catch (error) {
        response.error(req, res, 'Invalid info', 400)
    }
})

module.exports = router;