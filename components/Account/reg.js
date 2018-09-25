/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
KeyboardAvoidingView
} from 'react-native';
import InputText from "./InputText"
import Touchable from "react-native-platform-touchable"
import {connect} from "react-redux"
import {bindActionCreators} from 'redux';
import * as Actions from "../Actions";
import Loader from "react-native-modal-loader"
import {validate} from "email-validator"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import EmailConfirm from "./EmailConfirm"


class Reg extends Component {
constructor(props) {
  super(props);
   this.state = {
      email:"",
      firstName:"",
      lastName:"",
      loginID:"",
      password:"",
      passwordConfirm:"",
      passwordError:"",
      emailInvalid:false
   }

  console.log(props)
  this.register = this.register.bind(this)
}

register() {
  console.log(this.state)


 if(!validate(this.state.email)) {
  this.setState({emailInvalid:true})
}else{

  if(this.state.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/))
   {
    if(this.state.password == this.state.passwordConfirm) {
      this.setState({passwordError:""})
      console.log(this.props.actions)
      this.props.actions.Reg(this.state.email,this.state.firstName,this.state.lastName,this.state.loginID,this.state.password)

    }else{
      this.setState({passwordError:"Passwords don't match each other"})

    }

  }else{
    this.setState({passwordError:"Password must contains at least one number, at least one upper case character, min length 8 "})
  }
}

}


  render() {

    const {redux,actions} = this.props;
    if(redux.Auth.msg !== "success") {
       return (
         <EmailConfirm />
       )
    }else{
    return (
      <ScrollView style={styles.container} contentContainerStyle={{flex:1}}>
      {
        redux.Auth.loading?(
          <Loader loading={true} color="#ff66be" />
        ):(<View />)
      }
      <View style={{padding:20}}>
      <View style={{height:50}}>
        <Touchable onPress={() => this.props.back()}>
      <MaterialIcons size={30} color="#000" name="arrow-back"/>
      </Touchable>
      </View>
      <Text style={{paddingLeft:8,color:"#6A6A6A",fontSize:20}}>Register now</Text>
      </View>
      <View style={{flex:1,height:370,paddingLeft:20,paddingRight:20}}>
      <InputText placeholder="First name" onTextChange={(e) => this.setState({firstName:e})} />
      <View style={{height:20}}/>
      <InputText placeholder="Last name" onTextChange={(e) => this.setState({lastName:e})}/>
      <View style={{height:20}}/>

      <InputText onTextChange={(e) => this.setState({loginID:e})} placeholder="Username" />
      <View style={{height:20}}/>

      <InputText onTextChange={(e) => this.setState({email:e})} placeholder="Email" />
       {
         this.state.emailInvalid?(
           <View style={{paddingLeft:8}}>
<Text style={{color:"#F35682",fontWeight: 'bold'}}>Email is Invalid!</Text>
</View>

):(<View/>)
       }
      <View style={{height:20}}/>

      <View style={{height:50,flexDirection: 'row'}}>

      <InputText onTextChange={(e) => this.setState({password:e})} placeholder="Password" style={{flex:1,marginRight:5}} secureTextEntry={true}/>

      <InputText onTextChange={(e) => this.setState({passwordConfirm:e})} placeholder="Confirm Password" style={{flex:1,marginLeft:5}}  secureTextEntry={true}/>
      </View>
      <View style={{height:4}}/>
    {
      this.state.passwordError?(
        <View style={{paddingLeft:8}}>
<Text style={{color:"#F35682",fontWeight: 'bold'}}>{this.state.passwordError}</Text>
 </View>

):(
  <View/>
)
    }
      <View style={{height:20}}/>

     {
       redux.Auth.msg?(
         <Text style={{color:"#F35682",fontWeight: 'bold'}}>{redux.Auth.msg}</Text>

       ):(
         <Text style={{color:"#D09232",fontWeight: 'bold'}}> You may recevie Notifications from Cinemalu and can opt out at any time</Text>

       )
     }

     <Touchable onPress={() => this.register()} style={{marginTop:20,height:50,backgroundColor: "#4B4B4B",justifyContent: 'center',alignItems: 'center'}}>
     <Text style={{color:"#FFF"}} >Create a free account</Text>
     </Touchable>
     <View style={{height:8}}/>
     <Text>By clicking 'Create a Free Account',you agree that you are older than 13 yrs and you agree to our Terms and Conditions.</Text>
    </View>



    </ScrollView>
    );
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


export default connect(mapStateToProps,mapDispatchToProps)(Reg)
