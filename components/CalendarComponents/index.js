/* @flow */

import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import {Calendar} from "react-native-calendars"
export default class CalendarPage extends Component {
  render() {
    return (

      <View style={{flex:1}}>

      <Calendar
      style={{flex:1,marginTop:50}}
      current={'2018-10-07'}
      minDate={'1999-05-10'}
      maxDate={'2193-05-30'}
      hideArrows={false}
      onDayPress={(day) => {console.log('selected day', day)}}
      onDayLongPress={(day) => {console.log('selected day', day)}}
      monthFormat={'yyyy MM'}
      onMonthChange={(month) => {console.log('month changed', month)}}
      hideExtraDays={true}
      disableMonthChange={true}
      firstDay={1}
      hideDayNames={true}
      showWeekNumbers={true}
      onPressArrowLeft={substractMonth => substractMonth()}
      onPressArrowRight={addMonth => addMonth()}
      markedDates={{
    '2018-05-16': {selected: true, marked: true, selectedColor: 'blue'},
    '2018-05-17': {marked: true},
    '2018-05-18': {marked: true, dotColor: 'red', activeOpacity: 0},
    '2018-05-19': {disabled: true, disableTouchEvent: true}
  }}
    />
      </View>
    );
  }
}
