const mongoose = require("mongoose");

function dbConnection() {
    mongoose.connect(`mongodb+srv://${process.env.DBUSER_NAME}:${process.env.DBUSER_PASSWORD}@cluster0.liaz7.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`)
    .then(() => console.log('db conneted'));
}

module.exports = dbConnection