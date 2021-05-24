const mongoose = require('mongoose');

const carSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    brand: String,
    yearOfProduction: String,
    price: Number,
    color: String,
    vMax: Number,
    type: String,
    
})

module.exports = mongoose.model("Car", carSchema);