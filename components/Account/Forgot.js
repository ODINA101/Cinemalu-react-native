/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Reg from "./reg"
import Touchable from "react-native-platform-touchable"
import InputText from "./InputText"
import {connect} from "react-redux"
import {bindActionCreators} from 'redux';
import * as Actions from "../Actions";
import Loader from "react-native-modal-loader"
import EmailConfirm from "./EmailConfirm"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import EvilIcons from "react-native-vector-icons/EvilIcons"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Icon from "../CustomIcon"
import Ionicons from "react-native-vector-icons/Ionicons"
import axios from "axios"
import Snackbar from 'react-native-snackbar';
 

class Forgot extends Component {

  constructor() {
   super()
 this.state = {
   email:""
 }
  }


send() {
  console.log(this.state.email)
axios.put("http://cinemaluapi-test.us-east-1.elasticbeanstalk.com/api/account/forgot-password/" + this.state.email)
.then(res => {this.props.back()})
Snackbar.show({
  title: 'Please check your email',
  duration: Snackbar.LENGTH_SHORT,
});

}

  render() {

    return (
      <View style={styles.container}>

      <View style={{padding:20}}>
      <View style={{height:50}}>
  <Touchable onPress={() => this.props.back()}>
<Ionicons size={30} color="#000" name="ios-arrow-back"/>
</Touchable>
</View>

      <Text style={{paddingLeft:8,color:"#6A6A6A",fontSize:20,fontFamily:"Lato-Medium"}}>Forgot password</Text>
      </View>

      <View style={{flex:1,height:350,paddingLeft:20,paddingRight:20}}>
      <InputText IconCenter IconType={Icon} size={20} IconName="email" onTextChange={(e) => this.setState({email:e})} placeholder="Email"  />
    <Touchable onPress={() => {this.send()}} style={{marginTop:20,height:50,backgroundColor: "#4B4B4B",justifyContent: 'center',alignItems: 'center'}}>
    <Text style={{color:"#FFF",fontFamily:"Lato-Medium"}}>Send</Text>
    </Touchable>
      <SvgIcon svgs={TESTSVG} />
    </View>
    </View>
    );


}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:10
  },
});



function mapStateToProps(state) {
  return {
    redux:state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions:bindActionCreators(Actions,dispatch)
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Forgot)
