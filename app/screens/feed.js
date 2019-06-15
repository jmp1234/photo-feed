import React from 'react';
import { FlatList, StyleSheet, Text, View, Image } from 'react-native';

class Feed extends React.Component {

  constructor(props) {
    super(props);
  }

  render () {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Feed</Text>
      </View>
    )
  }

}

export default Feed;
