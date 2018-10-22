/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView
} from 'react-native';
import axios from "axios"
export default class Profile extends Component {
  constructor(props) {
    super(props)

   axios.get("http://cinemaluapi-test.us-east-1.elasticbeanstalk.com/api/users/{userID}")
   .then(res => console.log(res.data))

  }
  render() {
    return (
      <View style={styles.container}>
     <ScrollView style={{flex:1}}>
      <View style={{height:400,backgroundColor: "#f8f8f8"}}>
      <View style={{flex:1.2,justifyContent: 'center',alignItems: 'center'}}>
     <View style={{width:120,height:120,backgroundColor:"#C6C6C6"}} />
      </View>
      <View style={{flex:1}}>
        <Text style={{fontSize:26,color:"#354052",paddingLeft:20}}>Swapna Pasham</Text>
        <Text style={{fontSize:18,color:"#363636",paddingLeft:20,fontWeight: '700'}}>@sp</Text>

      </View>

     <View style={{flex:1,flexDirection: 'row'}}>

     <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>

     <View style={{alignItems: 'center'}}>
     <Text style={{color:"#f1a61f",fontSize:30,fontWeight:'500'}}>0</Text>
     <Text style={{color:"#bababa",fontSize:14}}>Shares</Text>
     </View>

     </View>
     <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>

     <View style={{alignItems: 'center'}}>
     <Text style={{color:"#f1a61f",fontSize:30,fontWeight:'500'}}>23</Text>
     <Text style={{color:"#bababa",fontSize:14}}>Thoughts</Text>
     </View>

     </View>
<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

  <View style={{alignItems: 'center'}}>
    <Text style={{color: '#f1a61f', fontSize: 30, fontWeight: '500'}}>3</Text>
    <Text style={{color: '#bababa', fontSize: 14}}>Following</Text>
  </View>

</View>



     </View>



      </View>

{
//Activity
}


<View style={{height:45,backgroundColor:"#4a4a4a",justifyContent: 'center'}}>
<Text style={{color:"#FFF",fontSize:15,padding:20}}>ACTIVITY</Text>
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
