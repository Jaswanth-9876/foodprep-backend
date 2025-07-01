const express = require('express');
const foodRouter = express.Router();
const { addFood, listFood, removeFood } = require('../controllers/foodController');

foodRouter.post('/add', addFood);
foodRouter.get('/list', listFood);
foodRouter.delete('/remove', removeFood);

module.exports = foodRouter;
