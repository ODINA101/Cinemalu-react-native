/* @flow */

import React, {Component} from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';

export default class ProfilePic extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    if(this.props.item.createdBy) {
    if (this.props.item.createdBy.profilePictureUrl) {
      return (
        <ImageBackground
          source={{
            uri: this.props.item.createdBy.profilePictureUrl,
          }}
          style={{width: 35, height: 35}}
        />
      );
    } else {
      return (
        <View
          style={{
            width: 35,
            height: 35,
            backgroundColor: '#f1a61f',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >

          <Text style={{color: '#FFF', fontWeight: 'bold', fontSize: 18}}>
            {this.props.item.createdBy.firstName.charAt(0)}
            {this.props.item.createdBy.lastName.charAt(0)}
          </Text>

        </View>
      );
    }
  }else{
    if (this.props.item.profilePictureUrl !== "" || this.props.item.profilePictureUrl !== undefined || this.props.item.profilePictureUrl !== null) {
      return (
        <ImageBackground
          source={{
            uri: this.props.item.profilePictureUrl,
          }}
          style={{width: 35, height: 35}}
        />
      );
    } else {
      return (
        <View
          style={{
            width: 35,
            height: 35,
            backgroundColor: '#f1a61f',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >

          <Text style={{color: '#FFF', fontWeight: 'bold', fontSize: 18}}>
            {this.props.item.firstName.charAt(0)}
            {this.props.item.lastName.charAt(0)}
          </Text>

        </View>
      );
    }
  }
  }
}
