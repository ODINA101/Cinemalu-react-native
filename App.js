/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Router from "./components/Router"
import {Provider} from "react-redux"
import {createStore,combineReducers,applyMiddleware} from "redux"
import Auth from "./components/reducer/Auth"
import Database from "./components/reducer/Database"
import logger from "redux-logger"
import thunk from "redux-thunk"
import GlobalFont from 'react-native-global-font'


const store = createStore(combineReducers({Auth,Database}),applyMiddleware(logger,thunk))


export default class App extends Component {
  componentDidMount() {
   let fontName = 'Lato-Medium'
   GlobalFont.applyGlobal(fontName)
}
  render() {
    return (
      <Provider store={store}>
      <View style={styles.container}>
        <Router />
      </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
