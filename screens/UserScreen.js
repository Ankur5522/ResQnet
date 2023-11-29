// UserScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const UserScreen = ({ route }) => {
  const { userId } = route.params;

  const [users, setUsers] = useState([]);
  const [joinedUsers, setJoinedUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`http://10.0.2.2:5000/user/find-users`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const usersData = await response.json();
       
        const filteredUsers = usersData.filter(user => user._id !== userId && !joinedUsers.includes(user._id));
        setUsers(filteredUsers);

      } catch (error) {
        console.error('Error fetching users:', error.message);
      }
    };

    fetchUsers();
  }, [userId, joinedUsers]);

  const handleJoinPress = async (selectedUserId) => {
    try {
      const response = await fetch('http://10.0.2.2:5000/resQnetServer/chats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstId: userId,
          secondId: selectedUserId,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const chatData = await response.json();
      console.log('Chat created:', chatData);

      setJoinedUsers(prevJoinedUsers => [...prevJoinedUsers, selectedUserId]);

    } catch (error) {
      console.error('Error creating chat:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.userItem} onPress={() => handleJoinPress(item._id)}>
            <Text style={styles.userName}>{item.name}</Text>
            <Text style={styles.joinButton}>Join</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  userItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#4A55A2',
    borderRadius: 10,
    padding: 15,
    marginBottom: 8,
  },
  userName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  joinButton: {
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 5,
    color: '#4A55A2',
  },
});

export default UserScreen;
