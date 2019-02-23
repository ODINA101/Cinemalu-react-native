/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native';
import Vector from "../../../assets/Vector.png"
export default class Title extends Component {
  render() {
    return (
      <View style={styles.container}>
         <View style={{flexDirection:"row",justifyContent: 'space-between',alignItems: 'center'}}>
        <Text style={{color:"#FFF",fontSize:24}}>Blog Posts</Text>
        <Image source={Vector} style={{marginTop:5,width:20,resizeMode:"contain"}} />
        </View>
        <View style={{height:1,marginTop:15,backgroundColor:"#696969"}}/>
        <View style={{paddingTop:20,paddingBottom:20}}>
           <Text style={{fontSize:14,fontFamily:"Lato",fontWeight:'bold',color:"#BABABA"}}>Don’t miss out any of our blog posts, subscribe!</Text>
           </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
