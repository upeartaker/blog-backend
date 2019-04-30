const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let option = {
    uid:Number,
    username:String,
    password:String
};

let model = mongoose.model('user',new Schema(option));

module.exports = model
