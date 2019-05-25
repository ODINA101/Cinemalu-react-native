/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native';
import Vector from "../assets/Vector.png"
import PlatformTouchable from 'react-native-platform-touchable';
export default class Title extends Component {
  render() {
    return (
      <View style={styles.container}>
         <View style={{flexDirection:"row",justifyContent: 'space-between',alignItems: 'center'}}>
        <Text style={{color:"#FFF",fontSize:24}}>Latest Opinions</Text>
        <PlatformTouchable onPress={() => this.props.toggle()}>
        <Image source={Vector} style={{marginTop:5,width:20,resizeMode:"contain"}} />
        </PlatformTouchable>
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
