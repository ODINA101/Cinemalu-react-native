import React, { Component } from 'react';
import {  View, } from 'react-native';
import TabNav from "./TabNav"
import MainScreen from "./MainScreen"
import CalendarPage from "./CalendarComponents"
import Account from "./Account"
export default class HomeScreen extends Component {
 constructor() {
   super()

this.state = {
  page:"Account"
}
 this.tabChange = this.tabChange.bind(this)

 }

 tabChange(item) {
   this.setState({page:item.name})
 console.log(item.name)
 }

 rend() {

switch (this.state.page) {
  case "Movies":
    return <MainScreen />
  case "Calendar":
    return <CalendarPage />
  case "Account":
    return <Account />
  default:
    return <MainScreen />
}



 }
  render() {



    return (
       <View style={{flex:1}}>
 {
    this.rend()
}
      <TabNav onTabClick={(item)=> this.tabChange(item)} />


      </View>
    );
  }
}
