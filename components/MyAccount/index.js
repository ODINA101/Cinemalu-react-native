/* @flow */

import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
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


 class UploadPhoto extends Component {
   render() {
     return(
       <View style={{justifyContent:'center',alignItems: 'center',flex:1,backgroundColor:"rgba(0,0,0,0.5)"}}>

         <View style={{alignItems: 'center'}}>

         <MaterialIcons size={25} color="#FFF" name="file-upload"/>
          <Text style={{color:"#FFF"}}>upload photo</Text>
         </View>


       </View>
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
      followedCount:""
    };

  let p = this;
  this.props.actions.getProfileData(this.props.redux.Auth.token,function(data){
     console.log(data)
     console.log(data.sharesCount)
     p.setState({followedCount:data.interestedMovies.length,
       thoughtsCount:data.thoughtsCount,
       sharesCount:data.sharesCount,
       firstName:data.firstName,
       lastName:data.lastName,
      loginID:data.loginID})
  })




  }



  render() {
    return (
      <View style={styles.container}>
        <Toolbar nav={this.props.navigation} />
        <ScrollView style={{flex: 1}}>
          <View style={{height: 400, backgroundColor: '#f8f8f8'}}>
            <View
              style={{
                flex: 1.3,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {this.state.profilePicture? <ImageBackground
                    source={{
                      uri: this.state.profilePicture.url,
                    }}
                    style={{
                      width: 120,
                      height: 120,
                      backgroundColor: '#C6C6C6',
                    }}
                  >
                  <UploadPhoto />
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
                  <UploadPhoto />

                  </ImageBackground>}

            </View>
            <View style={{flex: 1}}>
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

            <View style={{flex: 1, flexDirection: 'row'}}>

              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >

                <View style={{alignItems: 'center'}}>
                  <Text
                    style={{color: '#f1a61f', fontSize: 30, fontWeight: '500'}}
                  >
                    {this.state.sharesCount}
                  </Text>
                  <Text style={{color: '#bababa', fontSize: 14}}>Shares</Text>
                </View>

              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >

                <View style={{alignItems: 'center'}}>
                  <Text
                    style={{color: '#f1a61f', fontSize: 30, fontWeight: '500'}}
                  >
                    {this.state.thoughtsCount}
                  </Text>
                  <Text style={{color: '#bababa', fontSize: 14}}>Thoughts</Text>
                </View>

              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >

                <View style={{alignItems: 'center'}}>
                  <Text
                    style={{color: '#f1a61f', fontSize: 30, fontWeight: '500'}}
                  >
                    {this.state.followedCount}
                  </Text>
                  <Text style={{color: '#bababa', fontSize: 14}}>
                    Following
                  </Text>
                </View>

              </View>

            </View>

          </View>

          <View
            style={{
              height: 45,
              backgroundColor: '#4a4a4a',
              justifyContent: 'center',
            }}
          >
            <Text style={{color: '#FFF', fontSize: 15, padding: 20}}>
              PERSONAL INFORMATION
            </Text>
          </View>
          <View style={{padding:15}}>

             <View style={{alignItems: 'flex-start',flexDirection: 'row'}}>
             <Text style={{color:"#000",fontWeight: '700',fontSize:17}}>Email & Password</Text>
             </View>


            <View style={{flexDirection: 'row',marginTop:30}}>
             <View style={{flex:1}}>
             <Text style={{fontSize:16,color:'#6f6f70',fontWeight: '700'}}>Email</Text>
             </View>
             <View style={{flex:1.3,alignItems: 'flex-end'}}>
             <Text style={{color:"#6f6f70",fontSize:16,fontWeight: '400'}}>Iraklisamsdasd...</Text>
             </View>
            </View>

             <View style={{flexDirection: 'row',marginTop:10}}>
                    <Text style={{fontSize:16,color:'#6f6f70',fontWeight: '700'}}>Password</Text>
           <View style={{flex:1.3,alignItems: 'flex-end'}}>
           <Text style={{color:"#6f6f70",fontSize:17,fontWeight: '400'}}>********</Text>
          </View>
          </View>

          <View style={{alignItems: 'flex-start',flexDirection: 'row',marginTop:30}}>
          <Text style={{color:"#000",fontWeight: '700',fontSize:17}}>Contact details</Text>
          </View>

          <View style={{flexDirection: 'row',marginTop:30}}>
           <View style={{flex:1}}>
           <Text style={{fontSize:16,color:'#6f6f70',fontWeight: '700'}}>Phone</Text>
           </View>
           <View style={{flex:1.3,alignItems: 'flex-end'}}>
           <Text style={{color:"#6f6f70",fontSize:16,fontWeight: '400'}}></Text>
           </View>
          </View>
          <View style={{flexDirection: 'row',marginTop:10}}>
           <View style={{flex:1}}>
           <Text style={{fontSize:16,color:'#6f6f70',fontWeight: '700'}}>Cointry</Text>
           </View>
           <View style={{flex:1.3,alignItems: 'flex-end'}}>
           <Text style={{color:"#6f6f70",fontSize:16,fontWeight: '400'}}></Text>
           </View>
          </View>
          <View style={{flexDirection: 'row',marginTop:10}}>
           <View style={{flex:1}}>
           <Text style={{fontSize:16,color:'#6f6f70',fontWeight: '700'}}>State</Text>
           </View>
           <View style={{flex:1.3,alignItems: 'flex-end'}}>
           <Text style={{color:"#6f6f70",fontSize:16,fontWeight: '400'}}></Text>
           </View>
          </View>




          </View>
          <View
                    style={{
                      height: 45,
                      backgroundColor: '#4a4a4a',
                      justifyContent: 'center',
                    }}
                  >
                    <Text style={{color: '#FFF', fontSize: 15, padding: 20}}>
                    ACCOUNT INFORMATION
                    </Text>
                  </View>











        </ScrollView>
      </View>
    );
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
