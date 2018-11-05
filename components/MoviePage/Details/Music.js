/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import MusicItem from "./MusicItem"
export default class Musics extends Component {
  render() {
    return (
      <View style={styles.container}>

     {
       this.props.info.map(item => {
         return (
          <View>
          <View style={{alignItems: 'center'}}>
            <Text style={{color:"#212529",fontSize:18,fontWeight: '700'}}>{item.shortName}</Text>
          </View>
           {
             item.singerMaleOne?(
               <MusicItem left="Singer 1" right={item.singerMaleOne.firstName + " " + item.singerMaleOne.lastName}/>

             ):(<View/>)
           }
           {
             item.singerMaleTwo?(
               <MusicItem left="Singer 2" right={item.singerMaleTwo.firstName + " " + item.singerMaleTwo.lastName}/>
             ):(<View/>)
           }
          {
            item.lyricistOne?(
              <MusicItem left="Lyrics" right={item.lyricistOne.firstName + " "  + item.lyricistOne.lastName}/>

            ):(<View />)
          }
          {
            item.lyricistTwo?(
              <MusicItem left="Lyrics 2" right={item.lyricistTwo.firstName + " "  + item.lyricistTwo.lastName}/>

            ):(<View />)
          }
          <MusicItem left="Duration" right=""/>
          <MusicItem left="Youtube" right={item.youtubeAudioLink} youtube/>

          </View>
        )
       })
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
