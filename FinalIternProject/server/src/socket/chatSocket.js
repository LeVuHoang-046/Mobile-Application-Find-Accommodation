

const handleChatSocket = (io) => {
    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);

        // Lắng nghe sự kiện gửi tin nhắn
        socket.on('send_message', (data) => {
            const { sender_id, receiver_id, message } = data;

            // Lưu tin nhắn vào database
            const query = `INSERT INTO chat_message (sender_id, receiver_id, message) VALUES (?, ?, ?)`;
            db.query(query, [sender_id, receiver_id, message], (err, result) => {
                if (err) throw err;
                console.log('Message saved to database');
            });

            // Phát tin nhắn cho người nhận (hoặc tất cả client)
            io.emit('receive_message', data);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });
};

module.exports = handleChatSocket;
