// Setup the webserver with Node.JS Express
require('dotenv').config()
//DEPENDENCIES
const express = require('express')
const app = express()
//CONFIG
const { SESSION_SECRET } = process.env
app.set('port', process.env.PORT || 8008)

const methodOverride = require('method-override')
const expressEjsLayout = require('express-ejs-layouts')
const session = require('express-session')
const recordsController = require('./controllers/records')
const sessionsController = require('./controllers/sessions')//Find styling etc.

app.use(express.static('public'))
app.use(methodOverride('_method'))


app.use(express.urlencoded({extended:false}))

app.use(expressEjsLayout)
app.set('view engine', 'ejs')

//Session Middleware
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

//middleware for session's user
app.use((req,res, next) => {
    res.locals.username = req.session.username
    res.locals.loggedIn = req.session.loggedIn
    next()
})

//Flash Message for all routes
app.use((req, res, next) => {
    res.locals.message = req.session.message
    req.session.message = ""
    next()
})

//Limit access
const authRequired = (req, res, next) => {
    if (req.session.loggedIn){
        next()
    } else {
        res.redirect('/sessions/login')
    }
}

//controllers set
app.use('/records', recordsController)
app.use('/sessions', sessionsController)

app.get('/setCookie/:data', (req, res) => {
    req.session.data = req.params.data
    res.send('sessions data set')
})

app.get('/getSessionInfo', (req, res) => {
    res.send(req.session.data)
})

//LISTEN providing the port to view where the app can be viewed while in predeployment
app.listen(app.get('port'), () => console.log(`The record spins!  On port: ${app.get('port')}`))

