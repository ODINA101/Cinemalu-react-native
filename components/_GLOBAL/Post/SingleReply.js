/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native';

import MaterialCommunityIcons
  from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {MenuProvider,Menu,MenuTrigger,MenuOption,MenuOptions} from 'react-native-popup-menu';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Touchable from 'react-native-platform-touchable';
import Ionicons from 'react-native-vector-icons/Ionicons';
import jwtDecode from "jwt-decode"
import ProfilePic from '../profilePic';
import {connect} from "react-redux"
import {bindActionCreators} from 'redux';
import * as Actions from "../../Actions"




class SingleReply extends Component {
  constructor(props) {
    super(props)

    this.state ={
      likedByMe:this.props.liked,
      likes:this.props.item.userLikes.length,
      reports:this.props.item.userAbuses.length,
      reported:this.props.reported

    }
  }

action(n) {
  let p = this;
  //1 == edit 2 == delete
  if(n == 1) {
    this.props.onAction(this.props.item.text,this.props.item._id)
  }else{
   this.props.actions.DeletePost(this.props.item._id,this.props.redux.Auth.token,function() {
     pnprops.refresh()
   })
  }
}


  render() {
    return (
      <MenuProvider>
      <View style={{
    flex: 1,
    borderLeftWidth:this.props.marked?(3):(1),
    borderColor:this.props.marked?("#f5a623"):("#B0AFB2")

}}>
       <View style={{flex:1,padding:10}}>
       <View style={{flexDirection: 'row'}}>
       <ProfilePic item={this.props.item}/>
       <Text style={{paddingLeft:8,flex:1}}>
             <Text
               onPress={() => {
                 if (!this.props.ProfilePage) {
                   this.openProfile();
                 }
               }}
               style={{fontWeight: 'bold', color: '#000', fontSize: 16}}
             >
               {this.props.item.createdBy.loginID}
             </Text>
             {' '}
             {this.props.item.text}
             {' '}
           </Text>
           <View style={{width:30}}>
           {
             !this.props.ProfilePage && this.props.item.createdBy._id==this.props.redux.Auth.loggedInUser._id?(
               <Menu
                    rendererProps={{placement: 'top'}}
                    skipInstanceCheck
                    style={{flexDirection: 'row'}}
                    onSelect={value => {
                      this.action(value);
                    }}
                  >
                    <MenuTrigger
                      children={
                        <View style={{paddingRight: 15}}>
                          <MaterialCommunityIcons
                            size={25}
                            color="#B2B2B2"
                            name="dots-vertical"
                          />
                        </View>
                      }
                    />
                    <MenuOptions style={{alignSelf: 'flex-start'}}>
                      <MenuOption value={1} text="Edit" />
                      <MenuOption value={2} text="Delete" />
                    </MenuOptions>
                  </Menu>


             ):(<View />)
           }

           </View>
        </View>


       </View>

                 <View style={{flex: 5, flexDirection: 'row', paddingTop: 10}}>
               <View style={{flex:0.5}}/>
                       <Touchable
                     style={{flex: 1}}
                     onPress={() => {
                       if (this.state.likedByMe) {
                         this.setState({likes: this.state.likes - 1});
                       } else {
                         this.setState({likes: this.state.likes + 1});
                       }
                       this.setState({likedByMe: !this.state.likedByMe});
                       this.props.like();
                     }}
                   >
                     <View style={{flex: 1, flexDirection: 'row'}}>
                       {this.state.likedByMe
                         ? <Ionicons size={20} color="#6F6E6F" name="ios-heart" />
                         : <Ionicons
                             size={20}
                             color="#B2B2B2"
                             name="ios-heart-empty"
                           />}
                       <Text style={{color: '#B2B2B2', paddingLeft: 5}}>
                         {this.state.likes}
                       </Text>
                     </View>
                   </Touchable>
                   <View style={{flex:1}} />

                   <Touchable
                     onPress={() => {
                       if (this.state.reported) {
                         this.setState({reports: this.state.reports - 1});
                       } else {
                         this.setState({reports: this.state.reports + 1});
                       }
                       this.setState({reported: !this.state.reported});
                       this.props.report();
                     }}
                     style={{flex: 1}}
                   >
                     <View style={{flex: 1, flexDirection: 'row'}}>
                       {this.state.reported
                         ? <MaterialCommunityIcons
                             size={20}
                             color="#6F6E6F"
                             name="flag"
                           />
                         : <MaterialCommunityIcons
                             size={20}
                             color="#B2B2B2"
                             name="flag"
                           />}
                       <Text style={{color: '#B2B2B2', paddingLeft: 5}}>
                         {this.state.reports}
                       </Text>
                     </View>
                   </Touchable>
                 </View>


      </View>
      </MenuProvider>
    );
  }
}



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


export default connect(mapStateToProps, mapDispatchToProps)(SingleReply);
