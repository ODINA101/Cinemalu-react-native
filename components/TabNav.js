import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';
import MaterialCommunityIcons
  from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from "react-native-vector-icons/MaterialIcons"


console.disableYellowBox = true;


export default class TabNav extends Component {
constructor(props) {
  super(props)

  this.state = {
    tabs:[
     {

      name:'Movies',
      icon:"MaterialIcons",
      iconName:"local-movies"
    },

     {
      name:'Calendar',
      icon:"MaterialCommunityIcons",
      iconName:"calendar-today"
    },


    {
      name:'Notification',
      icon:"MaterialIcons",
      iconName:"notifications-none"

    },
     {
      name:'Account',
      icon:"MaterialCommunityIcons",
      iconName:"account"
    },
  ]
  }
}


rend(icon,iconName) {
  if(icon == "MaterialIcons") {
    return(
      <MaterialIcons size={30} color="#9B9B9B" name={iconName}/>

    )
  }else{
  return(
    <MaterialCommunityIcons size={30} color="#9B9B9B" name={iconName}/>

  )
}
}

  render() {
    return (
      <View style={{height:80,padding:10,backgroundColor: "#303030",flexDirection:'row',elevation:5}}>
 {
     this.state.tabs.map(item => {
       if(Platform.OS == "android") {
       return(
         <TouchableNativeFeedback key={item.name}  onPress={() => this.props.onTabClick(item)} >
       <View style={{flexDirection:'column',flex:1,alignItems:'center'}}>
          {
            this.rend(item.icon,item.iconName)
          }

       <Text style={{color: "#9B9B9B" }}>{item.name}</Text>
      </View>
      </TouchableNativeFeedback>
       )

  }else{
    <TouchableHighlight key={item.name}  onPress={() => this.props.onTabClick(item)} >
  <View style={{flexDirection:'column',flex:1,alignItems:'center'}}>
     {
       this.rend(item.icon,item.iconName)
     }

  <Text style={{color: "#9B9B9B" }}>{item.name}</Text>
 </View>
 </TouchableHighlight>
  }


     })
    }
         </View>
    );
  }
}
