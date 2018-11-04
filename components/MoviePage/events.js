/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Picker,
  WebView
} from 'react-native';
import date from 'date-and-time';
import R from "ramda"
export default class Events extends Component {
  constructor(props) {
    super(props)

   this.state = {
     currentEvent:{}
   }

  if(this.props.events.length>0) {
    this.state.currentEvent = this.props.events[0]

  }

  }
  getId(url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    if(url) {

    var match = url.toString().match(regExp);

    if (match && match[2].length == 11) {
        return match;
    } else {
        return 'error';
    }
  }
}

  render() {
    return (
      <View style={styles.container}>
      <View style={{backgroundColor: "#f8f8f8",height:100,justifyContent: 'center',padding:15}}>
       <Picker onValueChange={(item) => this.setState({currentEvent:item})} selectedValue={this.state.currentEvent} placeholder="" style={{borderWidth:1,borderColor:"#000"}}  mode="dropdown">
       {
         this.props.events.map(item => {
          return (
            <Picker.Item label={item.name} value={item} />
          )
         })
       }

       </Picker>
       </View>

       {
         !R.isEmpty(this.state.currentEvent)?(
           <View style={{padding:15}}>
           <Text style={{color:"#4a4a4a",fontSize:22,fontWeight: '700'}}>{this.state.currentEvent.name}</Text>

           <Text style={{color:"#4a4a4a",fontSize:14}}>{date.format(new Date(this.state.currentEvent.eventDate), 'MMM D,YYYY')}</Text>

           {
             this.state.currentEvent.videoUrl?(
               <WebView
              style={{height:220,marginTop:5}}
              javaScriptEnabled={true}
              source={{uri: ('https://www.youtube.com/embed/' + this.getId(this.state.currentEvent.videoUrl))}}
              allowfullscreen
              />



             ):(<View />)
           }
           </View>



         ):(<View />)
       }




        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#EBEBEC",
  },
});
