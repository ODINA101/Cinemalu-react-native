/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native';
import CastItem from "./CastItem"
import ViewOverflow from 'react-native-view-overflow';
import Slider from "./Slider"
export default class Cast extends Component {
  render() {
    return (
      <ViewOverflow style={styles.container}>
        <ViewOverflow style={{height:300,overflow: 'visible',backgroundColor:"#4a4a4a"}}>
         <View style={{height:140}} />

       <Slider />
        </ViewOverflow>
      </ViewOverflow>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"transparent"
  },
});
