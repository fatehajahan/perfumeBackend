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
    origin: ['http://localhost:5173', 'http://localhost:5174', 'https://perfume-frontend-vert.vercel.app'],
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json());
const store = new MongoDBStore({
    uri: `${process.env.DB_URL}`,
    collection: 'mySessions'
})

app.set('trust proxy', 1);
app.use(
    session({
        secret: 'fateha',
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: true,
            httpOnly: true,
            sameSite: 'none'
        },
        store: store
    })
)
app.use('/api/v1/upload', express.static('upload'))

app.use(route)
app.listen(port, () => {
    console.log("backend is running");
})