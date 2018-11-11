/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';


class SingleAward extends Component {
  render() {
    return(
    <View>
    <View style={{alignItems: 'center',padding:8}}>
     <Text style={{fontSize:16,fontWeight: '700',color:"#000"}}>Oscar</Text>
    </View>

    <View style={{flexDirection: 'row',borderBottomWidth:1,borderBottomColor:"#979797"}}>
    <View style={{flex:1,padding:8}}>
    <Text style={{fontSize:16,color:"#000"}}>Year</Text>
    </View>
    <View style={{flex:1,padding:8}}>
    <Text style={{fontSize:16}}>2018</Text>
   </View>
    </View>
    </View>
    )
  }
}

export default class Awards extends Component {
  render() {
    return (
      <View style={styles.container}>

<SingleAward />



      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:8
  },
});
