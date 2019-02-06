/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Title from "./title"
import Item from "./item"
export default class Reactangle extends Component {
  render() {
    return (
      <View style={styles.container}>
      <View style={{
        flex:1,
        backgroundColor:"#4A4A4A",
        borderRadius:4,
        height:100
      }}>

      <Title />
      <View style={{justifyContent:'center',backgroundColor:"#E7A842",height:42}}>
      <Text style={{fontSize:18,fontWeight:'bold',paddingLeft:22,color:"#000"}}>Upcoming Releases</Text>
      </View>

      <Item/>

      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    minHeight:100,
    height:200,
    padding:10,
  },
});
