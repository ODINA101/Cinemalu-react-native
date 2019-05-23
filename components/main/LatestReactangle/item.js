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
import testUser from "../assets/testUser.png"
import Comments from "../assets/Comments.png"
import ProfilePic from "../../_GLOBAL/profilePic"
export default class Item extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <View style={{
        paddingLeft:20,
        paddingRight:20,
        marginTop:10
      }}>
      <View style={styles.container}>

      <View style={{flexDirection: 'row'}}>

     <ProfilePic  item={this.props.item} style={{width:34,height:34}}/>

     <Text style={{color:"#787777",paddingLeft:10,fontSize:14,fontWeight:"bold",fontFamily:"Lato"}}>In</Text>
     <Text style={{color:"#B9B9B9",fontSize:14,paddingLeft:4,fontWeight:"bold",fontFamily:"Lato"}}>{this.props.item.movie.name}</Text>
     </View>
     <View style={{paddingLeft:44}}>
     <Text style={{color:"#B9B9B9",fontSize:14,fontWeight:"bold",fontFamily:"Lato"}}>{this.props.item.createdBy.firstName + " " + this.props.item.createdBy.lastName}</Text>
     <Text style={{color:"#B9B9B9",fontSize:14,fontFamily:"Lato"}}>
     {this.props.item.text}
     </Text>
     <View style={{flexDirection: 'row',alignItems: 'center'}}>
     <Image source={Comments} style={{resizeMode:"contain",width:15}}/>
    <Text style={{paddingLeft:8,color:"#BABABA",fontSize:12,fontFamily:"Lato",fontWeight:"bold"}}>Opinions: 35</Text>
      </View>
     </View>





      <View style={{height:0,borderWidth:1,borderColor:"#696969"}}/>

      </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
});
