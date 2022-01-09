const mongoose = require('../db/connection')

const recordSchema = new mongoose.Schema({
    title: {type: String, required: true},
    artist: {type: String, required: true},
    genre: {type: String},
    numberOfSongs: {type: Number},
    img: {type: String},
    readyToListen: {type: Boolean, required: true}
})

const Record = mongoose.model('Record', recordSchema)

module.exports = Record

