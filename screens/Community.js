import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { io } from 'socket.io-client/dist/socket.io';

const Community = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [chatsWithReceiverNames, setChatsWithReceiverNames] = useState([]);
  const [socket, setSocket] = useState(null);
  const userId = route.params?.userId;

  useEffect(() => {
    const newSocket = io("http://10.0.2.2:6000", {
      transports: ['websocket'],
      jsonp: false,
      'forceNew': true
    });
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
      console.log('Socket disconnected during cleanup');
    };
  }, [userId]);

  useEffect(() => {
    if (socket === null) return;
    socket.emit("addnewuser", userId);

  }, [socket]);

  useEffect(() => {
    fetchUserChats(userId);
  }, [userId, socket]); 

  const fetchUserChats = async (userId) => {
    try {
      const response = await fetch(`http://10.0.2.2:5000/resQnetServer/chats/${userId}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const chatsData = await response.json();

      const chatsWithNames = await Promise.all(
        chatsData.map(async (chat) => {
          const receiverId = userId === chat.members[0] ? chat.members[1] : chat.members[0];
          const receiverName = await fetchUserName(receiverId);

          return {
            ...chat,
            receiverName,
          };
        })
      );

      setChatsWithReceiverNames(chatsWithNames);
    } catch (error) {
      console.error('Error fetching user chats:', error.message);
    }
  };

  const fetchUserName = async (userId) => {
    try {
      const response = await fetch(`http://10.0.2.2:5000/resQnetServer/getNameByUserId/${userId}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data.username || 'Unknown';
    } catch (error) {
      console.error('Error fetching user name:', error.message);
      return 'Unknown';
    }
  };

  const handleChatPress = (chatId, member1, member2, receiverName) => {
    const senderId = userId === member1 ? member1 : member2;
    const receiverId = userId === member2 ? member1 : member2;

    navigation.navigate('ChatScreen', { chatId, senderId, receiverId, receiverName });

    socket.emit('chatOpened', { chatId, senderId, receiverId });
  };

  return (
    <View>
      {chatsWithReceiverNames.length === 0 ? (
        <Text>No chats available</Text>
      ) : (
        <FlatList
          data={chatsWithReceiverNames}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.chatButton}
              onPress={() => handleChatPress(item._id, item.members[0], item.members[1], item.receiverName)}
            >
              <Text style={styles.chatButtonText}>{`Chat with ${item.receiverName}`}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  chatButton: {
    backgroundColor: '#4A55A2',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
  },
  chatButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


export default Community;
