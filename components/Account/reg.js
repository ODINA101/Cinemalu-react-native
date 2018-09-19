/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput
} from 'react-native';

export default class Reg extends Component {
  render() {
    return (
      <View style={styles.container}>
      <View style={{padding:20}}>
      <Text style={{paddingLeft:8,color:"#6A6A6A",fontSize:20}}>Register now</Text>
      </View>
      <View style={{flex:1,height:350,paddingLeft:20,paddingRight:20}}>

      <View style={{borderBottomWidth:1,borderColor:"#B9B9B9"}}>
      <TextInput placeholder="Email" style={{padding:8}} />
      </View>
      <View style={{borderBottomWidth:1,borderColor:"#B9B9B9"}}>
     <TextInput placeholder="Password" style={{padding:8}} secureTextEntry/>
    </View>

    <View style={{marginTop:20,height:50,backgroundColor: "#4B4B4B",justifyContent: 'center',alignItems: 'center'}}>
    <Text style={{color:"#FFF"}}>Sign In</Text>
    </View>


    </View>



    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:10
  },
});
