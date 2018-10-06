/* @flow */

import React, {Component} from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import MaterialCommunityIcons
  from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Post extends Component {
  render() {
    return (
      <View style={{padding: 10, flexDirection: 'column', minHeight: 100}}>
        <View style={{flexDirection: 'row', flex: 1}}>

          <View style={{flex: 1}}>
            <ImageBackground
              source={{
                uri: 'https://s3.us-east-2.amazonaws.com/cinemalu-stage/45e394c5-bc0b-483b-9fa6-da23fbffaba4.jpeg',
              }}
              style={{width: 35, height: 35}}
            />
          </View>

          <View style={{flex: 5}}>

            <Text>
              <Text style={{fontWeight: 'bold', color: '#000', fontSize: 16}}>
                {this.props.item.createdBy.firstName}
              </Text>
              {' '}
              Kasuahl said barking like dogs, they all proved again that they are all really barking like dogs.
              {' '}
              {this.props.item.text}
            </Text>
          </View>
          <View style={{flex: 0.6, alignItems: 'flex-end'}}>
            <View style={{paddingRight: 15}}>
              <MaterialCommunityIcons
                size={25}
                color="#B2B2B2"
                name="dots-vertical"
              />
            </View>
          </View>

        </View>
        <View style={{flex: 0.3, flexDirection: 'row'}}>

          <View style={{flex: 1}} />
          <View style={{flex: 5, flexDirection: 'row', paddingTop: 10}}>

            <View style={{flex: 1, flexDirection: 'row'}}>
              <MaterialCommunityIcons
                size={20}
                color="#B2B2B2"
                name="message-reply-text"
              />
              <Text style={{color: '#B2B2B2', paddingLeft: 5}}>0</Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <MaterialCommunityIcons
                size={20}
                color="#B2B2B2"
                name="reply"
                style={{transform: [{scaleX: -1}]}}
                flip={'horizontal'}
              />
              <Text style={{color: '#B2B2B2', paddingLeft: 5}}>0</Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Ionicons size={20} color="#B2B2B2" name="ios-heart-empty" />
              <Text style={{color: '#B2B2B2', paddingLeft: 5}}>0</Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <MaterialCommunityIcons size={20} color="#B2B2B2" name="flag" />
              <Text style={{color: '#B2B2B2', paddingLeft: 5}}>0</Text>
            </View>

          </View>

        </View>
      </View>
    );
  }
}
