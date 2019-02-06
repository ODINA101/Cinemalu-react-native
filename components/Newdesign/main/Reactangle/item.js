/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native';
import verified from "../../../assets/verified.png"
import grayheart from "../../../assets/grayheart.png"
import Comments from "../../../assets/Comments.png"
export default class Item extends Component {
  render() {
    return (
      <View style={styles.container}>
       <View style={{flex:1,justifyContent: 'center'}}>
       <Image source={verified} style={{resizeMode:"contain",width:30}}/>
       </View>

       <View style={{flex:5,justifyContent: 'center'}}>
       <Text style={{color:"#FFF",fontSize:14}}>K.G.F</Text>
       </View>

       <View style={{felx:1,justifyContent: 'center',alignItems: 'center',flexDirection: 'row'}}>
       <Image source={grayheart} style={{resizeMode:"contain",width:15}}/>
       <Text style={{color:"#FFF",fontSize:14,paddingLeft:3}}>66</Text>
       </View>

       <View style={{flex:1,justifyContent: 'center',alignItems: 'center',flexDirection: 'row'}}>
       <Image source={grayheart} style={{resizeMode:"contain",width:15}}/>
       <Text style={{color:"#FFF",fontSize:14,paddingLeft:3}}>25</Text>
       </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height:50,
    flexDirection: 'row',
    padding:10
  },
});
