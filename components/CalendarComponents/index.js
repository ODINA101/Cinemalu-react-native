/* @flow */

import React, { Component } from 'react';
import {
  View,
  Dimensions,
  Text
} from 'react-native';
import {Calendar} from "react-native-calendars"
import date from 'date-and-time';
import {connect} from "react-redux"
import {bindActionCreators} from 'redux';
import * as Actions from "../Actions"
import Ionicons from "react-native-vector-icons/Ionicons"
import Touchable from 'react-native-platform-touchable';


class CalendarPage extends Component {
constructor(props) {
  super(props)
  let now = new Date();

  this.state = {
    now:date.format(now, 'YYYY-MM-DD'),
    selectedDates:{},
    CurrentSellected:{},
    showModal:false
  }




this.props.actions.getReleasingMovies(new Date(),function(data) {
  console.log(data)
})

this.getMoviesByDate = this.getMoviesByDate.bind(this)


}


getMoviesByDate(datai) {
  let p = this;
  console.log(datai.dateString)
  console.log(
  date.parse(datai.dateString, 'YYYY-MM-DD')
  )
  let converted = date.parse(datai.dateString, 'YYYY-MM-DD');

this.props.actions.getReleasingMovies(converted,function(data) {
  console.log(data)
  let SelectedDatesArr = {};

  data.forEach(item => {
    let ind = date.format(new Date(item.releaseDate), 'YYYY-MM-DD');
    console.log(ind)
    let nw = {}
    nw[ind] = {
      marking:true,
      customStyles: {
        container: {
          backgroundColor: '#f3a73a',
          borderRadius:0
        },
        text:{
          color: '#FFF',
        },
       base:{
         color:"#000"
       }},
       data:item
      }
    Object.assign(SelectedDatesArr,nw)
  })

  console.log(SelectedDatesArr)
  p.setState({selectedDates:SelectedDatesArr})

})

}



  render() {
    return (

      <View style={{flex:1,backgroundColor:"#FFF"}}>

      <Calendar
      markingType={'custom'}
      style={{flex:1,marginTop:50}}
      minDate={'1999-05-10'}
      maxDate={'2193-05-30'}
      hideArrows={false}
      onDayPress={(day) => {
          let cob = this.state.selectedDates[day.dateString];
         if(cob !== undefined) {

           console.log('selected day', cob.data)
           this.setState({CurrentSellected:cob.data,showModal:true})
         }


      }}
      onDayLongPress={(day) => {console.log('selected day', day)}}
      monthFormat={'MMMM yyyy'}
      onMonthChange={(month) => {this.getMoviesByDate(month)}}
      hideExtraDays={true}
      disableMonthChange={true}
      firstDay={1}
        scrollEnabled={true}
      hideDayNames={false}
      onPressArrowLeft={substractMonth => substractMonth()}
      onPressArrowRight={addMonth => addMonth()}
      markedDates={this.state.selectedDates}
      theme={{
  arrowColor: '#f3a73a',
  'stylesheet.calendar.header': {
    week: {
      marginTop: 0,
      flexDirection: 'row',
      justifyContent: 'space-between',
      fontSize:15
    }
  }
}}
    />
    {
      this.state.showModal?(
        <View style={{padding:8,backgroundColor: "#f8f8f8",elevation:5,width:Dimensions.get("window").width/1.2,height:Dimensions.get("window").height/2.2,top:90,position: 'absolute',alignSelf: 'center'}}>
<View style={{height:50,alignItems: 'flex-end'}}>
<Touchable onPress={() => this.setState({showModal:false})}>
<Ionicons name="md-close" color="#000" size={30}/>
</Touchable>
</View>

<Touchable onPress={() => {
  console.log(this.state.CurrentSellected.media._id)
  this.props.nav.navigate("MoviePage",{info:{id:this.state.CurrentSellected.media.movie,_id:this.state.CurrentSellected.media.movie}})

}}>
<View>
<View style={{backgroundColor:"#4a4a4a",width:70,paddingLeft:10}}>
<Text style={{color:"#FFF",fontWeight:'700',fontSize:9}}>MOVIE</Text>
</View>
<Text style={{color:"#000",fontSize:17,fontWeight:'500'}}>{this.state.CurrentSellected.name}</Text>
<Text style={{color:"#6f6f70",fontSize:17}}>{this.state.CurrentSellected.tagLine}</Text>
<View style={{alignItems:'flex-end',marginTop:5}}>
<Text style={{color:"#f1a61f",fontWeight: '500',fontSize:15}}>CONFIRMED</Text>
</View>
</View>

</Touchable>
<View style={{backgroundColor:"rgba(0,0,0,.5)",height:1.5}}/>


</View>

):(<View/>)
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(CalendarPage);
