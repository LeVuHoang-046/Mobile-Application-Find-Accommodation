//chatController

const { connection } = require("../../configs/connectDB");


// Hàm lưu tin nhắn vào database
const saveMessage = (req, res) => {
    const { sender_id, receiver_id, message } = req.body;

    // Lưu tin nhắn vào database
    const query = 'INSERT INTO chat_message (sender_id, receiver_id, message) VALUES (?, ?, ?)';
    connection.query(query, [sender_id, receiver_id, message], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error saving message', error: err });
        }
        res.status(200).json({ message: 'Message saved', data: result });
    });
};

// Hàm lấy tin nhắn giữa hai người dùng
const getMessages = (req, res) => {
    const { sender_id, receiver_id } = req.params;

    // Lấy tin nhắn giữa hai người dùng
    const query = `SELECT * FROM chat_message WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?) ORDER BY time ASC`;
    connection.query(query, [sender_id, receiver_id, receiver_id, sender_id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching messages', error: err });
        }
        res.status(200).json({ messages: results });
    });
};

module.exports = { saveMessage, getMessages };