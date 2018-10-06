/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons"

export default class Toolbar extends Component {
  render() {
    return (
      <View style={styles.container}>
      <Ionicons size={40} color="#FFF"  name="ios-arrow-back"/>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height:70,
    backgroundColor:"#3E3E3E",
    elevation:5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft:10
  },
});
