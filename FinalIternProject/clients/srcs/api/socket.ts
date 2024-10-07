import io from 'socket.io-client';

// Thiết lập URL của server backend
const SOCKET_URL = 'http://localhost:3000';

// Khởi tạo kết nối Socket.io
export const socket = io(SOCKET_URL);

// Hàm gửi tin nhắn
export const sendMessageSocket = (messageData: any) => {
  socket.emit('send_message', messageData);
};

// Lắng nghe tin nhắn mới
export const receiveMessageSocket = (callback: any) => {
  socket.on('receive_message', (message) => {
    callback(message);
  });
};