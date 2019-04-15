/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native';
import styles from "./index.style"
import Search from "./search"
import Reactangle from "./Reactangle"
import BlogsReactangle from "./BlogsReactangle"
import LatestReactangle from "./LatestReactangle"


export default class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={{flex:1}}>
        <View style={{height:80}}>
        <Search/>
        </View>
        <Reactangle />
        <View style={{height:50}}/>
        <BlogsReactangle />
        <View style={{height:50}}/>
        <LatestReactangle />


      </ScrollView>

      </View>
    );
  }
}
