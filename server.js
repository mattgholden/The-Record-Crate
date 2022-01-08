//DEPENDENCIES
const express = require('express')
const app = express()
const expressEjsLayout = require('express-ejs-layouts')
const mongoose = require ('mongoose')
const db = mongoose.connection

const routeHit = (req,res,next) => {
    console.log("A new route was just hit");
    next()
}

app.use(routeHit)
app.use(express.urlencoded({extended:false}))
app.use(expressEjsLayout)
app.set('view engine', 'ejs')

mongoURI = 'mongodb://localhost:27017/crate'

//DATA
const records = ['Tron: Legacy']

//CONFIG 
const PORT = 8008

//ROUTES
//INDEX
app.get('/records/', (req, res) => {
    res.send(records)
})

//NEW
app.get('/records/new', (req,res) => {
    res.render('new.ejs')
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

//CREATE
app.post('/records', (req, res) => {
    console.log('Create route accessed!')
    console.log('Req.body is', req.body)
    res.send(req.body)
})

//LISTEN
app.listen(PORT, () => console.log(`The record spins!  On port ${PORT}`))

