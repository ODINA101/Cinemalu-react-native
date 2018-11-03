/* @flow */

import React, {Component} from 'react';
import {View, Text, StyleSheet,TextInput,Picker} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from "../Actions"
import Touchable from 'react-native-platform-touchable';






class PersonalInfo extends Component {
  constructor(props) {
    super(props)


   this.state = {
     options: this.options,
     value: null,
     info:{countries:[]},
     accInfo:{},
     selectedCountry:"",
     countryStates:[],
     selectedState:"",
     mobile:"",
     password:"",
     password1:"",
     dontMatch:false
   }
  }

  UpdateInfo() {
    this.props.actions.UpdatePersonalInfo({mobile:this.state.mobile,country:this.state.selectedCountry,state:this.state.selectedState,pinfo:this.state.accInfo},this.props.redux.Auth.token)
    this.props.closeEdit()
    console.log("works")
  }

  setInfo(data) {
    this.setState({info:data})
  }

  changePassword() {
    if(this.state.password1 == this.state.password) {
      if(this.state.password) {
        this.setState({dontMatch:false})
      this.props.actions.ChangePassword(this.state.password,this.props.redux.Auth.token)
      this.props.closeEdit()

       console.log(this.state.password)

     }else{
       alert("Please Enter Password")
     }

    }else{
      this.setState({dontMatch:true})
    }
  }

  setAccountInfo(data) {
    this.setState({accInfo:data})
    this.setState({selectedCountry:data.country,mobile:data.phone})
    this.setState({selectedState:data.state})

  }


  componentDidMount() {
    this.props.onRef(this)
  }


