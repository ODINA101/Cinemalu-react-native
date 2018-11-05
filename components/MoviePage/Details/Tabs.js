/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import Music from "./Music"
export default class Tabs extends Component {
constructor(props) {
  super(props);

  this.state = {
    items:["Cast","Music","Reviews","Awards","BoxOffice"],
    ActiveItem:"Cast"
  }



}

tabItem(isActive,name) {
  return(
    <Touchable onPress={() => {

      this.setState({ActiveItem:name})
      this.props.onTabChange(name)
    }} style={{height:60,minWidth:100,borderBottomWidth:isActive?(5):(2),justifyContent: 'center',alignItems: 'center',borderColor:isActive?("#f5a623"):("#8a8a9a")}}>
      <Text style={{fontWeight: '700',color:isActive?("#4a4a4a"):("#8d8d8d"),fontSize: 18}}>{name}</Text>
    </Touchable>
  )
}

  render() {
    return (
      <View style={styles.container}>
       <ScrollView style={{height:70}} contentContainerStyle={{height:70}} horizontal>
    
        {
          this.state.items.map(item => {
            if(item == this.state.ActiveItem) {
              return(this.tabItem(true,item))
            }else{
              return(
                this.tabItem(false,item)
              )

            }
          })
        }

       </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height:70
  },
});
