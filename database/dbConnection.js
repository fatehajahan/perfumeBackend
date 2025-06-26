const mongoose = require("mongoose");

function dbConnection() {
    mongoose.connect(`${process.env.DB_URL}`)
    .then(() => console.log('db conneted'));
}

module.exports = dbConnection