  render() {
    if(this.props.editing) {
      return (
        <View style={{padding:20}}>
         <View style={{alignItems: 'center'}}>
          <Text style={{fontSize:16,color:"#000"}}>PERSONAL INFORMAION</Text>
         </View>

         <View style={{flexDirection: 'column',marginTop:15,flex:1}}>
          <Text style={{color:"#000",fontSize:16,fontWeight: '700'}}>Change Password</Text>
         <View style={{flex:1,alignItems: 'flex-start',marginTop:10}}>
           <TextInput onChangeText={(t)=> this.setState({password:t})} placeholder={"New Password"} style={{alignSelf: "stretch",borderWidth: 1,height:40,padding:10,borderRadius:4,backgroundColor:'#FFF',borderColor:"#dfe3e9",color:"#000"}} secureTextEntry/>
         </View>

         <View style={{flex:1,alignItems: 'flex-start',marginTop:10}}>
           <TextInput onChangeText={(t)=> this.setState({password1:t})} placeholder={"Confirm Password"} style={{alignSelf: "stretch",borderWidth: 1,height:40,padding:10,borderRadius:4,backgroundColor:'#FFF',borderColor:"#dfe3e9",color:"#000"}} secureTextEntry/>
         </View>
         {
           this.state.dontMatch?(
             <Text style={{color:"#F35682",fontWeight: 'bold',fontFamily:"Lato-Medium"}}>Passwords aren't matching each other</Text>

           ):(
             <View />
           )
         }
         <Touchable onPress={() => {
           this.changePassword()
         }} style={{height:40,backgroundColor: "#f1a61f73",justifyContent: 'center',alignItems: 'center',marginTop:15,borderRadius:4,borderWidth:1,borderColor:"rgba(0,0,0,.1)"}}>
         <Text style={{color:"inherit"}}>Change</Text>
         </Touchable>


         </View>

          <View style={{marginTop:10}}>
          <Text style={{color:"#000",fontSize:16,fontWeight: '700'}}>Change Details</Text>
          </View>


          <View style={{flexDirection: 'column',marginTop:15,flex:1}}>
          <View style={{flex:1,alignItems: 'flex-start',marginTop:10}}>
            <TextInput onChangeText={(e) => this.setState({mobile:e})} value={this.state.mobile} placeholder={"Phone"} style={{alignSelf: "stretch",borderWidth: 1,height:40,padding:10,borderRadius:4,backgroundColor:'#FFF',borderColor:"#dfe3e9",color:"#000"}} />
          </View>

          <View style={{flex:1,alignItems: 'flex-start',marginTop:10}}>
            <Picker onValueChange={(itemValue, itemIndex) =>{
              console.log(itemValue.states)
                this.setState({selectedCountry:itemValue,countryStates:this.state.info.countries[itemIndex].states})



             }}
            selectedValue={this.state.selectedCountry}
            mode="dropdown" style={{alignSelf: "stretch",borderWidth: 1,height:40,padding:10,borderRadius:4,backgroundColor:'#FFF',borderColor:"#dfe3e9",color:"#000"}}>
            <Picker.Item label='Please select your country' value='0' />



              {

                this.state.info.countries.map(item => {
                  return(
                    <Picker.Item label={item.name} value={item.name} />
                  )
                })
              }
            </Picker>






          </View>

              <View style={{flex:1,alignItems: 'flex-start',marginTop:10}}>
<Picker onValueChange={(itemValue, itemIndex) => this.setState({selectedState: itemValue})}
selectedValue={this.state.selectedState} mode="dropdown" style={{alignSelf: "stretch",borderWidth: 1,height:40,padding:10,borderRadius:4,backgroundColor:'#FFF',borderColor:"#dfe3e9",color:"#000"}}>
{
  this.state.accInfo.country==this.state.selectedCountry && this.state.accInfo.state!=="0" && this.state.accInfo.state?(
    <Picker.Item label={this.state.accInfo.state} value='0' />

  ):(
    <Picker.Item label='Please select state' value='0' />

  )
}

{

                this.state.countryStates.map(item => {
                  return(
                    <Picker.Item label={item} value={item} />
                  )
                })

}
</Picker>

</View>




          <Touchable  onPress={()=>this.UpdateInfo()} style={{height:40,backgroundColor: "#f1a61f73",justifyContent: 'center',alignItems: 'center',marginTop:15,borderRadius:4,borderWidth:1,borderColor:"rgba(0,0,0,.1)"}}>
          <Text style={{color:"inherit"}}>Save Changes</Text>
          </Touchable>


          </View>







        </View>
      )
    }else{
    return (
      <View style={{padding: 15}}>

        <View style={{alignItems: 'flex-start', flexDirection: 'row'}}>
          <Text style={{color: '#000', fontWeight: '700', fontSize: 17}}>
            Email & Password
          </Text>
        </View>

        <View style={{flexDirection: 'row', marginTop: 30}}>
          <View style={{flex: 0.6}}>
            <Text style={{fontSize: 16, color: '#6f6f70', fontWeight: '700'}}>
              Email
            </Text>
          </View>
          <View style={{flex: 1.3, alignItems: 'flex-end'}}>
            <Text style={{color: '#6f6f70', fontSize: 16, fontWeight: '400'}}>
              {this.state.accInfo.email}
            </Text>
          </View>
        </View>

        <View style={{flexDirection: 'row', marginTop: 10}}>
          <Text style={{fontSize: 16, color: '#6f6f70', fontWeight: '700'}}>
            Password
          </Text>
          <View style={{flex: 1.3, alignItems: 'flex-end'}}>
            <Text style={{color: '#6f6f70', fontSize: 17, fontWeight: '400'}}>
              ********
            </Text>
          </View>
        </View>

        <View
          style={{
            alignItems: 'flex-start',
            flexDirection: 'row',
            marginTop: 30,
          }}
        >
          <Text style={{color: '#000', fontWeight: '700', fontSize: 17}}>
            Contact details
          </Text>
        </View>

        <View style={{flexDirection: 'row', marginTop: 30}}>
          <View style={{flex: 1}}>
            <Text style={{fontSize: 16, color: '#6f6f70', fontWeight: '700'}}>
              Phone
            </Text>
          </View>
          <View style={{flex: 1.3, alignItems: 'flex-end'}}>
            <Text style={{color: '#6f6f70', fontSize: 16, fontWeight: '400'}} >
            {this.state.accInfo.phone}

            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <View style={{flex: 1}}>
            <Text style={{fontSize: 16, color: '#6f6f70', fontWeight: '700'}}>
              Country
            </Text>
          </View>
          <View style={{flex: 1.3, alignItems: 'flex-end'}}>
            <Text style={{color: '#6f6f70', fontSize: 16, fontWeight: '400'}} >
            {this.state.accInfo.country}
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <View style={{flex: 1}}>
            <Text style={{fontSize: 16, color: '#6f6f70', fontWeight: '700'}}>
              State
            </Text>
          </View>
          <View style={{flex: 1.3, alignItems: 'flex-end'}}>
            <Text style={{color: '#6f6f70', fontSize: 16, fontWeight: '400'}} >
            {this.state.accInfo.state}
            </Text>
          </View>
        </View>

      </View>
    );
  }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});



function mapStateToProps(state) {
  return {
    redux: state,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfo);
