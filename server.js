//DEPENDENCIES
const express = require('express')
const app = express()
const expressEjsLayouts = require('express-ejs-layouts')
const mongoose = require ('mongoose')

//CONFIG 
const PORT = 9400
//LISTEN
app.listen(PORT, () => console.log(`The record spins!  On port ${PORT}`))

