/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native';
import InputText from "./InputText"
import Touchable from "react-native-platform-touchable"
export default class Reg extends Component {
  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={{flex:1}}>
      <View style={{padding:20}}>
      <Text style={{paddingLeft:8,color:"#6A6A6A",fontSize:20}}>Register now</Text>
      </View>
      <View style={{flex:1,height:370,paddingLeft:20,paddingRight:20}}>
      <InputText placeholder="First name" />
      <View style={{height:20}}/>
      <InputText placeholder="Last name" />
      <View style={{height:20}}/>

      <InputText placeholder="Username" />
      <View style={{height:20}}/>

      <InputText placeholder="Email" />
      <View style={{height:20}}/>

      <View style={{height:50,flexDirection: 'row'}}>
      <InputText placeholder="Password" style={{flex:1,marginRight:5}} secureTextEntry={true}/>
      <InputText placeholder="Confirm Password" style={{flex:1,marginLeft:5}}  secureTextEntry={true}/>
      </View>
      <View style={{height:20}}/>

    <Text style={{color:"#D09232",fontWeight: 'bold'}}> You may recevie Notifications from Cinemalu and can opt out at any time</Text>
    <Touchable style={{marginTop:20,height:50,backgroundColor: "#4B4B4B",justifyContent: 'center',alignItems: 'center'}}>
    <Text style={{color:"#FFF"}}>Create a free account</Text>
    </Touchable>
    <View style={{height:8}}/>
     <Text>By clicking 'Create a Free Account',you agree that you are older than 13 yrs and you agree to our Terms and Conditions.</Text>
    </View>



    </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:10
  },
});
