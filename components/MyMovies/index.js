/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import axios from "axios"
export default class MyMovies extends Component {
  constructor(props) {
    super(props)


    axios.get("http://cinemaluapi-test.us-east-1.elasticbeanstalk.com/api/movies/load/my-movies",{
      headers:{
        'Authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1YmFiYzNlMGE3Zjc2MDEzODY3MDIwY2UiLCJyb2xlIjoidXNlciIsImVtYWlsIjoia2luZ29mYXBwczEyM0BnbWFpbC5jb20iLCJmaXJzdE5hbWUiOiJCaWR6aW5hIiwibGFzdE5hbWUiOiJTYXhhcmFzaHZpbGkiLCJsb2dpbklEIjoiU2F4YXJpY2hpIiwiaWF0IjoxNTM4NTcwODc5NjA1LCJleHAiOjE1Mzg1ODg4Nzk2MDV9.pftMktSDTc9l6B6NkHNfmtf6B7Jqha1bIL0bUdV1IbA'
      }
    })
    .then(res => console.log(res))


  }
  render() {
    return (
      <View style={styles.container}>
        <Text>I'm the MyMovies component</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
