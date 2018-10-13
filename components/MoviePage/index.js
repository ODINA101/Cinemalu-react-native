/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Image,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import Toolbar from "./toolbar"
import Ionicons from "react-native-vector-icons/Ionicons"
import axios from "axios"
import Tabs from "./tabs"
import TabsT from "./tabs2"
import {connect} from "react-redux"
import {bindActionCreators} from 'redux';
import * as Actions from "../Actions"
import Post from "./Post"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Touchable from "react-native-platform-touchable"



import R from "ramda"
import Textarea from 'react-native-textarea';
class MoviePage extends Component {
constructor(props) {
  super(props)

  this.state = {
    data:[],
    info:{},
    cover:"",
    myComment:""
  }


let item = this.props.navigation.state.params.info;
let p = this;
console.log(item.id)
this.props.actions.GetMovieInfo(item._id,function(details) {
  p.setState({info:details,cover:details.media.url})
  console.log(details.media.url)

})


this.props.actions.GetPosts(item._id,false,function(data) {
  p.setState({data})
})

}



send() {
  let formData = new FormData();
  formData.append("text",this.state.myComment);
  console.log(formData)
  this.setState({myComment:""})
  axios.post("http://cinemaluapi-test.us-east-1.elasticbeanstalk.com/api/posts/" + this.state.info._id,formData,{
    headers:{
			'Authorization':'Bearer ' + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1YmFiYzNlMGE3Zjc2MDEzODY3MDIwY2UiLCJyb2xlIjoidXNlciIsImVtYWlsIjoia2luZ29mYXBwczEyM0BnbWFpbC5jb20iLCJmaXJzdE5hbWUiOiJCaWR6aW5hIiwibGFzdE5hbWUiOiJTYXhhcmFzaHZpbGkiLCJsb2dpbklEIjoiU2F4YXJpY2hpIiwiaWF0IjoxNTM5NDIzMTgzODUzLCJleHAiOjE1Mzk0NDExODM4NTN9.DP52LOUFKs3ze6lxT76q-gR7ICVX89Agei71RrvzfQk"
		}

  }).
  then(res => {
    console.log(res)
  })


}


  render() {
if(R.isEmpty(this.state.info)) {
  return (
    <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
    <ActivityIndicator size="large" color="#393636" />


    </View>
  )
}else{
    return (
      <View style={styles.container}>
      <Toolbar />
      <ScrollView>

  <ImageBackground style={{height:230,flexDirection: 'row'}} source={{uri:this.state.cover}}>
<View style={{flex:5,justifyContent: 'flex-end'}}>
  <View style={{paddingLeft:16,paddingBottom:40}}>
<Text style={{color:"#FFF",fontSize:18,fontWeight: 'bold'}}>{this.state.info.name}</Text>
<View style={{height:5}}/>
<Text style={{color:"#FFF",fontSize:18,fontWeight: '400'}}>{this.state.info.metaName}</Text>

 </View>
</View>
<View style={{flex:1,justifyContent: 'flex-end',alignItems: 'flex-end'}}>
<View style={{backgroundColor:"#f5a623",width:37,height:30,justifyContent: 'center',alignItems: 'center'}}>
<MaterialCommunityIcons size={20} color="#FFF" name="information-outline" />
</View>
<View style={{height:10}}/>
<View style={{backgroundColor:"#f5a623",width:37,height:30,justifyContent: 'center',alignItems: 'center'}}>
<MaterialCommunityIcons size={20} color="#FFF" name="movie" />
</View>
<View style={{height:50}}/>

</View>



</ImageBackground>


   <Tabs info={this.state.info}/>


{
  // <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',backgroundColor:"#FFF",height:80,paddingLeft:50,paddingRight:50}}>
  // <Text style={{color:"black",fontSize:18}}>CAST & PRODUCTION</Text>
  // <Ionicons size={40} color="#000"  name="ios-arrow-forward"/>
  // </View>
}



<TabsT />

<View style={{height:300,backgroundColor:"#FFF"}}>
<View style={{flex:0.3,padding:20}}>
<Image style={{width:35,height:35}} source={{uri:"https://s3.us-east-2.amazonaws.com/cinemalu-stage/45e394c5-bc0b-483b-9fa6-da23fbffaba4.jpeg"}}/>

</View>


<View style={{flex:2,padding:20}}>
<Textarea
 containerStyle={{height:150,borderWidth: 1,borderColor:"#bababa"}}
 onChangeText={(t) => { this.setState({myComment:t})}}
defaultValue={this.state.myComment}
 maxLength={150}
 placeholder={'Comment on this movie...'}
 placeholderTextColor={'#c7c7c7'}
 underlineColorAndroid={'transparent'}
/>


<View style={{flexDirection: 'row',paddingTop:5}}>
<View style={{flex:1,flexDirection: 'row'}}>
<Touchable>
<MaterialIcons size={25} name="photo" color="#6F6F6F"/>
</Touchable>

<Touchable style={{marginLeft:10}}>
<FontAwesome size={25} name="smile-o" color="#6F6F6F"/>
</Touchable>
</View>
<View style={{flex:1,justifyContent: 'flex-end',alignItems: 'flex-end'}}>

<Touchable onPress={() => {this.send()}} style={{width:60,height:30,backgroundColor: "#ebedee",color:"#4a4a4a",justifyContent: 'center',borderWidth:1,borderColor:"6f6f70",alignItems: 'center'}}>
<Text>Send</Text>
</Touchable>

</View>


</View>
</View>


</View>








{
  this.state.data.map(item => {
    return(
      <View>
      <Post item={item}/>
      <View style={{backgroundColor:"#B0AFB2",height:2}}/>
      </View>

   )
  })
}


{
 this.state.data ==[]?(
  <View />
):(

  <View style={{justifyContent: 'center',alignItems: 'center',height:100 }}>
  <ActivityIndicator size="large" color="#00ff00" style={{paddingTop:50}}  />

  </View>

)
}









      </ScrollView>
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
    redux:state
  }
}


function mapDispatchToProps(dispatch) {
  return {
    actions:bindActionCreators(Actions,dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(MoviePage)
