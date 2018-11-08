/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Linking
} from 'react-native';
import Touchable from 'react-native-platform-touchable';
export default class Ad extends Component {
  render() {
    return (
      <View style={styles.container}>

      <ImageBackground style={{flex:1}}
       source={{uri:"https://s3.amazonaws.com/cinemalu-user-uploaded-contents/afd9c5fc-0686-411e-8e57-271b908ad8a4.jpeg"}}>

       <Touchable onPress={() => {

      Linking.openURL(this.props.item.targetUrl).catch(err => console.error('An error occurred', err));

       }} style={{flex:1,alignItems: 'center',justifyContent: 'flex-end',padding:8}}>


       <Text style={{color:"#FFF",fontSize:18,fontWeight:'700'}}>Press on Picture to contact us</Text>
       </Touchable>


       </ImageBackground>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height:200,
    paddingLeft:40,
    paddingRight:40
  },
});
