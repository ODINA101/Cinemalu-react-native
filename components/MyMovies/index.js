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
        'Authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1YmFiYzNlMGE3Zjc2MDEzODY3MDIwY2UiLCJyb2xlIjoidXNlciIsImVtYWlsIjoia2luZ29mYXBwczEyM0BnbWFpbC5jb20iLCJmaXJzdE5hbWUiOiJCaWR6aW5hIiwibGFzdE5hbWUiOiJTYXhhcmFzaHZpbGkiLCJsb2dpbklEIjoiU2F4YXJpY2hpIiwiaWF0IjoxNTM5NDIzMTgzODUzLCJleHAiOjE1Mzk0NDExODM4NTN9.DP52LOUFKs3ze6lxT76q-gR7ICVX89Agei71RrvzfQk'
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
                     <SingleMovie  onFollow={() => this.props.actions.MovieFollow(item._id)} nav={this.props.nav} item={item} />
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
