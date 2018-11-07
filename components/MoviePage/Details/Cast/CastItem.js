/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native';
import ViewOverflow from 'react-native-view-overflow';
import Triangle from 'react-native-triangle';
export default class CastItem extends Component {
  render() {
    return (
      <ViewOverflow
    style={{width:80,
    height:this.props.selected?(180):(160),
   zIndex:999,
}}>
      <ViewOverflow style={{flex:1,backgroundColor:this.props.selected?("#efa533"):("#686868"),alignItems: 'center',justifyContent: 'center'}}>
          <Image
          style={{width:65,height:65}}
          source={{uri:"https://s3.amazonaws.com/cinemalu-user-uploaded-contents/0694453b-9889-465a-8d98-f452315794b8.jpeg"}} />
          <Text style={{color:"#FFF",width:65}}>Nag Asgwin</Text>
          </ViewOverflow>
    {
      this.props.selected?(
        <Triangle
        width={80}
        height={20}
        color={'#efa533'}
        direction={'down'}
   />

      ):(<View/>)
    }
      </ViewOverflow>
    );
  }
}
