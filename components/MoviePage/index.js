/* @flow */

import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Image,
  ActivityIndicator,
  TextInput,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView
} from 'react-native';
import Toolbar from '../_GLOBAL/toolbar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import Tabs from './tabs';
import TabsT from './tabs2';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from '../Actions';
import Post from '../_GLOBAL/Post';
import Reply from '../_GLOBAL/Post/reply';

import MaterialCommunityIcons
  from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import picker from "react-native-picker-select"

import {MenuProvider} from 'react-native-popup-menu';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Touchable from 'react-native-platform-touchable';
import EmojiSelector from 'react-native-emoji-selector';
import ImagePicker from 'react-native-image-picker';
import Loader from 'react-native-modal-loader';
import Modal from 'react-native-modal';
import ShareModal from './shareModal';
import R from 'ramda';
import Makers from "./Makers"
import Events from "./events"



import Textarea from 'react-native-textarea';
class MoviePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      info: {},
      cover: '',
      myComment: '',
      editing: false,
      postId: '',
      itemId: '',
      emojies: false,
      image: null,
      isLoading: false,
      showShareModal: false,
      sharingItem: '',
      Tab:"Fans"
    };

    let item = this.props.navigation.state.params.info;
    let p = this;
    console.log(item.id);
    this.state.itemId = item.id;
    this.props.actions.GetMovieInfo(item._id,this.props.redux.Auth.token,function(details) {
      p.setState({info: details, cover: details.media.url});
      console.log(details.media.url);
    });


    this.props.actions.GetPosts(item._id, false,this.props.redux.Auth.token,function(data) {
      p.setState({data});
    });

    this.send = this.send.bind(this);
  }

  send() {
    this.setState({isLoading: true});
    let p = this;
    let item = this.props.navigation.state.params.info;
    let formData = new FormData();
    formData.append('text', this.state.myComment);
    console.log(formData);
    formData.append('file', this.state.image);

    this.setState({myComment: ''});

    if (this.state.editing) {
      p.props.actions.EditPost(item._id,formData,this.props.redux.Auth.token,function() {
        p.setState({isLoading: false});
      })

    } else {
    this.props.actions.AddPost(this.state.info._id,formData,this.props.redux.Auth.token,function(){
      p.props.actions.GetPosts(item._id, false, this.props.redux.Auth.token,function(data) {
        p.setState({data});
        p.setState({isLoading: false});
      });
    })
    }


  }

  postReport(id, isReported) {
    let p = this;
    this.props.actions.ReportPost(id, isReported,this.props.redux.Auth.token,function() {
      p.setState({data});
      p.setState({isLoading: false});

    });
  }
  postLike(id) {
    this.props.actions.LikePost(id, this.props.redux.Auth.token,function() {});
  }

  onPostAction(n, item) {
    let p = this;
    if (n == 1) {
      //Edit
      this.setState({myComment: item.text, editing: true, postId: item._id});
    } else {
      //Delete
      console.log(this.state.postId);
      this.props.actions.DeletePost(item._id,this.props.redux.Auth.token,function() {
        let item = this.props.navigation.state.params.info;
        p.props.actions.GetPosts(item._id, false, function(data) {
          p.setState({data});
        });
      })
    }
  }

  render() {
    if (R.isEmpty(this.state.info)) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#393636" />
        </View>
      );
    } else {
      return (
        <MenuProvider>

        <View style={styles.container}>

          <Toolbar nav={this.props.navigation} />
          <ScrollView>

            <ImageBackground
              imageStyle={{
               height:"190%"
              }}
              style={{height:250, flexDirection: 'row'}}
              source={{uri: this.state.cover}}
            >
              <View style={{flex: 5, justifyContent: 'flex-end'}}>
                <View style={{paddingLeft: 16, paddingBottom: 40}}>
                  <Text
                    style={{color: '#FFF', fontSize: 18, fontWeight: 'bold'}}
                  >
                    {this.state.info.name}
                  </Text>
                  <View style={{height: 5}} />
                  <Text
                    style={{color: '#FFF', fontSize: 18, fontWeight: '400'}}
                  >
                    {this.state.info.metaName}
                  </Text>

                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                }}
              >
                <View
                  style={{
                    backgroundColor: '#f5a623',
                    width: 37,
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <MaterialCommunityIcons
                    size={20}
                    color="#FFF"
                    name="information-outline"
                  />
                </View>
                <View style={{height: 10}} />
                <Touchable
                  onPress={() => {
                    this.props.navigation.push("MovieDetails",{info:this.state.info})
                  }}
                  style={{
                    backgroundColor: '#f5a623',
                    width: 37,
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <MaterialCommunityIcons size={20} color="#FFF" name="movie" />
                </Touchable>
                <View style={{height: 50}} />

              </View>

            </ImageBackground>

            <Tabs info={this.state.info} followed={this.state.info.interestedByCurrentUser} />

            {
            // <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',backgroundColor:"#FFF",height:80,paddingLeft:50,paddingRight:50}}>
            // <Text style={{color:"black",fontSize:18}}>CAST & PRODUCTION</Text>
            // <Ionicons size={40} color="#000"  name="ios-arrow-forward"/>
            // </View>
            }

            <TabsT onTabClick={(tab) => this.setState({Tab:tab})}/>

            {

              this.state.Tab=="Events"?(
                 <Events events={this.state.info.events} navigation={this.props.navigation}
                 movieId={this.props.navigation.state.params.info._id}/>
              ):(<View/>)

            }

      {

        this.state.Tab=="Makers"?(
           <Makers navigation={this.props.navigation} postLike={(id)=> {
             this.postLike(id)
           }} postReport={(id,abuses)=>this.postReport(id,abuses)} onPostAction={(e,item)=>this.onPostAction(e,item)} movieId={this.props.navigation.state.params.info._id}/>
        ):(<View/>)

      }


       {
         this.state.Tab=="Fans"?(
           <View>
            <Reply send={() => {this.send()}} o={this} addComment={(t) => this.setState({myComment:t})} myComment={this.state.myComment} />
            {this.state.data.map(item => {
             return (
             <View>
               <Post
                 nav={this.props.navigation}
                 share={() =>
                   this.setState({sharingItem: item, showShareModal: true})}
                 liked={item.userLikes.includes('5babc3e0a7f76013867020ce')}
                 reported={item.userAbuses.includes(
                   '5babc3e0a7f76013867020ce',
                 )}
                 like={() => this.postLike(item._id)}
                 report={() =>
                   this.postReport(
                     item._id,
                     item.userAbuses.includes('5babc3e0a7f76013867020ce'),
                   )}
                 action={e => this.onPostAction(e, item)}
                 item={item}
               />
               <View style={{backgroundColor: '#B0AFB2', height: 2}} />
             </View>
           );
         })}

         {this.state.data == []
           ? <View />
           : <View
               style={{
                 justifyContent: 'center',
                 alignItems: 'center',
                 height: 100,
               }}
             >
               <ActivityIndicator
                 size="large"
                 color="#00ff00"
                 style={{paddingTop: 50}}
               />

             </View>}
           </View>
         ):(<View />)
       }









          </ScrollView>
          {this.state.isLoading
            ? <Loader loading={true} color="#ff66be" />
            : <View />}

          <ShareModal
             share={(id,comment) => {
               this.setState({isLoading:true})
               let p = this;
               this.props.actions.SharePost(id,comment,function(){
                p.setState({isLoading:false})
               })
             }}
             addComment={(t) => this.setState({myComment:t})}
            item={this.state.sharingItem}
            dismiss={() => this.setState({showShareModal: false})}
            showShareModal={this.state.showShareModal}
          />
        </View>
        </MenuProvider>

      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

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

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);
