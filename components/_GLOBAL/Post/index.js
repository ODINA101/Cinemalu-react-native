/* @flow */

import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  WebView
} from 'react-native';
import MaterialCommunityIcons
  from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {MenuProvider} from 'react-native-popup-menu';
import ProfilePic from '../profilePic';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import AutoHeightImage from 'react-native-auto-height-image';
import Touchable from 'react-native-platform-touchable';
import Reply from './reply';
import {connect} from "react-redux"
import {bindActionCreators} from 'redux';
import SingleReply from "./SingleReply"
import * as Actions from "../../Actions"
class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likedByMe: this.props.liked,
      likes: this.props.item.userLikes.length,
      reported: this.props.reported,
      reports: this.props.item.userAbuses.length,
      shares:this.props.item.userShares.length,
      replying: false,
      image:'',
      myComment2:'',
      editing:false,
      replies:[],
      youtubeURL:''

    };
    console.log(props);

 this.getReplies = this.getReplies.bind(this)
 this.urlify = this.urlify.bind(this)
this.getReplies()
let p = this;
let verifiedURL = this.urlify(this.props.item.text)
if(verifiedURL) {
 let ytId = this.getId(verifiedURL);
 if(ytId) {
 this.state.youtubeURL = ytId[ytId.length-1];
}
}

  }
  getId(url) {
      var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      if(url) {

      var match = url.toString().match(regExp);

      if (match && match[2].length == 11) {
          return match;
      } else {
          return 'error';
      }
    }
  }

 urlify(text) {
      var urlRegex = /(https?:\/\/[^\s]+)/g;
      return text.match(urlRegex, function(url) {
      return url[0]

      })
      // or alternatively
      // return text.replace(urlRegex, '<a href="$1">$1</a>')
  }



  getReplies() {
    let p = this;
  this.props.actions.getReplies(this.props.item._id,1,this.props.redux.Auth.token,function(data) {
    p.setState({replies:data})
  })


  }

  postReport(id, isReported) {
    let p = this;
    this.props.actions.ReportPost(id, isReported,this.props.redux.Auth.token,function() {
      p.setState({data});
      p.setState({isLoading: false});

    });
  }
  postLike(id) {
    this.props.actions.LikePost(id,this.props.redux.Auth.token,function() {});
  }


  openProfile() {
    this.props.nav.navigate('UserProfile', {id: this.props.item.createdBy._id});
  }
  send() {
    this.setState({isLoading: true});
    let p = this;

    let formData = new FormData();
    formData.append('text', this.state.myComment2);
    console.log(formData);
    formData.append('file', this.state.image);


    if (this.state.editing) {
      p.props.actions.EditPost(this.props.item._idd,formData,function() {
        p.setState({isLoading: false});
      })

    } else {
    this.props.actions.AddReply(this.props.item._id,formData,this.props.redux.Auth.token,function(){
   console.log("reply added")
        p.getReplies()
        p.setState({myComment2: ''});

    })
    }


  }

  render() {
    return (
      <View style={{padding: 10, flexDirection: 'column', minHeight: 100}}>
        <View style={{flexDirection: 'row', flex: 1}}>

          <View style={{flex: 1}}>
            <Touchable
              onPress={() => {
                if (!this.props.ProfilePage) {
                  this.openProfile();
                }
              }}
            >
              <ProfilePic item={this.props.item} />
            </Touchable>
          </View>

          <View style={{flex: 5}}>

            <Text>
              <Text
                onPress={() => {
                  if (!this.props.ProfilePage) {
                    this.openProfile();
                  }
                }}
                style={{fontWeight: 'bold', color: '#000', fontSize: 16}}
              >
                {this.props.item.createdBy.firstName}
              </Text>
              {' '}
              {' '}
              {this.props.item.text}

              {' '}
              <Text
                style={{
                  color: '#f1a61f',
                  fontSize: 15,
                  backgroundColor: '#FFF',
                  marginLeft: 5,
                }}
              >
                {this.props.ProfilePage ? ' ' + this.props.MovieName : ''}
              </Text>
            </Text>


            {
              this.props.item.text.includes("youtu")?(
                <WebView
              style={{height:220}}
              javaScriptEnabled={true}
              source={{uri: ('https://www.youtube.com/embed/' + this.state.youtubeURL)}}
              allowfullscreen
              />

          ):(<View />)
            }





                    {this.props.item.shared
              ? <View style={{flexDirection: 'row', flex: 1, paddingTop: 10}}>
                  <View style={{flex: 1}}>
                    <ProfilePic item={this.props.item} />
                  </View>
                  <View style={{flex: 5}}>
                    <Text>

                      <Text style={{fontWeight: 'bold', fontSize: 16}}>
                        {this.props.item.shared.createdBy.firstName}
                      </Text>

                      {' '}
                      {' '}
                      {this.props.item.shared.text}

                    </Text>
                    {this.props.item.shared.media
                      ? <AutoHeightImage
                          width={Dimensions.get('window').width / 1.5}
                          source={{uri: this.props.item.shared.media.url}}
                        />
                      : <View />}

                  </View>

                </View>
              : <View />}

            {this.props.item.media
              ? <AutoHeightImage
                  width={Dimensions.get('window').width / 1.5}
                  source={{uri: this.props.item.media.url}}
                />
              : <View />}

          </View>
          <View style={{flex: 0.6}}>
            <View style={{height: 50}}>
              {!this.props.ProfilePage
                ? <Menu
                    rendererProps={{placement: 'top'}}
                    skipInstanceCheck
                    style={{flexDirection: 'row'}}
                    onSelect={value => {
                      this.props.action(value);
                    }}
                  >
                    <MenuTrigger
                      children={
                        <View style={{paddingRight: 15}}>
                          <MaterialCommunityIcons
                            size={25}
                            color="#B2B2B2"
                            name="dots-vertical"
                          />
                        </View>
                      }
                    />
                    <MenuOptions style={{alignSelf: 'flex-start'}}>
                      <MenuOption value={1} text="Edit" />
                      <MenuOption value={2} text="Delete" />
                    </MenuOptions>
                  </Menu>
                : <View />}
            </View>
          </View>

        </View>
        <View style={{flex: 0.3, flexDirection: 'row'}}>

          <View style={{flex: 1}} />
          <View style={{flex: 5, flexDirection: 'row', paddingTop: 10}}>
           <Touchable onPress={() => this.setState({replying:!this.state.replying})} style={{flex:1}}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <MaterialCommunityIcons
                size={20}
                color="#B2B2B2"
                name="message-reply-text"
              />
              <Text style={{color: '#B2B2B2', paddingLeft: 5}}>{this.state.replies.length}</Text>
            </View>
            </Touchable>
            {this.props.item.shared
              ? <View />
              : <Touchable style={{flex: 1}} onPress={() => this.props.share()}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <MaterialCommunityIcons
                      size={20}
                      color="#B2B2B2"
                      name="reply"
                      style={{transform: [{scaleX: -1}]}}
                      flip={'horizontal'}
                    />
                    <Text style={{color: '#B2B2B2', paddingLeft: 5}}>{this.state.shares}</Text>
                  </View>
                </Touchable>}
            <Touchable
              style={{flex: 1}}
              onPress={() => {
                if (this.state.likedByMe) {
                  this.setState({likes: this.state.likes - 1});
                } else {
                  this.setState({likes: this.state.likes + 1});
                }
                this.setState({likedByMe: !this.state.likedByMe});
                this.props.like();
              }}
            >
              <View style={{flex: 1, flexDirection: 'row'}}>
                {this.state.likedByMe
                  ? <Ionicons size={20} color="#6F6E6F" name="ios-heart" />
                  : <Ionicons
                      size={20}
                      color="#B2B2B2"
                      name="ios-heart-empty"
                    />}
                <Text style={{color: '#B2B2B2', paddingLeft: 5}}>
                  {this.state.likes}
                </Text>
              </View>
            </Touchable>
            <Touchable
              onPress={() => {
                if (this.state.reported) {
                  this.setState({reports: this.state.reports - 1});
                } else {
                  this.setState({reports: this.state.reports + 1});
                }
                this.setState({reported: !this.state.reported});
                this.props.report();
              }}
              style={{flex: 1}}
            >

              <View style={{flex: 1, flexDirection: 'row'}}>
                {this.state.reported
                  ? <MaterialCommunityIcons
                      size={20}
                      color="#6F6E6F"
                      name="flag"
                    />
                  : <MaterialCommunityIcons
                      size={20}
                      color="#B2B2B2"
                      name="flag"
                    />}
                <Text style={{color: '#B2B2B2', paddingLeft: 5}}>
                  {this.state.reports}
                </Text>
              </View>
            </Touchable>
          </View>

        </View>
        {this.state.replying
          ? (

            <View style={{padding: 10}}>
              <Reply  send={() => {this.send()}} o={this} addComment={(txt) => this.setState({myComment2:txt})} myComment={this.state.myComment2}  />
              {
                this.state.replies.map(item => {
                 return <SingleReply
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
       item={item}/>;
                })
              }


            </View>
          )

          : (<View />)



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


export default connect(mapStateToProps, mapDispatchToProps)(Post);
