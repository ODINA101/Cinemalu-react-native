/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Touchable from 'react-native-platform-touchable';
import axios from "axios"
export default class EmailConfirm extends Component {
constructor(props) {
super(props);

axios.post("http://cinemaluapi-test.us-east-1.elasticbeanstalk.com/api/account/login",
	{
		username:this.props.email,
		password:this.props.password
  }).then(res => {
  }).catch(error => {
    console.log(error.response)
    axios.put("http://cinemaluapi-test.us-east-1.elasticbeanstalk.com/api/account/confirmation/resend/" + error.response.data.userID)
    .then(res => {
    }).catch(error => {
    console.log(error.response)

})

  })


}



  render() {
    return (
      <View style={styles.container}>
      <View style={{height:50}}>
        <Touchable onPress={() => this.props.back()}>
      <MaterialIcons size={30} color="#000" name="arrow-back"/>
      </Touchable>
      </View>

        <Text style={{color:"#CC8624",fontWeight: 'bold',fontSize: 20,paddingTop:50}}> Email with confirmation link has sent, please confirm your account </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
});
