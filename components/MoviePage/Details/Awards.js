/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';


class SingleAwardLine extends Component {
  render() {
    const {left,right} = this.props;
    return(
    <View style={{paddingTop:10,paddingBottom:10,flexDirection: 'row',borderBottomWidth:1,borderBottomColor:"#979797"}}>
    <View style={{flex:1,padding:8}}>
    <Text style={{fontSize:16,color:"#000"}}>{left}</Text>
    </View>
    <View style={{flex:1,padding:8}}>
    <Text style={{fontSize:16}}>{right}</Text>
   </View>
    </View>
    )
  }
}



class SingleAward extends Component {
  render() {
    const {title} = this.props;

    return(
    <View>
    <View style={{alignItems: 'center'}}>
     <Text style={{fontSize:18,fontWeight: '700',padding:8,color:"#000"}}>{title}</Text>
    </View>
    <SingleAwardLine left={"Year"} right={"2018"}/>
    <SingleAwardLine left={"Country"} right={"USA"}/>
    <SingleAwardLine left={"Role"} right={"Director"}/>
    <SingleAwardLine left={"Recipient"} right={"tom hanks"}/>
     </View>
    )
  }
}

export default class Awards extends Component {
  render() {
    return (
      <View style={styles.container}>

        <SingleAward  title="Oscar"/>



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
