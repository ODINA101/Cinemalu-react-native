/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableHighlight
} from 'react-native';
import bookmark1 from "./assets/bookmark1.png"
export default class SingleMovie extends Component {
  constructor(props) {
    super(props)


  }
  render() {
    return (
      <View style={{width:120,height:250}}>
        <ImageBackground source={{uri:this.props.item.media.url}} style={{flex:1}}>
        <TouchableHighlight onPress={() => alert("its woooorks :DDDDDD")}>

        <Image source={bookmark1} style={{alignSelf: 'flex-end'}}/>
        </TouchableHighlight>
        </ImageBackground>
        <View style={{flex:0.3,alignItems: "center"}}>
        <Text  maxLineNumber={1}  style={{color:"#FFF",fontWeight:"bold"}}>{this.props.item.name}</Text>

        <Text maxLineNumber={1} style={{color:"#FFF"}}>{this.props.item.tagLine}</Text>
       </View>
      </View>
    );
  }
}
