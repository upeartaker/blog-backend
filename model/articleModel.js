const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let option = {
    uid:Number,
    details:String,
};

let model = mongoose.model('article',new Schema(option));

module.exports = model