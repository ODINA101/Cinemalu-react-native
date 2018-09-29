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
    const {placeholder,secureTextEntry,IconName} = this.props;
    const Icon = this.props.IconType;
    return (
      <View style={[{borderBottomWidth:1,borderColor:"#B9B9B9",fontFamily:"Lato-Medium",flexDirection: 'row',alignItems: 'center'},this.props.style]}>
      <View style={{width:30,justifyContent: 'center',alignItems: 'center'}}>
       <Icon size={this.props.size?this.props.size:20} color="#000" name={IconName} />
       </View>
      <TextInput onChangeText={(e) => this.props.onTextChange(e)} placeholder={placeholder} style={this.props.style?(this.props.style):({paddingLeft:5,paddingRight:8,paddingTop:8,paddingBottom:8})} secureTextEntry={secureTextEntry}/>
     </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
