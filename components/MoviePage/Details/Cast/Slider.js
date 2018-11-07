/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import CastItem from "./CastItem"
import Ionicons from "react-native-vector-icons/Ionicons"
import { Timeline } from 'react-twitter-widgets'

export default class Slider extends Component {
  render() {
    return (

      <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
      <View style={{width:50,alignItems: 'center'}} >
       <Ionicons color="#FFF" size={40} name="ios-arrow-back"/>
      </View>

      <View style={{flex:1,alignItems: 'center'}}>
      <View style={{flex:1,flexDirection: 'row'}}>
      <CastItem selected/>
      <CastItem />
      <CastItem />
      </View>
      </View>
      <View style={{width:50,alignItems: 'center'}}>
      <Ionicons color="#FFF" size={40} name="ios-arrow-forward"/>

      </View>
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
