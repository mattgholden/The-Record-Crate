const express = require ('express')
const router = express.Router()

//ROUTES
//INDEX
router.get('/', (req, res) => {
    res.render('index.ejs', {records})
})

//NEW
router.get('/new', (req,res) => {
    res.render('new.ejs')
})

//SHOW
router.get('/:indexOfRecordsArray', (req, res) => {
    res.render('show', {record: [req.params.indexOfRecordsArray]})
})

//CREATE
router.post('/', (req, res) => {
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
router.delete('/:index', (req,res) => {
    records.splice(req.params.index, 1)
    res.redirect('/records')
})

//UPDATE
router.put('/:index', (req, res) => {
    if(req.body.mintCondition === 'on'){
        req.body.mintCondition = true
    } else {
        req.body.mintCondition = false
    }
    records[req.params.index] = req.body
    res.redirect('/records')
})
//EDIT
router.get('/:index/edit', (req, res) => {
    res.render ('edit.ejs',{record: records[req.params.index], index: req.params.index})
})

module.exports = router