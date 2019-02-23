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


export default class newHome  extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={{flex:1}}   >
        <View style={{height:80}}>
        <Search/>
        </View>
        <Reactangle />
        <View style={{height:50}}/>
        <BlogsReactangle />


      </ScrollView>

      </View>
    );
  }
}
