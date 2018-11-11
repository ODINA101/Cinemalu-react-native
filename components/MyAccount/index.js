/* @flow */

import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
  AsyncStorage,
  TextInput
} from 'react-native';
import axios from 'axios';
import Toolbar from '../_GLOBAL/toolbar';
import Post from '../_GLOBAL/Post';
import Touchable from 'react-native-platform-touchable';
import SingleMovie from '../singleMovie';
import GridView from 'react-native-super-grid';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from "../Actions"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Ionicons from "react-native-vector-icons/Ionicons"
import AccountInfo from "./AccountInfo"
import PersonalInfo from "./PersonalInfo"
import InfoTabs from "./InfoTabs"
import ImagePicker from 'react-native-image-picker';
import EvilIcons from "react-native-vector-icons/EvilIcons"
import Loader from "react-native-modal-loader"


 class UploadPhoto extends Component {
   constructor(props) {
     super(props)
   }

   render() {

     return(
       <Touchable onPress={() => {
         ImagePicker.showImagePicker(response => {
           console.log('Response = ', response);

           if (response.didCancel) {
             console.log('User cancelled image picker');
           } else if (response.error) {
             console.log('ImagePicker Error: ', response.error);
           } else if (response.customButton) {
             console.log(
               'User tapped custom button: ',
               response.customButton,
             );
           } else {
             const source = {uri: response.uri};
             const file = {
               uri: response.uri, // e.g. 'file:///path/to/file/image123.jpg'
               name: response.fileName, // e.g. 'image123.jpg',
               path:response.path,
               type: response.type, // e.g. 'image/jpg'
             };

             // You can also display the image using data:
             // const source = { uri: 'data:image/jpeg;base64,' + response.data };
              let formData = new FormData()
              //formData.append('key', true)
              formData.append('file', file)
               this.props.onSelectPhoto(formData,('data:image/jpeg;base64,' + response.data))


           }
         });
       }}
        style={{justifyContent:'center',alignItems: 'center',flex:1,backgroundColor:"rgba(0,0,0,0.5)"}}>

         <View style={{alignItems: 'center'}}>

         <MaterialIcons size={25} color="#FFF" name="file-upload"/>
          <Text style={{color:"#FFF"}}>upload photo</Text>
         </View>



       </Touchable>
     )
   }
 }




 class MyAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sharesCount:0,
      posts: [],
      postCount: 1,
      cannotLoad: false,
      followedMovies: [],
      profilePic:"",
      firstName:"",
      lastName:"",
      thoughtsCount:"",
      followedCount:"",
      languages:[],
      selectedLangs:[],
      AccountInfo:{
      },
      AccountEditing:false,
      PersonalEditing:false,
      ProfileEditing:false,
      isLoading:true,
      profilePictureUrl:'',
      loading:false
    };

  let p = this;
  this.props.actions.getProfileData(this.props.redux.Auth.token,function(data,err){
    if(data) {
      p.setState({isLoading:false})
    }
     console.log(data)
     console.log(data.sharesCount)
     if(err) {
            p.props.actions.Logout(function() {
                    p.props.onLogout()
                    p.props.actions.GetAllMovies("")
            });

     }
     p.setState({
       followedCount:data.interestedMovies.length,
       thoughtsCount:data.thoughtsCount,
       sharesCount:data.sharesCount,
       firstName:data.firstName,
       lastName:data.lastName,
       loginID:data.loginID,
       languages:data.languages,
       AccountInfo:data,
       profilePictureUrl:data.profilePictureUrl,
       userId:data._id
       })
       p.accountInfo.setInfo(data,"general")
       p.personalInfo.setAccountInfo(data)


  })


