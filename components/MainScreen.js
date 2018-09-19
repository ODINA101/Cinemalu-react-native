import React, { Component } from 'react';
import {  View, Dimensions,ScrollView,  ActivityIndicator, } from 'react-native';
import Feather from "react-native-vector-icons/Feather"; // Version can be specified in package.json
import MovieTabs from "./MovieTabs"
const SCREEN_WIDTH = Dimensions.get("window").width
import SingleMovie from "./singleMovie"
import GridView from 'react-native-super-grid';

const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 20;
  return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom;
};




export default class MyComponent extends Component {
constructor(props) {
  super(props);

 this.state = {
   items:[],
   offsetY:6,
   loading:false
 }

}


componentWillMount() {
  fetch("https://api.cinemalu.com/api/movies/search/0/6/").then(res => res.json())
  .then(res => {
    this.setState({items:res})
  })

}

  render() {
    return (

            <View style={{flex:1,backgroundColor:"#393636"}}>
            <ScrollView style={{flex:1}}

            onScroll={({nativeEvent}) => {


               if (isCloseToBottom(nativeEvent)) {
                 if(!this.state.loading) {
                 this.setState({offsetY:(this.state.offsetY+6),loading:true})
                 setTimeout(() => {

                   fetch("https://api.cinemalu.com/api/movies/search/0/" + this.state.offsetY + "/").then(res => res.json())
                   .then(res => {
                     console.log(res)
                     this.setState({items:res,loading:false})

                   })

                 },1000)
               }

               }




             }}
            >

              <Feather size={25} color="#FFF" name="search" style={{marginTop:40,marginLeft:10}}/>
              <View style={{width:SCREEN_WIDTH,height:50,flexDirection:"row",justifyContent:"center",marginTop:20}}>
               <MovieTabs />
             </View>
         <View style={{marginTop:50}}>
             <GridView
                    itemDimension={150}
                    items={this.state.items}
                    renderItem={item => (
                      <View style={{justifyContent: 'center',alignItems:"center"}}>
                      <SingleMovie item={item} />
                      </View>
                    )}
                  />

                  {
                    this.state.loading?(
                         <ActivityIndicator size="small" color="#00ff00" />
                    ):(
                      <View />
                    )
                  }
         </View>


         </ScrollView>
            </View>

    );
  }
}
