import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import Feed from './app/screens/feed';
import Upload from './app/screens/upload';
import Profile from './app/screens/profile';
import { f, auth, database, storage } from './config/config';

const MainStack = createBottomTabNavigator(
  {
    Feed: { screen: Feed},
    Upload: { screen: Upload},
    Profile: { screen: Profile}
  }
)


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.login();
  }

  login = async () => {
    //force user to loggedin
    try {
      let user = await auth.signInWithEmailAndPassword('test@user.com', 'password');
    } catch(error) {
      console.log(error)
    }
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
