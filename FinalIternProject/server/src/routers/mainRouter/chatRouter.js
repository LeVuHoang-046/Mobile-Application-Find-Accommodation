//chat Router
const express = require('express');
const { saveMessage, getMessages } = require('../../controllers/socket/chatController');


const chatRouter = express.Router();

// Route lưu tin nhắn
chatRouter.post('/chat', saveMessage);

// Route lấy tin nhắn giữa hai người dùng
chatRouter.get('/chat/:sender_id/:receiver_id', getMessages);

module.exports = chatRouter;