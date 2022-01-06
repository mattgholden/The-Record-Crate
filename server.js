//DEPENDENCIES
const express = require('express')
const app = express()
const expressEjsLayouts = require('express-ejs-layouts')
const mongoose = require ('mongoose')
const db = mongoose.connection

mongoURI = 'mongodb://localhost:27017/crate'

//CONFIG 
const PORT = 8008

//INDEX
app.get('/', (req, res) => {
    res.send('Spin the Turntable')
})

app.get('/records', (req,res) => {
    res.render('index.ejs', {Record})
})

//LISTEN
app.listen(PORT, () => console.log(`The record spins!  On port ${PORT}`))

