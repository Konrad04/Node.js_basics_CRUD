
const mongoose = require('mongoose');
const Car = require('../models/car');

exports.carNew=(req, res, next) => {
    const car = new Car ({
        _id: new mongoose.Types.ObjectId(),
        brand: req.body.brand,
        yearOfProduction: req.body.yearOfProduction,
        price: req.body.price,
        color: req.body.color,
        vMax: req.body.vMax,
        type: req.body.type, 
    });
    car.save().then((doc) => {res.status(200).json({komunikat: "Samochód dodany do katalogu" ,
            info: doc,
        });}).catch((err) => res.status(500).json({komunikat: err}));    
};


exports.carEdit=(req, res, next) => {
   const id = req.params.id;
   Car.findByIdAndUpdate(id,
    {
        brand: req.body.brand,
        yearOfProduction: req.body.yearOfProduction,
        price: req.body.price,
        color: req.body.color,
        vMax: req.body.vMax,
        type: req.body.type,
    },
    { new: true }
   ).then((doc) => {
       res.status(200).json({komunikat: "Zmiana danych samochodou o nr id: " + id,
        info: doc,
       });}).catch((err) => res.status(500).json({komunikat: err}));
};

exports.carRemove=(req, res, next) => {
    const id = req.params.id;
    Car.findByIdAndDelete(id).then(doc => {
            res.status(200).json({komunikat: 'Usunięcie samochodu o nr '+ id +' z katalogu',
            info: doc,
            });}).catch((err) => res.status(500).json({komunikat: err}));
};

exports.carDetails=(req, res, next) => {
    const id = req.params.id;
    Car.findById(id).then((doc) => {
        res.status(200).json({komunikat: 'Informacje o samodzie o nr '+ id,
        info: doc, });
    }).catch((err) => res.status(500).json({komunikat: err}));};

exports.carAll=(req, res, next) => {
    Car.find().then((doc) => {
        res.status(200).json({komunikat: "Katalog wszystkich samochodów",
        info: doc,});}).catch((err) => res.status(500).json({komunikat: err}));
};

