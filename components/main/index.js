/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native';
import styles from "./index.style"
import Search from "./search"
import Reactangle from "./Reactangle"
import BlogsReactangle from "./BlogsReactangle"
import LatestReactangle from "./LatestReactangle"
import * as Actions from "../Actions/nwActions"
import {connect} from "react-redux"
import {bindActionCreators} from 'redux';

class MainScreen extends Component {
  constructor(props) {
    super(props)


this.props.actions.getTrendingMovies()
this.props.actions.getBlogPosts()
this.props.actions.getFeaturedData(() => {})

  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={{flex:1}}>
        <View style={{height:80}}>
        <Search/>
        </View>
        <Reactangle nav={this.props.nav} upcomingMovies={this.props.redux.nwDatabase.upcomingMovies} releasedMovies={this.props.redux.nwDatabase.releasedMovies}/>
        <View style={{height:50}}/>
        <BlogsReactangle nav={this.props.nav} posts={this.props.redux.nwDatabase.blogPosts} />
        <View style={{height:50}}/>
        <LatestReactangle />
      </ScrollView>
      </View>
    );
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
