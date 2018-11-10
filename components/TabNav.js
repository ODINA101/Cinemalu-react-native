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
import IconBadge from 'react-native-icon-badge';

console.disableYellowBox = true;


export default class TabNav extends Component {
constructor(props) {
  super(props)
  this.state = {
      badge:0,
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

    this.unReadNots = this.unReadNots.bind(this);
    setInterval(() => {
      this.unReadNots()
    },1000)
}
componentDidMount() {
  this.props.onRef(this)
}


unReadNots() {
  let vwd = 0;
         this.props.nots.forEach(item => {
         if(item.viewed == false) {
         vwd++
           }
          })
          //console.log(vwd)
this.setState({badge:vwd})
}

rend(icon,iconName) {
  if(icon == "MaterialIcons") {
    if(iconName !== "notifications-none") {
      return(
  <MaterialIcons size={30} color="#9B9B9B" name={iconName}/>

    )

    }else{
      return(
        <IconBadge
    MainElement={
  <MaterialIcons size={30} color="#9B9B9B" name={iconName}/>
    }
    BadgeElement={
      <Text style={{color:'#FFFFFF'}}>{this.state.badge}</Text>
    }
    IconBadgeStyle={
         {
           minWidth:15,
           height:15,
         borderRadius:100,
         backgroundColor: '#f1a61f'
       }
       }
       Hidden={this.state.badge ==0}
       />

)
    }
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
