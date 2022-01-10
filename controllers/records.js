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
router.delete('/:id', (req,res) => {
    Record.findByIdAndRemove(req.params.id, (err, deletedRecord) => {
        res.redirect('/records')
    })
})

//UPDATE
router.put('/:id', (req, res) => {
    if(req.body.readyToListen === 'on'){
        req.body.readyToListen = true
    } else {
        req.body.readyToListen = false
    }
    Record.findByIdAndUpdate(req.params.id, req.body,{new:true},(err, updatedModel) => {
        console.log(updatedModel)
        res.render('edit', {record: updatedModel})
    } )
})

//EDIT
router.get('/:id/edit', (req, res) => {
    Record.findById(req.params.id, (err, record) => {
        res.render('edit', {record})
    })
    // res.render ('edit.ejs',{record: records[req.params.index], index: req.params.index})
})

module.exports = router