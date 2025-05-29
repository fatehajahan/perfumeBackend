require('dotenv').config()
const express = require("express");
const session = require('express-session')
const MongoDBStore = require("connect-mongodb-session")(session)
const dbConnection = require("./database/dbConnection");
const route = require("./route");
const cors = require("cors");
const app = express();

const port = 3000;
dbConnection()

const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
    optionsSuccessStatus: 200,
    // methods: ['GET', 'POST', 'PUT', 'DELETE'],
    // credentials: true,
    // allowedHeaders: ['Content-Type', 'Authorization']
}
app.use(cors(corsOptions));

app.use(express.json());
const store = new MongoDBStore({
    uri: `mongodb+srv://${process.env.DBUSER_NAME}:${process.env.DBUSER_PASSWORD}@cluster0.liaz7.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`,
    collection: 'mySessions'
})

app.use(
    session({
        secret: 'fateha',
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            httpOnly: true,
            sameSite: 'lax'
        },
        store: store
    })
)
app.use('/api/v1/upload', express.static('upload'))

app.use(route)
app.listen(port, () => {
    console.log("backend is running");
})