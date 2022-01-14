const express = require ('express')
const router = express.Router()
const Record = require('../models/records.js')

//ROUTES
//INDEX
router.get('/', (req, res) => {
    Record.find({}, (err, record) => {
        res.render('index.ejs', {
            records,
            username: req.session.username

        })
    })
})

//NEW
router.get('/new', (req,res) => {
    res.render('new.ejs')
})

//SHOW
router.get('/:id', (req, res) => {
    Record.findById(req.params.id, (err, records) => {
        res.render('show.ejs', {records})
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
        res.redirect('/records', {createdRecord})
    })
})

//DELETE
router.delete('/:id', (req,res) => {
    Record.findByIdAndRemove(req.params.id, (err, deletedRecord) => {
        res.redirect('/records', {deletedRecord})
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
        // console.log(updatedModel)
        res.render('edit', {record: updatedModel})
    } )
})

//EDIT
router.get('/:id/edit', (req, res) => {
    Record.findById(req.params.id, (err, records) => {
        res.render('edit', {records})
    })
    // res.render ('edit.ejs',{record: records[req.params.index], index: req.params.index})
})

module.exports = router