this.props.actions.ProfileLookups(this.props.redux.Auth.token,function(data) {
  console.log(data)
  p.setState({selectedLangs:data.languages})
  p.accountInfo.setInfo(data,"spec")
  p.personalInfo.setInfo(data)

})

  }
 updateProfile() {

this.props.actions.UpdateProfile(this.state.firstName,this.state.lastName,this.props.redux.Auth.token)
  this.setState({ProfileEditing:false})
 }


  render() {
    if(this.state.isLoading) {
      return (
        <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#00ff00" />

        </View>
      )
    }else{
    return (
      <View style={styles.container}>

        <ScrollView style={{flex: 1}}>
        <View
          style={{
            height: 45,
            backgroundColor: '#4a4a4a',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <Text style={{color: '#FFF', fontSize: 15, padding: 20}}>
        Profile
          </Text>
          <Touchable onPress={()=> {this.setState({ProfileEditing:!this.state.ProfileEditing})}} style={{padding:20}}>
          <MaterialIcons size={30} color="#FFF" name="mode-edit" />
          </Touchable>
        </View>
          <View style={{height: 400, backgroundColor: '#f8f8f8'}}>
            <View
              style={{
                flex: 1.3,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {this.state.profilePictureUrl? <ImageBackground
                    source={{
                      uri: this.state.profilePictureUrl,
                    }}
                    style={{
                      width: 120,
                      height: 120,
                      backgroundColor: '#C6C6C6',
                    }}
                  >
                  <UploadPhoto onSelectPhoto={(file,image) =>{
                    let p = this;
                    this.setState({
                      loading:true
                    })
                    this.props.actions.UpdateProfilePhoto(this.state.userId,file,this.props.redux.Auth.token,function(){
                      console.log("uploaded")
                      p.props.actions.getProfileData(p.props.redux.Auth.token)

                      p.setState({
                       loading:false
                      })
                      p.setState({
                        profilePictureUrl:image
                      })
                    });


                  }}/>
                  </ImageBackground>
                : <ImageBackground
                    source={{
                      uri: 'https://cinemalu.com/assets/images/img-not-found.png',
                    }}
                    style={{
                      width: 120,
                      height: 120,
                      backgroundColor: '#C6C6C6',
                    }}
                  >
                  <UploadPhoto onSelectPhoto={(file,image) =>{
                    this.setState({
                      loading:true
                    })
                    let p = this;

                    this.props.actions.UpdateProfilePhoto(this.state.userId,file,this.props.redux.Auth.token,function(){
                      console.log("uploaded")
                      p.props.actions.getProfileData(p.props.redux.Auth.token)

                      p.setState({
                       loading:false
                      })
                      p.setState({
                        profilePictureUrl:image
                      })
                    });



                  }}/>

                  </ImageBackground>}

            </View>
            <View style={{flex: 1}}>
             {
               this.state.ProfileEditing?(
                 <View style={{flex:1,padding:20}}>
                 <View style={{flexDirection: 'row'}}>
                    <View style={{flex:1,justifyContent: 'center'}}>
                    <EvilIcons size={30} color="#000" name="user"/>
                    </View>
                    <View style={{flex:7}}>
                   <TextInput value={this.state.firstName} onChangeText={(t) => this.setState({firstName:t})} style={{alignSelf: 'stretch',height:40,borderBottomWidth:1,borderBottomColor:"#e1e3e6"}} placeholder="First Name"/>
                   </View>
                  </View>

                 <View style={{flexDirection: 'row',marginTop:10}}>
                    <View style={{flex:1,justifyContent: 'center'}}>
                    <EvilIcons size={30} color="#000" name="user"/>
                    </View>
                    <View style={{flex:7}}>
                   <TextInput value={this.state.lastName} onChangeText={(t) => this.setState({lastName:t})} style={{alignSelf: 'stretch',height:40,borderBottomWidth:1,borderBottomColor:"#e1e3e6"}} placeholder="Last Name"/>
                   </View>
                  </View>
                  <Touchable  onPress={()=> this.updateProfile()} style={{height:40,backgroundColor: "#f1a61f",justifyContent: 'center',alignItems: 'center',marginTop:15,borderRadius:4,borderWidth:1,borderColor:"rgba(0,0,0,.1)"}}>
                  <Text style={{color:"inherit"}}>Save Changes</Text>
                  </Touchable>
                 </View>
               ):(
                 <View style={{flex:1}}>
                <Text style={{fontSize: 26, color: '#354052', paddingLeft: 35}}>
                 {this.state.firstName} {this.state.lastName}
              </Text>


              <Text
                style={{
                  fontSize: 18,
                  color: '#363636',
                  paddingLeft: 35,
                  fontWeight: '700',
                }}
              >
                @{this.state.loginID}
              </Text>
              </View>
               )
             }
           </View>
           {
             this.state.ProfileEditing?(<View />):(
               <InfoTabs sharesCount={this.state.sharesCount} thoughtsCount={this.state.thoughtsCount}    followedCount={this.state.followedCount}/>

             )
           }
          </View>

          <View
            style={{
              height: 45,
              backgroundColor: '#4a4a4a',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <Text style={{color: '#FFF', fontSize: 15, padding: 20}}>
              PERSONAL INFORMATION
            </Text>
            <Touchable onPress={()=> {this.setState({PersonalEditing:!this.state.PersonalEditing})}} style={{padding:20}}>
            <MaterialIcons size={30} color="#FFF" name="mode-edit" />
            </Touchable>
          </View>
         <PersonalInfo closeEdit={(passwordChanged)=> {
           this.setState({PersonalEditing:false})
            if(passwordChanged) {
              let p = this;
              this.props.actions.Logout(function() {
                      p.props.onLogout()
                      p.props.actions.GetAllMovies("")
              });
            }
         }} onRef={ref => (this.personalInfo = ref)}
          editing={this.state.PersonalEditing}/>
          <View
                    style={{
                      height: 45,
                      backgroundColor: '#4a4a4a',
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Text style={{color: '#FFF', fontSize: 15, padding: 20}}>
                    ACCOUNT INFORMATION
                    </Text>
                    <Touchable onPress={()=>this.setState({AccountEditing:!this.state.AccountEditing})} style={{padding:20}}>
                    <MaterialIcons size={30} color="#FFF" name="mode-edit" />
                    </Touchable>
                  </View>


     <AccountInfo closeEdit={() => this.setState({AccountEditing:false})} onRef={ref => (this.accountInfo = ref)}
     AccountEditing={this.state.AccountEditing}
     lan={this.state.selectedLangs}
    info={this.state.AccountInfo} />
     <View style={{height:50,alignItems: 'center'}}>
     {
       this.state.AccountEditing?(

         <Touchable
        onPress={() => {
          this.accountInfo.UpdateInfo()
          } }

                      style={{
                        height: 35,
                        width:170,
                        backgroundColor: '#f1a61f',
                        justifyContent: 'center',
                        alignItems:'center'
                      }}
                    >
                      <Text style={{color: '#FFF', fontSize: 15, padding: 20}}>
                      Save Changes
                      </Text>
                    </Touchable>

       ):(<View />)
     }

</View>



                  <Touchable
                    onPress={() => {
                        let p = this;
                        this.props.actions.Logout(function() {
                          			p.props.onLogout()
                                p.props.actions.GetAllMovies("")
                        });
                      } }

                                  style={{
                                    height: 45,
                                    backgroundColor: '#4a4a4a',
                                    justifyContent: 'center',
                                    alignItems:'center'
                                  }}
                                >
                                  <Text style={{color: '#FFF', fontSize: 15, padding: 20}}>
                                  LOGOUT
                                  </Text>
                                </Touchable>






        </ScrollView>
        {
    this.state.loading?(
      <Loader loading={true} color="#ff66be" />
    ):(<View />)
  }

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

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);
