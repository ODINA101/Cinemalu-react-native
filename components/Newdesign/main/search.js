/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput
} from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome"

export default class Search extends Component {
  render() {
    return (
      <View style={styles.container}>
    <View style={{borderRadius:4,flexDirection:'row',paddingLeft :8,borderWidth:1,borderColor:"#858585",alignItems: 'center',height:50}}>
    <FontAwesome color={"#858585"} name="search" size={25}/>
     <TextInput placeholder="Search" style={{color:"#FFF"}} placeholderTextColor="#858585" />
    </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:10,
  },
});
