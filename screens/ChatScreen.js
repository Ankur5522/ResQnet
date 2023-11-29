import React, { useEffect, useState, useRef } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import io from 'socket.io-client';
import { endpoint } from '../env';

const apiEndpoint = endpoint
const socket = io(`http://${apiEndpoint}:6000`);

const ChatScreen = () => {
  const route = useRoute();
  const { chatId, senderId, receiverId } = route.params || {};
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [senderNames, setSenderNames] = useState({});
  const flatListRef = useRef(null);

  useEffect(() => {
    socket.emit('joinChat', { chatId, userId: senderId });

    fetchChatMessages(chatId);

    socket.on('newMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);

      fetchSenderName(message.senderId);


      flatListRef.current.scrollToEnd({ animated: true });
    });

    socket.on('userDisconnected', (userId) => {
      console.log(`User ${userId} disconnected`);
    });

    return () => {
      socket.emit('leaveChat', { chatId, userId: senderId });
      socket.off('newMessage');
      socket.off('userDisconnected');
    };
  }, [chatId, senderId]);

  const fetchChatMessages = async (chatId) => {
    try {
      const response = await fetch(`http://${apiEndpoint}:5000/resQnetServer/messages/${chatId}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setMessages(data);

      data.forEach((message) => fetchSenderName(message.senderId));

      flatListRef.current.scrollToEnd({ animated: true });
    } catch (error) {
      console.error('Error fetching chat messages:', error.message);
    }
  };

  const fetchSenderName = async (senderId) => {
    try {
      const response = await fetch(`http://${apiEndpoint}:5000/user/getNameByUserId/${senderId}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setSenderNames((prevNames) => ({ ...prevNames, [senderId]: data.username || 'Unknown' }));
    } catch (error) {
      console.error('Error fetching sender name:', error.message);
    }
  };

  const handleSend = async () => {
    try {
      const response = await fetch(`http://${apiEndpoint}:5000/resQnetServer/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chatId,
          senderId,
          text: newMessage,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      socket.emit('sendMessage', {
        chatId,
        senderId,
        text: newMessage,
      });

      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error.message);
    }
  };

  const renderItem = ({ item }) => {
    const isSender = item.senderId === senderId;
    const senderName = senderNames[item.senderId] || 'Unknown';

    return (
      <View
        style={[
          styles.messageContainer,
          isSender ? styles.senderMessage : styles.receiverMessage,
        ]}
      >
        <Text>{`${isSender ? 'You' : senderName}: ${item.text}`}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true })}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={(text) => setNewMessage(text)}
          placeholder="Type your message..."
        />
        <Button title="Send" onPress={handleSend} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messageContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    maxWidth: '80%', 
    alignSelf: 'flex-end', 
    borderRadius: 8,
    marginVertical: 5,
  },
  senderMessage: {
    alignSelf: 'flex-end', 
    backgroundColor: '#DCF8C6',
  },
  receiverMessage: {
    alignSelf: 'flex-start', 
    backgroundColor: '#FFFFFF', 
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    padding: 10,
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    borderRadius: 8,
  },
});

export default ChatScreen;
