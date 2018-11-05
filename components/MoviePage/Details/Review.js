/* @flow */

import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ReviewItem from './ReviewItem';


export default class Review extends Component {
  render() {
    return (
      <View style={styles.container}>

        {this.props.info.map(item => {
          return (
            <View>
              <View style={{alignItems: 'center'}}>
                <Text
                  style={{color: '#212529', fontSize: 18, fontWeight: '700'}}
                >
                  GreatAndhra
                </Text>

              </View>
              <ReviewItem left="Review" right={item.reviewText}  Review/>
              <ReviewItem left="Rating" right={5} Rating />
              <ReviewItem left="Summary" right={item.reviewSummary}  />
              <ReviewItem left="Reviewer" right={item.reviewedBy}  />
            </View>
          );
        })}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
