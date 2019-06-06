/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native';
import verified from "../assets/verified.png"
import grayheart from "../assets/grayheart.png"
import plus from "../assets/plus.png"
import Comments from "../assets/Comments.png"
import PlatformTouchable from 'react-native-platform-touchable';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from '../../Actions';



class Item extends Component {
  constructor(props) {
    super(props)
    console.log(props.info)

    this.state = {
       followed:props.info.followedByCurrentUser,
       loggedIn:props.redux.Auth.loggedInUser?(true):(false)
    }
    console.log(props.info)
    //alert(this.state.loggedIn)
  }
  render() {
    return (
      <View style={{
        height:45,
        paddingLeft:8,
        paddingRight:8
      }}>
      <View style={styles.container}>
       <View style={{flex:1,justifyContent: 'center'}}>
     {
         typeof(this.props.info.followedByCurrentUser)==undefined?(<View />):(
       <PlatformTouchable onPress={() => {
           if(this.state.loggedIn) {
             this.props.onFollow(false)
             this.setState({followed:!this.state.followed})
           }else{
               alert("your aren`t logged In!")
                   }
       }}>
       <Image source={this.state.followed?(verified):(plus)} style={{resizeMode:"contain",width:30}}/>
       </PlatformTouchable>
)

}




       </View>

       <PlatformTouchable onPress={() => {
           this.props.nav.push("MoviePage",{info:this.props.info,followed:false,gotoRegPage:this.props.gotoRegPage,gotoLoginPage:this.props.gotoLoginPage })
       }} style={{flex:5,justifyContent: 'center'}}>
       <Text style={{color:"#FFF",fontSize:14}}>{this.props.info.name}</Text>
       </PlatformTouchable>

       <View style={{felx:1,justifyContent: 'center',alignItems: 'center',flexDirection: 'row'}}>
       <Image source={grayheart} style={{resizeMode:"contain",width:15}}/>
       <Text style={{color:"#FFF",fontSize:14,paddingLeft:3}}>{this.props.info.interestCount}</Text>
       </View>

       <View style={{flex:1,justifyContent: 'center',alignItems: 'center',flexDirection: 'row',paddingLeft:8}}>
       <Image source={Comments} style={{resizeMode:"contain",width:15}}/>
       <Text style={{color:"#FFF",fontSize:14,paddingLeft:3}}>{this.props.info.thoughtCount}</Text>
       </View>

      </View>
      <View style={{height:0,borderWidth:1,borderColor:"#696969"}}/>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'row',
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

export default connect(mapStateToProps, mapDispatchToProps)(Item);
