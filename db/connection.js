const Record = require("../models/records");

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, () => console.log('connection to MongoDB is established'))

db.on("error", err => console.log(err.message + " is MongoDB not running?"));
db.on("connected", () => console.log ("MongoDB connected on: ", mongoURI));
db.on("disconnected", () => console.log ("MongoDB disconnected"));

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