require('dotenv').config()
//DEPENDENCIES
const express = require('express')
const app = express()
// const PORT = process.env.PORT
// const SESSION_SECRET = process.env.SESSION_SECRET
const { PORT, SESSION_SECRET } = process.env
const methodOverride = require('method-override')
const expressEjsLayout = require('express-ejs-layouts')
const session = require('express-session')
const recordsController = require('./controllers/records')
const sessionsController = require('./controllers/sessions')//Find styling etc.
app.use(express.static('public'))
app.use(methodOverride('_method'))

const routeHit = (req,res,next) => {
    console.log("A new route was just hit")
    next()
}
app.use(routeHit)

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
    res.locals.message = req.session.message
    next()
})

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

//LISTEN
app.listen(PORT, () => console.log(`The record spins!  On port: ${PORT}`))

