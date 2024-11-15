const express = require('express');
const { createCar, getCars, getCar, updateCar, deleteCar,searchCars } = require('../controllers/carController');
const verifyToken = require('../middleware/authMiddleware');
const router = express.Router();

// CRUD routes for cars
router.post('/', verifyToken, createCar);
router.get('/', verifyToken, getCars);
router.get('/search', verifyToken, searchCars); 
router.get('/:id', verifyToken, getCar);
router.put('/:id', verifyToken, updateCar);
router.delete('/:id', verifyToken, deleteCar);

module.exports = router;
