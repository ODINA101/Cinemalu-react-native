/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Image,
  ActivityIndicator
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


class MoviePage extends Component {
constructor(props) {
  super(props)

  this.state = {
    data:[]
  }


let p = this;

this.props.actions.GetPosts("test",false,function(data) {
  p.setState({data})
})

}




  render() {
    return (
      <View style={styles.container}>
      <Toolbar />
      <ScrollView>
      <ImageBackground style={{height:250,flexDirection: 'row'}} source={{uri:"https://s3.amazonaws.com/cinemalu-user-uploaded-contents/48336b3c-c2ea-49c7-8b86-db9994075651.jpeg"}}>
   <View style={{flex:5,justifyContent: 'flex-end'}}>
        <View style={{paddingLeft:16,paddingBottom:40}}>
      <Text style={{color:"#FFF",fontSize:18,fontWeight: 'bold'}}>MAHANATI</Text>
      <View style={{height:5}}/>
      <Text style={{color:"#FFF",fontSize:18,fontWeight: '400'}}>BE A PART OF HISTORY</Text>

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
   <Tabs />


{
  // <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',backgroundColor:"#FFF",height:80,paddingLeft:50,paddingRight:50}}>
  // <Text style={{color:"black",fontSize:18}}>CAST & PRODUCTION</Text>
  // <Ionicons size={40} color="#000"  name="ios-arrow-forward"/>
  // </View>
}



<TabsT />









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
