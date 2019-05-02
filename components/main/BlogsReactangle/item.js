/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground
} from 'react-native';
import verified from "../assets/verified.png"
import grayheart from "../assets/grayheart.png"
import plus from "../assets/plus.png"
import Comments from "../assets/Comments.png"
import testCover from "../assets/testCover.png"
import Touchable from 'react-native-platform-touchable';

export default class Item extends Component {
  constructor(props) {
    super(props)
 this.state = {
   date:""
 }
    date = new Date(this.props.info.created);
year = date.getFullYear();
month = date.getMonth()+1;
dt = date.getDate();

if (dt < 10) {
  dt = '0' + dt;
}
if (month < 10) {
  month = '0' + month;
}


this.state.date = year+'.' + month + '.'+dt;



  }
  render() {
    return (

      <View style={styles.container}>
      <View style={{backgroundColor:"#2D2D2D",height:329,borderRadius:4}}>
        <ImageBackground source={testCover}  imageStyle={{ borderTopRightRadius:4,borderTopLeftRadius:4}} style={{height:172}}/>
        <View style={{flex:1}}>
        <View style={{flex:1}}>
         <View style={{flexDirection: 'row',alignItems: 'center',paddingLeft:10}}>
         <Image source={Comments} style={{resizeMode:"contain",width:15}}/>
        <Text style={{paddingLeft:8,color:"#BABABA",fontSize:12,fontFamily:"Lato",fontWeight:"bold"}}>Opinions: 81</Text>
          </View>
          <View style={{paddingLeft:10}}>
               <Text style={{color:"#BABABA",fontSize:12,fontFamily:"Lato",fontWeight:"bold"}}>{this.props.info.title}</Text>
          </View>
          <View style={{padding:10}}>
          <View style={{color:"#BABABA",width:17,height:0,borderWidth:1,borderColor:"#D2D2D2"}}/>
          </View>
        </View>
         <View style={{flex:1,paddingLeft:10,paddingRight:10}}>
         <Text style={{color:"#AEABAB",fontSize:10,fontFamily:"Lato",fontWeight:"bold"}}>Posted by -  {this.state.date} by {this.props.info.author.displayName}</Text>

           <Touchable style={{marginTop:10, height:40,justifyContent: 'center',alignItems: 'center',borderWidth:1,borderColor:"#AEABAB",borderRadius:4}}>
                 <Text style={{color:"#AEABAB"}}>READ MORE</Text>
           </Touchable>

        </View>
        </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding:10,
    marginTop:30,
  },
});
