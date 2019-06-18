import React from 'react';
import { TouchableOpacity, TextInput, KeyboardAvoidingView, FlatList, StyleSheet, Text, View, Image } from 'react-native';
import { f, auth, database, storage } from '../../config/config';

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedin: false,
      comments_list: []
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

    this.checkParams();
  }

  checkParams = () => {
    var params = this.props.navigation.state.params;
    console.log(this.props.navigation)
    if(params) {
      if(params.photoId) {
        this.setState({
          photoId: params.photoId
        });
        this.fetchComments(params.photoId);
      }
    }
  }

  addCommentToList = (comments_list, data, comment) => {
    var that = this;
    var commentObj = data[comment];
    database.ref('users').child(commentObj.author).child('username').once('value').then(function(snapshot) {

      const exists = (snapshot.val() !== null);
      if(exists) data = snapshot.val();

        comments_list.push({
          id: comment,
          comment: commentObj.comment,
          posted: that.timeConverter(commentObj.posted),
          author: data,
          authorId: commentObj.author
        });

        console.log('comments list: ', comments_list)

        that.setState({
          refresh: false,
          loading: false
        });

    }).catch(error => console.log(error))
  }

  fetchComments = photoId => {
    //fetch comments here...
    var that = this;
    //fetch all the comments inside the photoid ordered by the time posted
    database.ref('comments').child(photoId).orderByChild('posted').once('value').then(function(snapshot) {
      const exists = (snapshot.val() !== null);
      if(exists) {
        //add comments to flatlist
        data = snapshot.val();
        var comments_list = that.state.comments_list;

        for(var comment in data) {
          that.addCommentToList(comments_list, data, comment)
        }

      } else {
        //are no comments_list
        that.setState({
          comments_list: []
        })
      }
    }).catch(error => console.log(error))
  }

  pluralCheck = s => {
    if(s == 1) {
      return ' ago';
    } else {
      return 's ago';
    }
  }

  timeConverter = timestamp => {
    var a = new Date(timestamp * 1000);
    var seconds = Math.floor((new Date() - a) / 1000);

    var interval = Math.floor(seconds / 31536000);
    if(interval > 1) {
      return interval + ' year' + this.pluralCheck(interval);
    }
    interval = Math.floor(seconds / 2592000);
    if(interval > 1) {
      return interval + ' month' + this.pluralCheck(interval);
    }
    interval = Math.floor(seconds / 86400);
    if(interval > 1) {
      return interval + ' day' + this.pluralCheck(interval);
    }
    interval = Math.floor(seconds / 3600);
    if(interval > 1) {
      return interval + ' hour' + this.pluralCheck(interval);
    }
    interval = Math.floor(seconds / 60);
    if(interval > 1) {
      return interval + ' minute' + this.pluralCheck(interval);
    }
    return Math.floor(seconds) + ' second' + this.pluralCheck(seconds);
  }

  s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
  }

  uniqueId = () => {
    return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
    this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4();
  }

  render () {
    return (
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row', height: 70, paddingTop: 30, backgroundColor: 'white', borderColor: 'lightgrey', borderBottomWidth: 0.5, justifyContent: 'center', alignItems: 'center', justifyContent: 'space-between'}}>
          <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}
          style={{width:100}}>
            <Text style={{fontSize:12, fontWeight: 'bold', paddingLeft: 10}}>Go Back</Text>
          </TouchableOpacity>
          <Text>Comments</Text>
          <Text style={{width:100}}></Text>
        </View>
        {this.state.comments_list.length == 0 ? (
          <Text>
            No Comments found...
          </Text>
          //no comments show empty state
        ) : (
          //are comments
          <FlatList
            refreshing={this.state.refresh}
            data={this.state.comments_list}
            keyExtractor={(item, index) => index.toString()}
            style={{flex: 1, backgroundColor: '#eee'}}
            renderItem={({item, index}) => (
              <View key={index} style={{width: '100%', overflow: 'hidden', marginBottom: 5, justifyContent: 'space-between', borderBottomWidth: 1, borderColor: 'grey'}}>
                <View>
                  <Text>{item.posted}</Text>
                  <TouchableOpacity>
                    <Text>{item.author}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        )}
        {this.state.loggedin ? (
          //are logged in
          <Text>Comments</Text>
        ) : (
          //not logged in
          <View>
            <Text style={{textAlign: 'center'}}>You are not logged in</Text>
            <Text>Please login to post a comment</Text>
          </View>
        )}
      </View>
    )
  }


}

export default Comments;
