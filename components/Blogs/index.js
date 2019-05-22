/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import {connect} from 'react-redux';
import Touchable from 'react-native-platform-touchable';
import Comments from "../assets/CommentsWhite.png"
import DropMe from "./DropMe"
import BlogsReactangle from "../main/BlogsReactangle"
import  * as Actions  from "../Actions/nwActions"
import {bindActionCreators} from 'redux';



  class Blogs extends Component {
    constructor(props) {
      super(props)
      this.state = {
        loading:true,
        date:""
      }


      this.props.actions.getFeaturedData(() => {
        this.setState({loading:false})

       date = new Date(this.props.featuredData.featuredBlog.created);
       year = date.getFullYear();
       month = date.getMonth()+1;
       dt = date.getDate();

       if (dt < 10) {
         dt = '0' + dt;
       }
       if (month < 10) {
         month = '0' + month;
       }


       this.setState({date:year+'.' + month + '.'+dt})
      })
    }
  render() {
    return (
      <View style={styles.container}>
      <ScrollView style={{flex:1}}>
        <View style={{height:40}}/>

         <Text style={{fontSize:25,color:"#FFF"}}>Featured Blog Post</Text>
         {

 !this.state.loading?(
   <View>
         <Image source={{uri:this.props.featuredData.featuredBlog.media.url}} style={{marginTop:20,height:250,borderRadius:8}}/>


         <View style={{flexDirection: 'row',alignItems: 'center',paddingLeft:0}}>
            <Image source={Comments} style={{resizeMode:"contain",width:20}}/>
           <Text style={{paddingLeft:8,color:"#FFF",fontSize:12,fontFamily:"Lato",fontWeight:"bold"}}>Opinions: 61</Text>
             </View>
             <Text style={{fontSize:20,color:"#FFF",fontWeight: 'bold'}}>{this.props.featuredData.featuredBlog.title}</Text>
              <View style={{height:1,width:30,backgroundColor:"#FFF",marginTop:10}}/>
              <Text style={{color:"#FFF",marginTop:10}}>{this.props.featuredData.featuredBlog.content}</Text>
              <View style={{flexDirection: 'row',marginTop:15}}>
              <Text style={{color:"#AEABAB"}}>Posted - {this.state.date} by </Text><Text style={{color:"#E4B22A"}}>{this.props.featuredData.featuredBlog.author.firstName + " " +this.props.featuredData.featuredBlog.author.lastName}</Text>
              </View>
              <Touchable style={{marginTop:10, height:40,justifyContent: 'center',alignItems: 'center',borderWidth:1,borderColor:"#FFF",borderRadius:4}}>
                    <Text style={{color:"#AEABAB"}}>READ MORE</Text>
              </Touchable>

              <View style={{height:100,marginTop:20,justifyContent: 'center',alignItems: 'center',backgroundColor:"#C4C4C4",borderRadius:4}}>
              <Text style={{fontSize:20,color:"#FFF",fontWeight: 'bold'}}>320x100</Text>
              </View>
              <View style={{height:20}}/>
              <DropMe value={"List of Blog Authors"} type={"tags"} data={this.props.featuredData.featuredBlog}/>
              <DropMe value="Tag cloud" data={this.props.featuredData.featuredBlog}/>
              <DropMe  value="List of Blog posts" data={this.props.featuredData.featuredBlog}/>

         <Text style={{fontSize:25,color:"#FFF",marginTop:15}}>Latest Blog Posts</Text>
          <BlogsReactangle posts={this.props.blogs} />
          </View>
        ):(

          <View style={{flex:1,height:400,justifyContent: 'center',alignItems: 'center'}}>
           <ActivityIndicator size="large" color="#00ff00" />
          </View>
        )
}


 </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#6F6E70",
    padding:10
  },
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch),
  };
}

function mapStateToProps(state) {
  return {
    blogs:state.nwDatabase.blogPosts,
    featuredData:state.nwDatabase.featuredData
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Blogs);
