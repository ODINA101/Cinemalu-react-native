/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native';
import Vector from "../assets/Vector.png"
export default class Title extends Component {
  render() {
    return (
      <View style={styles.container}>
         <View style={{flexDirection:"row",justifyContent: 'space-between',alignItems: 'center'}}>
        <Text style={{color:"#FFF",fontSize:24}}>Latest Opinions</Text>
        <Image source={Vector} style={{marginTop:5,width:20,resizeMode:"contain"}} />
        </View>
        <View style={{height:1,marginTop:15,backgroundColor:"#696969"}}/>

      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
