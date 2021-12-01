const mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1:27017/node-mongo-hw' // change this as needed

const Schema = mongoose.Schema;

const userTestSchema = new Schema({
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('userTest', userTestSchema);