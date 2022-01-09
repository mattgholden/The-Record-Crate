//DEPENDENCIES
const express = require('express')
const app = express()
const expressEjsLayout = require('express-ejs-layouts')
const mongoose = require ('mongoose')
const db = mongoose.connection
const methodOverride = require('method-override')

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

mongoURI = 'mongodb://localhost:27017/crate'

//DATA
const records = ['Tron: Legacy']

//CONFIG 
const PORT = 8008

//ROUTES
//INDEX
app.get('/records/', (req, res) => {
    res.render('index.ejs', {records})
})

//NEW
app.get('/records/new', (req,res) => {
    res.render('new.ejs')
})

//SHOW
app.get('/records/:indexOfRecordsArray', (req, res) => {
    res.render('show', {record: [req.params.indexOfRecordsArray]})
})

//CREATE
app.post('/records', (req, res) => {
    // console.log('Create route accessed!')
    console.log('Req.body is', req.body)
    if(req.body.mintCondition === 'on'){
        req.body.mintCondition = true
    } else {
       req.body.mintCondition = false 
    }
    records.push(req.body)
    res.redirect('/records')
})

//DELETE
app.delete('/records/:index', (req,res) => {
    records.splice(req.params.index, 1)
    res.redirect('/records')
})

//UPDATE
app.put('/fruits/:index', (req, res) => {
    if(req.body.mintCondition === 'on'){
        req.body.mintCondition = true
    } else {
        req.body.mintCondition = false
    }
    records[req.params.index] = req.body
    res.redirect('/records')
})
//EDIT
app.get('/records/:index/edit', (req, res) => {
    res.render ('edit.ejs',{record: records[req.params.index], index: req.params.index})
})

//LISTEN
app.listen(PORT, () => console.log(`The record spins!  On port ${PORT}`))

