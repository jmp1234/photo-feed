import React from 'react';
import { FlatList, StyleSheet, Text, View, Image } from 'react-native';

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Profile</Text>
      </View>
    )
  }


}

export default Profile;
