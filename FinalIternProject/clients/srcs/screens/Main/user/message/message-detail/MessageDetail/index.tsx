import {
  Box,
  HeaderApp,
  HeaderUserChat,
  LoadingComponent,
  performanceNavigation,
  PerformanceNavigationHOC,
  TextApp,
} from '@component';
import {ColorsStatic, RouteMain} from '@constants';
import {useNavigation} from '@react-navigation/native';
import {TAppNavigation} from '@types';
import {BoxInputChat} from './BoxInputChat';
import {useEffect, useState} from 'react';
import {receiveMessageSocket, sendMessageSocket, socket} from '@api';
import axios from 'axios';
import {KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import {FontSize, scaler} from '@themes';

const MessageDetailScreen: React.FC<PerformanceNavigationHOC> = ({
  navigateFinish,
}) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState(''); // State for new message input
  const senderId = 1; // ID of the current user
  const receiverId = 63; // ID of the admin or other user

  useEffect(() => {
    // Fetch messages from the API when the screen opens
    fetchMessages();

    // Set an interval to fetch messages every second after sending
    const interval = setInterval(() => {
      fetchMessages();
    }, 1000);

    // Listen for new messages via Socket.io
    receiveMessageSocket((newMessage: any) => {
      setMessages((prevMessages: any) => [...prevMessages, newMessage]);
    });

    return () => {
      clearInterval(interval); // Clear the interval on unmount
      socket.disconnect(); // Disconnect socket on unmount
    };
  }, []);

  // Function to fetch messages from the API
  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        `http://192.168.31.22:3000/api/chat/${senderId}/${receiverId}`,
      );
      setMessages(response.data.messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  // Function to handle sending a new message
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const messageToSend = {
      sender_id: senderId,
      receiver_id: receiverId,
      message: newMessage.trim(),
    };

    setMessages(prevMessages => [...prevMessages, messageToSend]); // Update messages state immediately

    // Send message via API
    axios
      .post('http://192.168.31.22:3000/api/chat', messageToSend)
      .then(() => {
        sendMessageSocket(messageToSend); // Send message via Socket.io
        setNewMessage(''); // Clear the input after sending
      })
      .catch(error => {
        console.error('Error sending message:', error);
      });
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0} // Adjust this value based on your header height
    >
      <Box flex={1}>
        <HeaderUserChat title="GOHOMY" goBack />
        {navigateFinish ? (
          <Box flex={1}>
            {/* Display the list of messages */}
            <ScrollView
              contentContainerStyle={{flexGrow: 1}}
              style={{
                flex: 0.8,
                padding: scaler(8),
                backgroundColor: ColorsStatic.white,
              }}>
              {messages.map((msg: any, index: any) => (
                <Box
                  key={index}
                  alignSelf={
                    msg.sender_id === senderId ? 'flex-end' : 'flex-start'
                  }
                  mb={scaler(10)}>
                  <Box
                    color={msg.sender_id === senderId ? '#0084ff' : '#f0f0f0'}
                    borderRadius={20}
                    p={10}
                    maxW="80%">
                    <TextApp
                      size={FontSize.Font13}
                      weight={700}
                      color={msg.sender_id === senderId ? '#fff' : '#000'}>
                      {msg.message}
                    </TextApp>
                  </Box>
                </Box>
              ))}
            </ScrollView>
            {/* Input box for sending messages */}
            <BoxInputChat
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              handleSendMessage={handleSendMessage}
            />
          </Box>
        ) : (
          <LoadingComponent />
        )}
      </Box>
    </KeyboardAvoidingView>
  );
};

export const MessageDetail = performanceNavigation(MessageDetailScreen);
