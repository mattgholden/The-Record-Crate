const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/users')
// import './public/css/app.css';

const router = express.Router()

//Main Route
router.get('/', (req, res) => {
    res.send('Session controller works')
})

router.get('/signup', (req, res) => {
    res.render('sessions/signup.ejs')
})

router.post('/signup', async (req, res, next) => {
    try{
            const desiredUsername = req.body.username
            const userExists = await User.findOne({username: desiredUsername})
            if(userExists) {
                req.session.message = ('Username already in use')
                res.redirect('/sessions/signup')
            } else {
                const salt = bcrypt.genSaltSync(10)
                const hashedPassword = bcrypt.hashSync(req.body.password, salt)
                req.body.password = hashedPassword
                const createdUser = await User.create(req.body)
                req.session.username = createdUser.username
                req.session.loggedIn = true
                res.redirect('/records')
            }
    } catch(err) {
        next(err)
    }
})

router.get('/login', (req, res) => {
    res.render('sessions/login')
})

router.post('/login', async(req, res, next) => {
    try{
        const userToLogin = await User.findOne({username: req.body.username})
        if(userToLogin){
            const validPassword = bcrypt.compareSync(req.body.password, userToLogin.password)
            if(validPassword){
            req.session.username = userToLogin.username
            req.session.loggedIn = true
            res.redirect('/records')
            } else {
                req.session.message = "Invalid username or password"
                res.redirect('/sessions/login')
            }
        } else {
            res.redirect('/sessions/login')
        }
    } catch (err) {
        next(err)
    }    
})

router.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/sessions/login')
})

module.exports = router