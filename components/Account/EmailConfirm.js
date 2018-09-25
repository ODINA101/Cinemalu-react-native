/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default class EmailConfirm extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{color:"#CC8624",fontWeight: 'bold',fontSize: 20,paddingTop:50}}> Email with confirmation link has sent, please confirm your account </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
});
