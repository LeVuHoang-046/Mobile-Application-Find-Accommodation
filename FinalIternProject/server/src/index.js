/** @format */
const express = require('express');
const {connectDB, connection}  = require('./src/configs/connectDB');
const authRouter = require('./src/routers/authRouter');
const cors = require('cors')

const app = express();
const PORT = 3000;
app.use(cors())
app.use(express.json());  // Middleware to parse JSON body data

// Use the authRouter for authentication-related routes
app.use('/auth', authRouter);

connectDB();


app.listen(PORT, (err)=> {
    if (err) {
        console.log(err);
        return
    }
    console.log(`Server starting at http://localhost:${PORT}`)
})