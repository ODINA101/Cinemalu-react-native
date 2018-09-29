import React, { Component } from 'react';
import {  View, Dimensions,ScrollView,  ActivityIndicator, } from 'react-native';
import Feather from "react-native-vector-icons/Feather"; // Version can be specified in package.json
import MovieTabs from "./MovieTabs"
const SCREEN_WIDTH = Dimensions.get("window").width
import SingleMovie from "./singleMovie"
import GridView from 'react-native-super-grid';
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import * as Actions from "./Actions"



const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 20;
  return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom;
};



class MainScreen extends Component {
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
            <View style={{height:50,elevation:5,backgroundColor:"#393636",justifyContent: 'center',paddingLeft:10}}>

              <Feather size={25} color="#FFF" name="search" />
          </View>
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

              <View style={{width:SCREEN_WIDTH,height:50,flexDirection:"row",justifyContent:"center",marginTop:20}}>
               <MovieTabs />
             </View>
             {
               this.props.redux.Database.allMovies.length?(
                 <View style={{marginTop:50}}>

            <GridView
                   itemDimension={150}
                   items={this.props.redux.Database.allMovies}
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


               ):(
                 <View style={{flex:1,justifyContent:'center',alignItems: 'center',height:500}}>
                 <ActivityIndicator size="large" color="#00ff00" />
                 </View>
               )
             }

         </ScrollView>
            </View>

    );
  }
}




function mapStateToProps(state) {
  return {
    redux:state
  }
}


function mapDispatchToProps(dispatch) {
  return {
    actions:bindActionCreators(Actions,dispatch)
  }
}




export default connect(mapStateToProps,mapDispatchToProps)(MainScreen)
