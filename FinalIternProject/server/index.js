/** @format */
const express = require('express');
const cors = require('cors');
const path = require('path'); // <-- Add this line
const { connectDB } = require('./src/configs/connectDB');
const authRouter = require('./src/routers/authRouter');
const errorMiddleHanle = require('./src/middlewares/errorMiddleware');
const asyncHandle = require('express-async-handler');
const boardingHouseRouter = require('./src/routers/mainRouter/boardingHouseRouter');
const filterRouter = require('./src/routers/mainRouter/filterRouter');
const bookingRouter = require('./src/routers/mainRouter/bookingRouter');
const socketIo = require('socket.io');
const handleChatSocket = require('./src/socket/chatSocket');
const http = require('http');
const chatRouter = require('./src/routers/mainRouter/chatRouter');

const app = express();
const PORT = 3000;

// const server = http.createServer(app); 

app.use(cors())
app.use(express.json());  
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Correctly use path now
// Use the authRouter for authentication-related routes
app.use('/auth', authRouter);
app.use('/api',boardingHouseRouter);
app.use('/api',filterRouter);
app.use('/api',bookingRouter);
app.use('/api', chatRouter);
 
connectDB();

app.use(errorMiddleHanle);

// Start server
const server = app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`Server starting at http://localhost:${PORT}`);
});

const io = socketIo(server, {
    cors: {
        origin: "*", 
        methods: ["GET", "POST"]
    }
});
handleChatSocket(io);
