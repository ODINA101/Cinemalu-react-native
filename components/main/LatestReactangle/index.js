/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Title from "./title"
import Item from "./item"
import PlatformTouchable from 'react-native-platform-touchable';
class SubTitle extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <View style={{justifyContent:'center',backgroundColor:"#E7A842",height:42}}>
         <Text style={{fontSize:18,fontWeight:'bold',paddingLeft:22,color:"#000"}}>{this.props.text}</Text>
     </View>

    )
  }
}


class LoadMore extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <PlatformTouchable onPress={() => this.props.onPress()} style={{justifyContent:'center',alignItems: 'center',height:50}}>
         <Text style={{fontSize:14,fontWeight:'bold', color:"#E7A842"}}>Load More</Text>
     </PlatformTouchable>

    )
  }
}



export default class Reactangle extends Component {
  constructor(props) {
    super(props)
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

       <Title toggle={() => {this.setState({visible:!this.state.visible})}}  />
       {
         this.state.visible?(
       <View>
       {
         this.props.data.map(item => {
           return (
              <Item item={item} />
           )
         })
       }
        <LoadMore onPress={() => this.props.onLoadMore()}/>
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
