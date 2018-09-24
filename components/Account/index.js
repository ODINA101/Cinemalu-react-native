/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Reg from "./reg"
import Touchable from "react-native-platform-touchable"
import InputText from "./InputText"
export default class Account extends Component {

  constructor() {
   super()

   this.state = {
     loginPage:false
   }

  }


  render() {
    if(this.state.loginPage) {
    return (
      <View style={styles.container}>
      <View style={{padding:20}}>
      <Text style={{paddingLeft:8,color:"#6A6A6A",fontSize:20}}>Sign in</Text>
      </View>
      <View style={{flex:1,height:350,paddingLeft:20,paddingRight:20}}>
      <InputText placeholder="Email"  />
      <InputText placeholder="Password"  secureTextEntry={true}/>

    <Touchable style={{marginTop:20,height:50,backgroundColor: "#4B4B4B",justifyContent: 'center',alignItems: 'center'}}>
    <Text style={{color:"#FFF"}}>Sign In</Text>
    </Touchable>

  <View style={{height:70,flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center'}}>
  <Touchable onPress={() => {
    this.setState({loginPage:false})
  }}>
  <Text>Register now</Text>
  </Touchable>
  <View>
  <Text>|</Text>
  </View>
  <View>
  <Text>Forgot password?</Text>
  </View>
  </View>
    </View>
    </View>
    );
  }else{
   return <Reg />
  }

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:10
  },
});
