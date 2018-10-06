/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import MaterialCommunityIcons
  from 'react-native-vector-icons/MaterialCommunityIcons';
export default class Tabs extends Component {
  render() {
    return (
      <View style={{flexDirection: 'row',height:42,backgroundColor:"#EBEBEC"}}>
      <View style={{alignItems: 'center',width:70}}>
      <Text style={{fontWeight: 'bold',color:"#4C4C4C"}}>185</Text>
      <Text>Days left</Text>

      </View>
      <View style={{width:1,backgroundColor:"#B0AFB2"}}/>
      <View style={{alignItems: 'center',width:70}}>
      <Text style={{fontWeight: 'bold',color:"#4C4C4C"}}>300</Text>
      <Text>Followers</Text>

      </View>
      <View style={{width:1,backgroundColor:"#B0AFB2"}}/>

      <View style={{alignItems: 'center',width:70}}>
      <Text style={{fontWeight: 'bold',color:"#4C4C4C"}}>1.3K</Text>
     <Text>Thoughts</Text>

      </View>
      <View style={{width:1,backgroundColor:"#B0AFB2"}}/>
       <View style={{flex:1,backgroundColor:"#E8A73D",flexDirection: 'row',justifyContent: 'center',alignItems: 'center'}}>
       <View style={{paddingRight:5}}>
        <MaterialCommunityIcons size={20} color="#FFF" name="check" />
        </View>
        <Text style={{color:"#fff",fontSize:17}}>Following</Text>
       </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
