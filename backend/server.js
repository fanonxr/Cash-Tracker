// get all needed modules
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// configure our environment vars
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;

// connect routes
const userRouter = require('./routes/users');
const expenseRouter = require('./routes/expenses');

// middleware
app.use(cors());
app.use(express.json()); // allows us to parse json

// conecting to mongo db
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established succesfully!")
});

app.use('/users', userRouter);
app.use('/expenses', expenseRouter)

// start listening on given port
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
});