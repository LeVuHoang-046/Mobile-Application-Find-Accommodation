/** @format */
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./src/configs/connectDB');
const authRouter = require('./src/routers/authRouter');
const errorMiddleHanle = require('./src/middlewares/errorMiddleware');
const asyncHandle = require('express-async-handler');
const app = express();
const PORT = 3000;

app.use(cors())
app.use(express.json());  

// Use the authRouter for authentication-related routes
app.use('/auth', authRouter);

connectDB();

app.use(errorMiddleHanle)

app.listen(PORT, (err)=> {
    if (err) {
        console.log(err);
        return
    }
    console.log(`Server starting at http://localhost:${PORT}`)
})