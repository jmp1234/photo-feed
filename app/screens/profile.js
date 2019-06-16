import React from 'react';
import { FlatList, StyleSheet, Text, View, Image } from 'react-native';
import { f, auth, database, storage } from '../../config/config';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedin: false,
    }
  }

  componentDidMount() {
    var that = this;
    f.auth().onAuthStateChanged(user => {
      if(user) {
        //Logged In
        that.setState({
          loggedin: true,
        })
      } else {
        //Not Logged In
        that.setState({
          loggedin: false,
        })
      }
    })
  }

  render () {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {this.state.loggedin ? (
          //are logged in
          <Text>Profile!!!</Text>
        ) : (
          //not logged in
          <View>
            <Text style={{textAlign: 'center'}}>You are not logged in</Text>
            <Text>Please login to view your profile</Text>
          </View>
        )}
      </View>
    )
  }


}

export default Profile;
