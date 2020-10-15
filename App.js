import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import Feed from './app/screens/feed';
import Upload from './app/screens/upload';
import Profile from './app/screens/profile';
import UserProfile from './app/screens/userProfile';
import Comments from './app/screens/comments';
import { f, auth, database, storage } from './config/config';

const TabStack = createBottomTabNavigator(
  {
    Feed: { screen: Feed},
    Upload: { screen: Upload},
    Profile: { screen: Profile}
  }
)

const MainStack = createStackNavigator(
  {
    Home: { screen: TabStack },
    User: { screen: UserProfile },
    Comments: {screen: Comments }
  },
  {
    initialRouteName: 'Home',
    mode: 'modal',
    headerMode: 'none'
  }
)


export default class App extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <MainStack />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center', 
  },
});
