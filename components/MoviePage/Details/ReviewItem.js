/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Linking,
  Dimensions
} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import StarRating from 'react-native-star-rating';
import HTML from 'react-native-render-html';
import { parse } from 'node-html-parser';


export default class ReviewItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showMore:false,
      txt:""
    }
    if(props.Review) {
      const root = parse(this.props.right);
 if(root.querySelector("span")) {
   console.log(root.querySelector("span").childNodes[0].rawText)
   this.state.txt = root.querySelector("span").childNodes[0].rawText.slice(0,10)
 }else{
   console.log(root.firstChild)
   this.state.txt = root.firstChild.slice(0,10)
 }

    }

  }
  render() {
    return (
      <View style={{paddingLeft:this.state.showMore?(35):(0),flexDirection: this.state.showMore?("column"):("row"),padding:5,borderBottomWidth:1,borderBottomColor:"#d3d4d5",minHeight:70}}>
            <View style={{flex:1,justifyContent: this.state.showMore?("flex-start"):("center"),alignItems:this.state.showMore?("flex-start"):("center")}}>
           <Text style={{fontSize:16,color:"#000"}}>{this.props.left}</Text>
           </View>
            <View style={{flex:1,justifyContent: this.state.showMore?("flex-start"):("center"),alignItems:this.state.showMore?("flex-start"):("center")}}>

            {
              !this.props.Review?(
                this.props.Rating?(
                  <StarRating
           disabled
           emptyStar={'ios-star-outline'}
           fullStar={'ios-star'}
           halfStar={'ios-star-half'}
           iconSet={'Ionicons'}
           maxStars={5}
           starSize={25}
           rating={this.props.right}
           fullStarColor={'#f5a623'}
         />
                ):(
                  <Text style={{color:"gray",fontSize:16}}>{this.props.right}</Text>
                )

              ):(
                <Touchable onPress={()=> {
                 this.setState({showMore:!this.state.showMore})
                }}>
                <View style={{flexDirection: this.state.showMore?("column"):("row") }}>

                {
                  !this.state.showMore?(
                    <Text style={{color:"gray",fontSize:16}}>{this.state.txt}</Text>

                  ):(
                    <View>
                   <HTML html={this.props.right} imagesMaxWidth={Dimensions.get('window').width} />
                    </View>
                  )
                }
                <Text style={{color:"#007bff",fontSize:16,paddingBottom:8}}>  {this.state.showMore?("less"):("more")}</Text>
                </View>
                 </Touchable>
              )
            }
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
