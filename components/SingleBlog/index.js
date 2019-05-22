
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
import FB from "../assets/fb.png"
import MAIL from "../assets/mail.png"
import TWITTER from "../assets/twitter.png"
import In from "../assets/In.png"
import leftSide from "../assets/left.png"
import  * as Actions  from "../Actions/nwActions"
import {bindActionCreators} from 'redux';



  class SingleBlog extends Component {
    constructor(props) {
      super(props)
      this.state = {
        loading:true,
        date:""
   }
       }
  render() {
    let info = this.props.navigation.state.params.info;
    let date = this.props.navigation.state.params.date;
    return (
      <View style={styles.container}>

      <ScrollView style={{flex:1}}>

<View style={{height:100,justifyContent: 'center',alignItems:'center' }}>
<View style={{flexDirection: 'row',alignItems: 'center'}}>
      <Image source={leftSide} style={{resizeMode:"contain",width:15}}/>
      <Text style={{color:"#E7A842",marginLeft:15}}>Thugs of Hindostan</Text>
 </View>
</View>
<View style={{paddingHorizontal:20}}>
<Text style={{color:"#FFF",fontSize:30,textAlign: 'center'}}>{info.title}</Text>
</View>



<View style={{alignItems: 'center',marginTop:30}}>
<View style={{flexDirection: 'row'}}>
<Text style={{color:"#AEABAB",fontSize:15}}>Posted by - {date} by </Text>
<Text style={{color:"#E7A842",fontSize:15}}>{info.author.firstName}</Text>
</View>
</View>



<View style={{flexWrap: 'wrap',flexDirection:'row',marginTop:30}}>
{

   info.tags.map(item => {
    return (
      <View style={{marginTop:10,alignSelf: 'flex-start',marginLeft:15,justifyContent:'center',backgroundColor:"#2D2D2D",borderRadius:20,height:50,padding:10,width:"auto",borderWidth:1,borderColor:"#E7A842"}}>
       <Text style={{color:"#E7A842",fontWeight: 'bold'}}>{item}</Text>
      </View>

    )
   })

}

</View>


         <Image source={{uri:info.media.url}} style={{marginTop:20,height:250,borderRadius:8}}/>
<View style={{alignItems: 'center',justifyContent: 'center',marginTop:20}}>
             <Text style={{color:"#BABABA",fontSize:17}}>Share this blog</Text>
             <View style={{flexDirection: 'row', height:150,justifyContent: 'space-between'}}>
          <Image source={FB} style={{resizeMode:"center",width:100,height:100}}/>
          <Image source={TWITTER} style={{resizeMode:"center",width:100,height:100}}/>
          <Image source={In} style={{resizeMode:"center",width:100,height:100}}/>
          </View>
</View>




<Text style={{fontSize:30,color:"#FFF"}}>I couldn’t bealive with my own eyes</Text>


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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleBlog);
