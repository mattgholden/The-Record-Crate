const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost:27017/records'

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(instance => {
    console.log(`Connected to the db: ${instance.connections[0].name}`)
})
.catch(err => console.log(`Connection failed`, err))

module.exports = mongoose

// db.on("error", err => console.log(err.message + " is MongoDB not running?"));
// db.on("connected", () => console.log ("MongoDB connected on: ", mongoURI));
// db.on("disconnected", () => console.log ("MongoDB disconnected"));

// const manyRecords = {
//     title: "Tron: Legacy",
//     artist: "Daft Punk"
// }

// Record.insertMany(manyRecords, (error, records) => {
//     if(error){
//         console.log(error)
//     }else{
//         console.log(records)
//     }
// })