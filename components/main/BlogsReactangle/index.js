/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput
} from 'react-native';
import Title from "./title"
import Item from "./item"
import PlatformTouchable from 'react-native-platform-touchable';


class LoadMore extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <PlatformTouchable onPress={() => this.props.loadMore()} style={{justifyContent:'center',alignItems: 'center',height:50}}>
         <Text style={{fontSize:14,fontWeight:'bold', color:"#E7A842"}}>Load More</Text>
     </PlatformTouchable>

    )
  }
}



export default class Reactangle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible:true
    }

  }
  render() {
    return (
      <View style={styles.container}>
      <View style={{
        backgroundColor:"#4A4A4A",
        borderRadius:4,
      }}>

       <Title  toggle={() => {this.setState({visible:!this.state.visible})}} />
       <View style={{paddingLeft:10,paddingRight:10}}>
       <View style={{borderRadius:4,flexDirection:'row',paddingLeft :8,borderWidth:1,borderColor:"#858585",alignItems: 'center',height:50}}>
      <TextInput placeholder="Your E-Mail Address" style={{color:"#FFF"}} placeholderTextColor="#858585" />
     </View>
     </View>
     <View style={{paddingLeft:10,paddingRight:10,paddingTop:20}}>
     <View style={{borderRadius:4,flexDirection:'row',justifyContent: 'center',borderWidth:1,borderColor:"#E7A842",alignItems: 'center',height:50}}>
     <Text style={{color:"#E7A842"}}>Subscribe</Text>
    </View>
   </View>

{
  this.state.visible?(

 <View>
 {
   this.props.posts.map(item => {
  return (
    <Item  gotoLoginPage={() => {this.props.gotoLoginPage() }} gotoRegPage={()=> {this.props.gotoRegPage()}} nav={this.props.nav} info={item}/>
  )
   })
 }

        <LoadMore loadMore={() => this.props.onLoadMore()} />

    </View>
  ):(<View />)
}
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding:10,
  },
});
