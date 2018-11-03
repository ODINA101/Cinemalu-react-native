/* @flow */

import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class InfoTabs extends Component {
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'row'}}>

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >

          <View style={{alignItems: 'center'}}>
            <Text style={{color: '#f1a61f', fontSize: 30, fontWeight: '500'}}>
              {this.props.sharesCount}
            </Text>
            <Text style={{color: '#bababa', fontSize: 14}}>Shares</Text>
          </View>

        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >

          <View style={{alignItems: 'center'}}>
            <Text style={{color: '#f1a61f', fontSize: 30, fontWeight: '500'}}>
              {this.props.thoughtsCount}
            </Text>
            <Text style={{color: '#bababa', fontSize: 14}}>Thoughts</Text>
          </View>

        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >

          <View style={{alignItems: 'center'}}>
            <Text style={{color: '#f1a61f', fontSize: 30, fontWeight: '500'}}>
              {this.props.followedCount}
            </Text>
            <Text style={{color: '#bababa', fontSize: 14}}>
              Following
            </Text>
          </View>

        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
