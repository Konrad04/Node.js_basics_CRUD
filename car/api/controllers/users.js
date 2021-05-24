const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user');



exports.userNew=(req, res, next) => {
  bcrypt.hash(req.body.password, 5, (err, hash) => {
    if (err) {
      res.status(500).json({ komunikat: err });
    } else {
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        login: req.body.login,
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then((user) => {
          res.status(201).json({
            komunikat: 'Dodano nowego użytkownika',
            info: user,
          });}).catch((err) => res.status(500).json({ komunikat: err }));
    }
  });
};




exports.userRemove=(req, res, next) => {
    const id = req.params.u_id;
    User.findByIdAndDelete(id).then(doc => {
            res.status(200).json({komunikat: 'Usunięto użytkownika o nr '+ id +' z bazy danych',
            info: doc});}).catch((err) => res.status(500).json({komunikat: err}));
    
};

exports.userEdit=(req, res, next) => {
    const id = req.params.u_id;
    User.findByIdAndUpdate(id,
     {   
         login: req.body.login,
         email: req.body.email,
         password: req.body.password,   
     },{ new: true }
    ).then((doc) => {
        res.status(200).json({komunikat: "Zmiana danych użytkownika o nr id: " + id,
         info: doc,
        });}).catch((err) => res.status(500).json({komunikat: err}));
 };



exports.userLog=(req, res, next) => {
  User.findOne({ login: req.body.login })
    .then((user) => {
      if (!user) {
        res.status(401).json({ komunikat: 'Nieprawidłowe logowanie. Spróbuj jeszcze raz' });
      }
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          res.status(500).json({ komunikat: err });
        }
        if (result) {
        res.status(200).json({
            komunikat: 'Nastapiło zalogowanie',
            
          }); } else {
          res.status(401).json({ komunikat: 'Nieprawidłowe logowanie. Spróbuj jeszcze raz' });
        }
      });
    }) .catch((err) => res.status(500).json({ komunikat: err }));
};


exports.userAll=(req, res, next) => {
    User.find().then((doc) => {
        res.status(200).json({komunikat: "Lista wszystkich użytkowników",
        info: doc, });}).catch((err) => res.status(500).json({komunikat: err}));
};

