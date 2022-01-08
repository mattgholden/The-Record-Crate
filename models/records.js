const mongoose = require('../db/connection')
const Schema = mongoose.Schema

const recordSchema = new mongoose.Schema({
    title: {type: String, required: true},
    artist: {type: String, required: true},
    tracklist: {type: String},
    img: {type: String},
    mintCondition: {Boolean, required: true}
})

const Record = mongoose.model('Record', recordSchema)

module.exports = Record

