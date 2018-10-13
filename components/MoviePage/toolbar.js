/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons"
import Touchable from 'react-native-platform-touchable';
export default class Toolbar extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <View style={styles.container}>
      <Touchable onPress={() => this.props.nav.pop()}>
      <Ionicons size={30} color="#FFF"  name="ios-arrow-back"/>
      </Touchable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height:60,
    backgroundColor:"#3E3E3E",
    elevation:5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft:10
  },
});
