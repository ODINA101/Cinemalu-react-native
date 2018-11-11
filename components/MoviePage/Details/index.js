/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView
} from 'react-native';
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Touchable from 'react-native-platform-touchable';
import Tabs from "./Tabs"
import Music from "./Music"
import Review from "./Review"
import Awards from "./Awards"
import BoxOffice from "./BoxOffice"
export default class Details extends Component {
  constructor(props) {
    super(props)

    this.state = {
      ActiveTab:"Cast",
      casts:this.props.navigation.state.params.info.cast
    }
  console.log()
  }
  render() {
    return (
      <View style={styles.container}>

      <View
      style={{
        height: 55,
        backgroundColor: '#4a4a4a',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}
    >

    <View />
      <Text style={{color: '#FFF', fontSize: 16, padding: 20}}>
     Cast & Co.
      </Text>
      <Touchable onPress={()=> {this.props.navigation.pop()}} style={{padding:20}}>
      <MaterialIcons size={30} color="#FFF" name="close" />
      </Touchable>
    </View>
    <ScrollView style={{flex:1}}>
    <Tabs onTabChange={(n) => this.setState({ActiveTab:n})}/>
    {
          this.state.ActiveTab=="Music"?(<Music info={this.props.navigation.state.params.info.songs}/>):(<View />)
        }

    {
          this.state.ActiveTab=="Reviews"?(<Review info={this.props.navigation.state.params.info.reviews}/>):(<View />)
    }


    {
          this.state.ActiveTab=="Awards"?(<Awards info={{}}/>):(<View />)
        }

    {
          this.state.ActiveTab=="BoxOffice"?(<BoxOffice info={{}}/>):(<View />)
    }



   {
     this.state.ActiveTab=="Cast"?(
       this.state.casts.map(item => {
         return(
           <View style={{height:80,paddingLeft:10,paddingTop:10,borderBottomWidth:1,borderColor:"#ebedee",flexDirection: 'row'}}>
         <View style={{flex:1}}>

         {
           item.person?(
             item.person.media?(
          <Image source={{uri:item.person.media.linkToContent}}
        style={{width:52,height:43,borderWidth:1,borderColor:"#979797" }}/>
        ):(<View/>)

      ):(<View />)
         }
          </View>
          {
            item.person?(
          <View style={{flex:3}}>
           <Text style={{color:"#000",fontSize:16}}>{item.person.firstName}</Text>
           <Text style={{color:"#9b9b9b",fontSize:14}}>{item.role}</Text>
          </View>
        ):(<View />)
}


         </View>

         )
       })


     ):(<View />)
   }

</ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#FFF"
  },
});
