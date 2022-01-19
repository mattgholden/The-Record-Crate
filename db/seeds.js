const mongoose = require('./connection')
const Record = require('../models/records')
const recordSeeds = require('./seeds.json')

Record.deleteMany({})
.then(() => {
    return Record.insertMany(recordSeeds)
}) 
.then(data => console.log(data))
.catch(err=> console.log(err))
.finally(() => {
    process.exit()
})

