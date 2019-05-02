/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native';
import Vector from "../assets/VectorDown.png"

export default class DropMe extends Component {
  render() {
    return (
      <View style={styles.container}>
      <View style={{flex:1,justifyContent: 'center',paddingLeft:20}}>
      <Text style={{fontSize:18,color:"#E7A842"}}>List of Blog Authors</Text>
      </View>
      <View style={{width:80,justifyContent: 'center',alignItems: 'center'}}>
      <Image source={Vector} style={{marginTop:5,width:20,resizeMode:"contain"}} />
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height:50,
    backgroundColor:"#2D2D2D",
    borderTopLeftRadius:4,
    borderTopRightRadius:4,
    flexDirection: 'row',
    justifyContent:'space-between',

  },
});
