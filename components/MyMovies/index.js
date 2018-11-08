/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import axios from "axios"
import GridView from 'react-native-super-grid';
import SingleMovie from "../singleMovie"
import {connect} from 'react-redux';
import * as Actions from '../Actions';
import {bindActionCreators} from 'redux';

class MyMovies extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data:[],
      LoggedIn:this.props.loggedIn
    }
let p = this;
this.props.actions.getMyMovies(this.props.redux.Auth.token,function(data) {
  p.setState({data})

})


  }
  render() {
    return (
      <View style={styles.container}>
        {
          this.state.LoggedIn?(
            <GridView
           itemDimension={150}
           items={this.state.data}
           renderItem={item => (
             <View style={{justifyContent: 'center',alignItems:"center"}}>
             <SingleMovie   onFollow={() => this.props.actions.MovieFollow(item._id)} nav={this.props.nav} item={Object.assign(item,{followedByCurrentUser:true})} />
             </View>
           )}
         />

       ):(<View style={{height:100,backgroundColor:"#393636",alignItems: 'center',paddingTop:20}}>

            <Text style={{color:"#FFF",fontSize:16}}>Please <Text onPress={()=>this.props.gotoLoginPage()}style={{color:"#007bff",
            textDecorationLine: "underline",
            textDecorationStyle: "solid",
            textDecorationColor: "#007bff"}}>Login</Text> to see your movies</Text>

           </View>)
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




export default connect(mapStateToProps, mapDispatchToProps)(MyMovies);
