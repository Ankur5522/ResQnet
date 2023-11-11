import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={{ flexDirection: 'row', backgroundColor: 'white' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isHomeTab = route.name === 'Home'; // Check if it's the Home tab

        const tabStyle = {
          flex: 1,
          alignItems: 'center',
          padding: 5,
          backgroundColor: isHomeTab ? '#F36172C2' : 'transparent', // Apply red background to Home tab
          borderTopLeftRadius: isHomeTab ? 30 : 0, // Add rounded corners to Home tab
          borderTopRightRadius: isHomeTab ? 30 : 0,
        };

        const labelStyle = {
          color: isHomeTab ? 'white' : 'black', // Change label color for Home tab
        };

        const iconStyle = {
          color: isHomeTab ? 'white' : 'black', // Change icon color for Home tab
        };

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isHomeTab && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={index}
            style={tabStyle}
            onPress={onPress}
          >
            <MaterialIcons
              name={options.iconName}
              size={24}
              style={iconStyle}
            />
            <Text style={labelStyle}>{route.name}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomTabBar;
