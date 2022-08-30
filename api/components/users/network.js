const express = require('express');
const router = express.Router();
const secure = require('./secure')
const response = require('../../../network/response')
const controller = require('./index');

const list = async (req, res)=>{
    try {
        const list = await controller.list();
        response.success(req, res, list, 200);
    } catch (error) {
        response.error(req, res, error.message, 500)
    }
}

const get = async (req, res)=>{
    try {
        const user = await controller.get(req.params.id);
        response.success(req, res, user, 200);
    } catch (error) {
        response.error(req, res, error.message, 500)
    }
    
}

const upsert = async (req, res) =>{
    try {
        const user = await controller.upsert(req.body);
        response.success(req, res, user, 201);
    } catch (err) {
        response.error(req, res, err.message, 500);
    }
    
}

const follow = async (req, res, next)=> {
    try {
        const userFllow = await controller.follow(req.user.id, req.params.id);
        response.success(req, res, userFllow, 201);
    } catch (err) {
        response.error(req, res, err.message, 500);
    }
}

// Routes
router.get('/', list)
router.get('/:id', get);
router.post('/', upsert);
router.post('/follow/:id',secure('follow'), follow);
router.put('/', secure('update'), upsert);

module.exports = router;