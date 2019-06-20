import React from 'react';
import { TouchableOpacity, TextInput, KeyboardAvoidingView, StyleSheet, Text, View} from 'react-native';
import { f, auth, database, storage } from '../../config/config';

class UserAuth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authStep: 0,
      email: '',
      pass: '',
      moveScreen: false
    }
  }

  componentDidMount() {

  }

  login = async () => {
    //force user to loggedin
    try {
      let user = await auth.signInWithEmailAndPassword('test@user.com', 'password');
    } catch(error) {
      console.log(error)
    }
  }

  render () {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>You are not logged in</Text>
        <Text>{this.props.message}</Text>
        {this.state.authStep == 0 ? (
          <View style={{marginVertical: 20, flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => this.setState({authStep: 1})}>
              <Text style={{fontWeight: 'bold', color: 'green'}}>Login</Text>
            </TouchableOpacity>
            <Text style={{marginHorizontal: 10}}>or</Text>
            <TouchableOpacity onPress={() => this.setState({authStep: 2})}>
              <Text style={{fontWeight: 'bold', color: 'blue'}}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{marginVertical: 20}}>
            {this.state.authStep == 1 ? (
              //login
              <Text>Login</Text>
            ) : (
              //signup
              <Text>Sign up</Text>
            )}
          </View>
        )}
      </View>
    )
  }


}

export default UserAuth;
