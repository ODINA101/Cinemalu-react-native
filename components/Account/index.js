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
import Forgot from "./Forgot"
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"



import Icon from "../CustomIcon"
class Account extends Component {

  constructor(props) {
   super(props)

   this.state = {
     loginPage:true,
     username:'',
     password:'',
     forgot:false
   }

 if(this.props.registering) {
   this.state.loginPage = false;
 }

  }

Login() {
  let p= this;
this.props.actions.Login(this.state.username,this.state.password,function(access) {
  if(access) {
    p.props.onLogSuccess();
    p.props.actions.GetAllMovies(access)
  }
})
}

EmailConfirm() {
console.log("confirm")
}


  render() {
    const {redux,actions} = this.props;
    if(this.state.loginPage) {
      if(this.state.forgot) {
        return <Forgot back={() => this.setState({forgot:false})}/>
      }else{
    return (
      <View style={styles.container}>
      <View style={{padding:20}}>
      <Text style={{paddingLeft:8,color:"#6A6A6A",fontSize:20,fontFamily:"Lato-Medium"}}>Sign in</Text>
      </View>
      {
      redux.Auth.loading?(
        <Loader loading={true} color="#ff66be" />
      ):(<View />)
    }

      <View style={{flex:1,height:350,paddingLeft:20,paddingRight:20}}>
      <InputText IconCenter IconType={Icon} size={20} IconName="email" onTextChange={(e) => this.setState({username:e})} placeholder="Email"  />
      <InputText IconType={SimpleLineIcons} size={20}  IconName="lock" onTextChange={(e) => this.setState({password:e})} placeholder="Password"  secureTextEntry={true}/>
      {
           redux.Auth.loginMsg?(
             <Text style={{color:"#F35682",fontWeight: 'bold'}}>{redux.Auth.loginMsg}</Text>

           ):(
            <View/>
           )
         }
       {

         redux.Auth.loginMsg == "Account is not verified"?(
           <View>
           <Text style={{color:"#F35682",fontWeight: 'bold',fontFamily:"Lato-Medium"}}>Account need verification, click </Text> <Touchable onPress={()=> this.EmailConfirm()}> <Text style={{color:"#3850C9"}}>here</Text></Touchable><Text> to resend email</Text>
           </View>
         ):(<View/>)

       }

    <Touchable onPress={() => this.Login()} style={{marginTop:20,height:50,backgroundColor: "#4B4B4B",justifyContent: 'center',alignItems: 'center'}}>
    <Text style={{color:"#FFF",fontFamily:"Lato-Medium"}}>Sign In</Text>
    </Touchable>

  <View style={{height:70,flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center'}}>
  <Touchable onPress={() => {
    this.setState({loginPage:false})
  }}>
  <Text style={{fontFamily:"Lato-Medium"}}>Register now</Text>
  </Touchable>
  <View>
  <Text>|</Text>
  </View>
  <Touchable onPress={()=>{this.setState({forgot:true})}}>
  <Text style={{fontFamily:"Lato-Medium"}}>Forgot password?</Text>
  </Touchable>
  </View>
  </View>
  </View>
    );
  }


  }else{
   return <Reg  back={() => {
     this.setState({loginPage:true})
     this.props.onLoginPage()

 }}/>
  }


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


export default connect(mapStateToProps,mapDispatchToProps)(Account)
