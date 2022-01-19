const express = require ('express')
const router = express.Router()
const Record = require('../models/records')

//middleware
const authRequired = (req, res, next) => {
    if (req.session.loggedIn){
        next()
    } else {
        res.redirect('/sessions/login')
    }
}

//ROUTES
//INDEX
router.get('/', (req, res) => {
    Record.find({}, (err, records) => {
        res.render('index', {
            records,
            username: req.session.username
        })
    })
})

//NEW
//only users with an account can add new records
router.get('/new', authRequired, (req,res) => {
    res.render('new')
})

//SHOW
router.get('/:id', authRequired, (req, res) => {
    Record.findById(req.params.id, (err, records) => {
        res.render('show', {records})
    })  
})

//CREATE
router.post('/', authRequired, (req, res) => {
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
router.delete('/:id', authRequired, (req,res) => {
    Record.findByIdAndRemove(req.params.id, (err, deletedRecord) => {
        res.redirect('/records')
    })
})

//UPDATE
router.put('/:id', authRequired, (req, res) => {
    if(req.body.readyToListen === 'on'){
        req.body.readyToListen = true
    } else {
        req.body.readyToListen = false
    }
    Record.findByIdAndUpdate(req.params.id, req.body,{new:true},(err, updatedModel) => {
        // console.log(updatedModel)
        res.render('edit', {records: updatedModel})
    } )
})

//EDIT
router.get('/:id/edit', authRequired, (req, res) => {
    Record.findById(req.params.id, (err, records) => {
        res.render('edit', {records})
    })
})

module.exports = router
