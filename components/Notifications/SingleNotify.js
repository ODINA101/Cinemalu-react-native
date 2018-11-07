/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native';

export default class SingleNotify extends Component {
  constructor(props) {
    super(props)
  }

  timeago(date) {
    var seconds = Math.floor((new Date() - date) / 1000);
    if(Math.round(seconds/(60*60*24*365.25)) >= 2) return Math.round(seconds/(60*60*24*365.25)) + " years ago";
    else if(Math.round(seconds/(60*60*24*365.25)) >= 1) return "1 year ago";
    else if(Math.round(seconds/(60*60*24*30.4)) >= 2) return Math.round(seconds/(60*60*24*30.4)) + " months ago";
    else if(Math.round(seconds/(60*60*24*30.4)) >= 1) return "1 month ago";
    else if(Math.round(seconds/(60*60*24*7)) >= 2) return Math.round(seconds/(60*60*24*7)) + " weeks ago";
    else if(Math.round(seconds/(60*60*24*7)) >= 1) return "1 week ago";
    else if(Math.round(seconds/(60*60*24)) >= 2) return Math.round(seconds/(60*60*24)) + " days ago";
    else if(Math.round(seconds/(60*60*24)) >= 1) return "1 day ago";
    else if(Math.round(seconds/(60*60)) >= 2) return Math.round(seconds/(60*60)) + " hours ago";
    else if(Math.round(seconds/(60*60)) >= 1) return "1 hour ago";
    else if(Math.round(seconds/60) >= 2) return Math.round(seconds/60) + " minutes ago";
    else if(Math.round(seconds/60) >= 1) return "1 minute ago";
    else if(seconds >= 2)return seconds + " seconds ago";
    else return seconds + "1 second ago";
}


getPastSimple(word) {
  if(word == "reply") {
    return "replied"
  }else{
    if(word[word.length-1] == "y" || word[word.length-1] == "e") {
    return word.slice(0,word.length-1) + "ed"
  }else{
    return word+"ed"
  }

  }
}


  render() {
    return (
      <View style={styles.container}>
      <View style={{flex:1,justifyContent: 'center'}}>
      {
  this.props.item.fromUser.profilePictureUrl?(
    <Image source={{uri:this.props.item.fromUser.profilePictureUrl}} style={{width:40,height:40,borderRadius:17}}/>

  ):(
      <Image source={{uri:"https://cinemalu.com/assets/images/img-not-found.png"}} style={{width:40,height:40,borderRadius:17}}/>
  )
}

       </View>
       <View style={{flex:4,justifyContent: 'center'}}>
        <Text><Text style={{color:"#000"}}>{this.props.item.fromUser.firstName}</Text> {this.getPastSimple(this.props.item.type)} on post on <Text  style={{color:"#000",fontWeight:'500'}}>{this.props.item.post.movie.name}</Text></Text>
        <Text>{this.timeago(new Date(this.props.item.created))}</Text>


       </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height:70,
    backgroundColor:"#E0E2E5",
    flexDirection: 'row',
    paddingLeft:10
  },
});
