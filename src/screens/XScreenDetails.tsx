import React from 'react';
import { Text, View } from 'react-native';

const XScreenDetails = ({ navigation, route }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Game Details Screen</Text>
      <Text>{route.params?.title}</Text>
    </View>
  );
};

export default XScreenDetails;
