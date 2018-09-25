/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput
} from 'react-native';

export default class InputText extends Component {
  render() {
    const {placeholder,secureTextEntry} = this.props;

    return (
      <View style={[{borderBottomWidth:1,borderColor:"#B9B9B9"},this.props.style]}>
      <TextInput onChangeText={(e) => this.props.onTextChange(e)} placeholder={placeholder} style={{padding:8}} secureTextEntry={secureTextEntry}/>
     </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
