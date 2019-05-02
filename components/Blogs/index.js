/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView
} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import Comments from "../assets/CommentsWhite.png"
import DropMe from "./DropMe"

export default class Blogs extends Component {
  render() {
    return (
      <View style={styles.container}>
      <ScrollView style={{flex:1}}>
        <View style={{height:40}}/>
         <Text style={{fontSize:25,color:"#FFF"}}>Featured Blog Post</Text>
         <Image source={{uri:"https://s3.amazonaws.com/cinemalu-user-uploaded-contents/3515faef-f40f-4dc7-a435-fd60c06a466a.png"}} style={{marginTop:20,height:250,borderRadius:8}}/>


         <View style={{flexDirection: 'row',alignItems: 'center',paddingLeft:0}}>
            <Image source={Comments} style={{resizeMode:"contain",width:20}}/>
           <Text style={{paddingLeft:8,color:"#FFF",fontSize:12,fontFamily:"Lato",fontWeight:"bold"}}>Opinions: 61</Text>
             </View>
             <Text style={{fontSize:20,color:"#FFF",fontWeight: 'bold'}}>Thugs of Hindostan movie review..</Text>
              <View style={{height:1,width:30,backgroundColor:"#FFF",marginTop:10}}/>
              <Text style={{color:"#FFF",marginTop:10}}>"Postcards from London," directed by Steve McLean, has a lot of interesting ideas in it. It's a survey course in Art History...</Text>
              <View style={{flexDirection: 'row',marginTop:15}}>
              <Text style={{color:"#AEABAB"}}>Posted - 12.10.2018 by </Text><Text style={{color:"#E4B22A"}}>Andy Bernard</Text>
              </View>
              <Touchable style={{marginTop:10, height:40,justifyContent: 'center',alignItems: 'center',borderWidth:1,borderColor:"#FFF",borderRadius:4}}>
                    <Text style={{color:"#AEABAB"}}>READ MORE</Text>
              </Touchable>

              <View style={{height:100,marginTop:20,justifyContent: 'center',alignItems: 'center',backgroundColor:"#C4C4C4",borderRadius:4}}>
              <Text style={{fontSize:20,color:"#FFF",fontWeight: 'bold'}}>320x100</Text>
              </View>
              <View style={{height:20}}/>
              <DropMe />

 </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#6F6E70",
    padding:10
  },
});
