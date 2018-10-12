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

export default class MyMovies extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data:[]
    }

    axios.get("http://cinemaluapi-test.us-east-1.elasticbeanstalk.com/api/movies/load/my-movies",{
      headers:{
        'Authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1YmFiYzNlMGE3Zjc2MDEzODY3MDIwY2UiLCJyb2xlIjoidXNlciIsImVtYWlsIjoia2luZ29mYXBwczEyM0BnbWFpbC5jb20iLCJmaXJzdE5hbWUiOiJCaWR6aW5hIiwibGFzdE5hbWUiOiJTYXhhcmFzaHZpbGkiLCJsb2dpbklEIjoiU2F4YXJpY2hpIiwiaWF0IjoxNTM5MzY3ODYzOTIzLCJleHAiOjE1MzkzODU4NjM5MjN9.wyJu6Oc14-X1dgq3A1relZg2l0Wx76omY_n5OtyjvuY'
      }
    })
    .then(res => {
       console.log(res.data)

       this.setState({data:res.data})

    })



  }
  render() {
    return (
      <View style={styles.container}>

      <GridView
                   itemDimension={150}
                   items={this.state.data}
                   renderItem={item => (
                     <View style={{justifyContent: 'center',alignItems:"center"}}>
                     <SingleMovie onFollow={() => this.props.actions.MovieFollow(item._id)} nav={this.props.nav} item={item} />
                     </View>
                   )}
                 />


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
