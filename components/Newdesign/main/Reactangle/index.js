/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Title from "./title"
import Item from "./item"

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
      <View style={{justifyContent:'center',alignItems: 'center',height:50}}>
         <Text style={{fontSize:14,fontWeight:'bold', color:"#E7A842"}}>Load More</Text>
     </View>

    )
  }
}



export default class Reactangle extends Component {
  render() {
    return (
      <View style={styles.container}>
      <View style={{
        backgroundColor:"#4A4A4A",
        borderRadius:4,
      }}>

       <Title  />
       <SubTitle text="Upcoming Releases" />
        <Item followed={true}/>
        <Item followed={true}/>
        <Item followed={true}/>
        <Item followed={false}/>

       <SubTitle text="Released" />

        <Item followed={true}/>
        <Item followed={true}/>
        <Item followed={true}/>
        <Item followed={false}/>
        <Item followed={true}/>
        <Item followed={true}/>
        <Item followed={true}/>
        <LoadMore />
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
