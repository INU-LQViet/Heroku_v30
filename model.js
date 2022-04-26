const mongoose = require('mongoose');
const db = require('./connectMongoose');

const signalArduino = new mongoose.Schema({
  meta:[[]],
});


const Model = mongoose.model('modelData',signalArduino, "Database");
module.exports = Model;