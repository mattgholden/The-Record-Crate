//DEPENDENCIES
const express = require('express')
const app = express()
const methodOverride = require('method-override')
const expressEjsLayout = require('express-ejs-layouts')
const recordsController = require('./controllers/records')
// const mongoose = require ('mongoose')
// const db = mongoose.connection
//CONFIG 
// const PORT = 8008


//Find styling etc.
app.use(express.static('public'))
app.use(methodOverride('_method'))

const routeHit = (req,res,next) => {
    console.log("A new route was just hit");
    next()
}
app.use(routeHit)

app.use(express.urlencoded({extended:false}))

app.use(expressEjsLayout)
app.set('view engine', 'ejs')
app.set('port', process.env.PORT || 8000)

console.log(process.env.PORT)

app.use('/records', recordsController)

// mongoURI = 'mongodb://localhost:27017/crate'


//LISTEN
app.listen('port', () => 
    console.log(`The record spins!  On port: ${app.get('port')}`))

