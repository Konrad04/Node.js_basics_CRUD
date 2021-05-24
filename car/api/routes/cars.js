const express = require('express');
const router = express.Router();

const CarsController = require('../controllers/cars');

router.get('/',  CarsController.carAll);

router.get('/:id', CarsController.carDetails);

router.post('/', CarsController.carNew);

router.delete('/:id', CarsController.carRemove);

router.patch('/:id',  CarsController.carEdit);

module.exports=router;