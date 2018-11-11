/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';



class SingleOfLine extends Component {
  render() {
    const {left,right} = this.props;

    return (
      <View style={{paddingTop:10,paddingBottom:10,flexDirection: 'row',borderBottomWidth:1,borderBottomColor:"#979797"}}>
      <View style={{flex:1,padding:8}}>
      <Text style={{fontSize:16,color:"#000"}}>{left}</Text>
      </View>
      <View style={{flex:1,padding:8}}>
      <Text style={{fontSize:16}}>{right}</Text>
     </View>
      </View>

    );
  }
}



class SingleOf extends Component {
  render() {
    const {title} = this.props;
    return (
      <View>
      <View style={{alignItems: 'center',}}>
       <Text style={{fontSize:18,fontWeight: '700',color:"#000",padding:8}}>{title}</Text>
      </View>
      <SingleOfLine left={"Distributor"} right={"Dist1"}/>
      <SingleOfLine left={"Rights price"} right={"4"}/>
      <SingleOfLine left={"Gross"} right={"231"}/>
      <SingleOfLine left={"Share"} right={"Share"}/>
       </View>

    );
  }
}












export default class BoxOffice extends Component {
  render() {
    return (
      <View style={styles.container}>
       <SingleOf title="USA" />
       <SingleOf title="USA 2" />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
