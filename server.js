//DEPENDENCIES
const express = require('express')
const app = express()
const expressEjsLayouts = require('express-ejs-layouts')
const mongoose = require ('mongoose')
const db = mongoose.connection

mongoURI = 'mongodb://localhost:27017/crate'

//CONFIG 
const PORT = 8008

//ROUTES
//INDEX
app.get('/records', (req, res) => {
    res.send('Spin the Turntable')
})

//NEW
app.get('/records/new', (req,res) => {
    res.render('new')
})



//FIND
// app.find({})

//DELETE
// app.findByIdAndRemove()

//UPDATE
// app.findByIdandUpdate()

//SHOW
app.get('/records/:indexOfRecordsArray', (req, res) => {
    res.render('show', {record: [req.params.indexOfRecordsArray]})
})

//LISTEN
app.listen(PORT, () => console.log(`The record spins!  On port ${PORT}`))

