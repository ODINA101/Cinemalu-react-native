/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableHighlight
} from 'react-native';
import bookmark1 from "./assets/bookmark1.png"
import bookmark2 from "./assets/bookmark2.png"



import Touchable from "react-native-platform-touchable"
export default class SingleMovie extends Component {
  constructor(props) {
    super(props)
  this.state = {
    followed:props.item.followedByCurrentUser
  }

  }



  render() {
    return (
      <Touchable onPress={()=>{
         if(this.props.ProfilePage) {
           this.props.nav.push("MoviePage",{info:this.props.item,followed:this.props.item.followedByCurrentUser,gotoLoginPage:this.props.gotoLoginPage,gotoRegPage:this.props.gotoRegPage})

         }else{
           this.props.nav.navigate("MoviePage",{info:this.props.item,followed:this.props.item.followedByCurrentUser,gotoLoginPage:this.props.gotoLoginPage,gotoRegPage:this.props.gotoRegPage})

         }

      }}>
        <View  style={{width:120,height:250}}>
        <ImageBackground source={{uri:this.props.item.media.url}} style={{flex:1}}>
        <Touchable onPress={() => {
          this.props.onFollow(this.props.item.followedByCurrentUser)
          this.setState({followed:!this.state.followed})
        }}>
        {
          this.state.followed?(
            <Image source={bookmark2} style={{alignSelf: 'flex-end'}}/>
          ):(
            <Image source={bookmark1} style={{alignSelf: 'flex-end'}}/>
          )
        }

        </Touchable>
        </ImageBackground>
        <View style={{flex:0.3,alignItems: "center"}}>
        <Text  maxLineNumber={1}  style={{color:"#FFF",fontWeight:"bold"}}>{this.props.item.name}</Text>
        <Text maxLineNumber={1} style={{color:"#FFF"}}>{this.props.item.tagLine}</Text>
       </View>
       </View>
      </Touchable>
    );
  }
}
