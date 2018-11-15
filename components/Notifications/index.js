/* @flow */

import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SingleNotify from './SingleNotify';
import PTRView from 'react-native-pull-to-refresh';
import {connect} from 'react-redux';
import * as Actions from '../Actions';
import {bindActionCreators} from 'redux';
class Notifications extends Component {
  constructor(props) {
    super(props);

   this.state= {
     nots:[],
     newNots:[],
     olds:[],
     notViewed:[]
   }
   if(this.props.nots) {
     this.state.newNots = this.props.nots

   }
  this.getEarlyNots = this.getEarlyNots.bind(this)
  this._refresh = this._refresh.bind(this)
//this.getEarlyNots()

if(this.state.notViewed !== []) {
  let notViewed = [];
  if(this.props.nots) {
    this.props.nots.forEach(item => {
if(item.viewed == false) {
  notViewed.push(item._id)
  }
 })

  }
  this.props.actions.viewNotifications(this.props.redux.Auth.token,notViewed,function(data) {
  //console.log("view")
})

}



  }


 timeAgo(date) {
  var seconds = ((new Date() - date) / 1000);

     return seconds + "1 second ago";
}
  getAllNots(data) {
    this.setState({nots:data})
    this.getEarlyNots()


  }

  componentDidMount() {
    this.props.onRef(this)
  }


_refresh() {
  let p = this;
  p.props.actions.getNotifications(p.props.redux.Auth.token,function(notdata) {

  p.setState({nots:notdata})
  p.getEarlyNots()

    });
}


 getEarlyNots() {
   let newNots = [];
   let olds = [];
   let tst = this.timeAgo(new Date(this.state.nots[0].created));
  console.log(new Date(this.state.nots[0].created).getTime())
  console.log(this.timeAgo(new Date(this.state.nots[0].created)))
  console.log(parseInt(tst))


  this.state.nots.forEach(item => {

   if(parseInt(this.timeAgo(new Date(item.created))) < 7200) {
     newNots.push(item)
   }else{
     olds.push(item)
   }

   })

  this.setState({olds:olds.reverse(),newNots})

 }


  render() {
    return (
      <View style={styles.container}>
      <PTRView onRefresh={() => {this._refresh()}}>

        <View
          style={{
            alignItems: 'center',
            padding: 10,
            borderBottomWidth: 1,
            borderColor: '#ebebeb',
            height: 50,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <View style={{flex: 1}}>
            <Text style={{fontSize: 14, color: '#4a4a4a'}}>Notifications</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <Text style={{fontSize: 14, color: '#4a4a4a'}}>
              Make all as read
            </Text>
          </View>
        </View>

        <View
          style={{
            borderBottomWidth: 1,
            borderColor: '#ebebeb',
            height: 50,
            justifyContent: 'center',
            paddingLeft: 10,
          }}
        >
          <Text style={{fontSize: 14, color: '#4a4a4a'}}>New</Text>
        </View>
        {
          this.state.newNots.map(item => {
            return (
              <SingleNotify nav={this.props.nav} item={item} />
            )
          })
        }

        <View
        style={{
          borderBottomWidth: 1,
          borderColor: '#ebebeb',
          height: 50,
          justifyContent: 'center',
          paddingLeft: 10,
        }}
      >
        <Text style={{fontSize: 14, color: '#4a4a4a'}}>Earlier</Text>
      </View>
      {
  this.state.olds.map(item => {
    return (
      <SingleNotify  nav={this.props.nav} item={item}/>
    )
  })
}




        </PTRView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
});






function mapStateToProps(state) {
  return {
    redux: state,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch),
  };
}







export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
