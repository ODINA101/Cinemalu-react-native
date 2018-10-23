/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import MaterialCommunityIcons
  from 'react-native-vector-icons/MaterialCommunityIcons';
export default class Tabs extends Component {

constructor(props) {
  super(props)

  this.state = {
    dayLeft:0
  }

  let nw = Date.now();
  let releaseDate = Date.parse(props.info.releaseDate)
  let left = releaseDate-nw;
  console.log(left)
  let rld = this.convertMiliseconds(left,"d");
  console.log(rld)
  this.state.dayLeft = rld.toString().replace("-","")


}

 convertMiliseconds(miliseconds, format) {
  var days, hours, minutes, seconds, total_hours, total_minutes, total_seconds;

  total_seconds = parseInt(Math.floor(miliseconds / 1000));
  total_minutes = parseInt(Math.floor(total_seconds / 60));
  total_hours = parseInt(Math.floor(total_minutes / 60));
  days = parseInt(Math.floor(total_hours / 24));

  seconds = parseInt(total_seconds % 60);
  minutes = parseInt(total_minutes % 60);
  hours = parseInt(total_hours % 24);

  switch(format) {
	case 's':
		return total_seconds;
		break;
	case 'm':
		return total_minutes;
		break;
	case 'h':
		return total_hours;
		break;
	case 'd':
		return days;
		break;
	default:
		return { d: days, h: hours, m: minutes, s: seconds };
  }
}

  render() {
    return (
      <View style={{flexDirection: 'row',height:42,backgroundColor:"#EBEBEC"}}>
      <View style={{alignItems: 'center',width:70}}>
      <Text style={{fontWeight: 'bold',color:"#4C4C4C"}}>{this.state.dayLeft}</Text>
      <Text>Days left</Text>

      </View>
      <View style={{width:1,backgroundColor:"#B0AFB2"}}/>
      <View style={{alignItems: 'center',width:70}}>
      <Text style={{fontWeight: 'bold',color:"#4C4C4C"}}>{this.props.info.interestCount}</Text>
      <Text>Followers</Text>

      </View>
      <View style={{width:1,backgroundColor:"#B0AFB2"}}/>

      <View style={{alignItems: 'center',width:70}}>
      <Text style={{fontWeight: 'bold',color:"#4C4C4C"}}>{this.props.info.thoughtCount}</Text>
     <Text>Thoughts</Text>

      </View>
      <View style={{width:1,backgroundColor:"#B0AFB2"}}/>
      {

          this.props.followed?(
            <View style={{flex:1,backgroundColor:"#E8A73D",flexDirection: 'row',justifyContent: 'center',alignItems: 'center'}}>
            <View style={{paddingRight:5}}>
             <MaterialCommunityIcons size={20} color="#FFF" name="check" />
             </View>

                 <Text style={{color:"#fff",fontSize:17}}>Following</Text>


            </View>

          ):(
            <View style={{flex:1,backgroundColor:"#f8f8f8",flexDirection: 'row',justifyContent: 'center',alignItems: 'center'}}>


                 <Text style={{color:"#4C4C4C",fontSize:17}}>Follow</Text>


            </View>

          )
      }

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
