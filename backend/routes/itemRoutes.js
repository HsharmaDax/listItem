const express = require('express');
const router = express.Router();
const { getAllTask, updateItem, deleteItem, addItem } = require('../controllers/item');
const middleware = require('../middleware');

router.post('/add/:userid',middleware, addItem)

router.put('/update/:id',middleware, updateItem)

router.delete('/delete/:id',middleware, deleteItem)

router.get('/allitems/:userid',middleware, getAllTask)

module.exports = router
