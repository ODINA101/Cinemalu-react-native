/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Linking
} from 'react-native';
import Touchable from 'react-native-platform-touchable';
export default class MusicItem extends Component {
  render() {
    return (
      <View style={{flexDirection: 'row',padding:5,borderBottomWidth:1,borderBottomColor:"#d3d4d5",height:70}}>
          <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
         <Text style={{fontSize:16,color:"#000"}}>{this.props.left}</Text>
         </View>
          <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
          {
            !this.props.youtube?(
              <Text style={{color:"gray",fontSize:16}}>{this.props.right}</Text>
            ):(
              <Touchable onPress={()=> {
                 Linking.openURL(this.props.right).catch(err => console.error('An error occurred', err));
              }}>
              <Text style={{color:"#007bff",fontSize:16}}>{this.props.right}</Text>
               </Touchable>
            )
          }
         </View>
      </View>
    );
  }
}


//
