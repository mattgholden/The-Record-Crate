const express = require ('express')
const router = express.Router()
const Record = require('../models/records')

//ROUTES
//INDEX
router.get('/', (req, res) => {
    Record.find({}, (err, records) => {
    res.render('index.ejs', {records})
    })
})

//NEW
router.get('/new', (req,res) => {
    res.render('new.ejs')
})

//SHOW
router.get('/:id', (req, res) => {
    Record.findById(req.params.id, (err, record) => {
        res.render('show', {record})
    })  
})

//CREATE
router.post('/', (req, res) => {
    if(req.body.readyToListen === 'on'){
        req.body.readyToListen = true
    } else {
       req.body.readyToListen = false 
    }
    Record.create(req.body, (err, createdRecord) => {
        res.redirect('/records')
    })
})

//DELETE
router.delete('/:index', (req,res) => {
    records.splice(req.params.index, 1)
    res.redirect('/records')
})

//UPDATE
router.put('/:index', (req, res) => {
    if(req.body.readyToListen === 'on'){
        req.body.readyToListen = true
    } else {
        req.body.readyToListen = false
    }
    records[req.params.index] = req.body
    res.redirect('/records')
})
//EDIT
router.get('/:index/edit', (req, res) => {
    res.render ('edit.ejs',{record: records[req.params.index], index: req.params.index})
})

module.exports = router