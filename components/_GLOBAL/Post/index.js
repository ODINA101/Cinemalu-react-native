/* @flow */

import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
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
export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likedByMe: this.props.liked,
      likes: this.props.item.userLikes.length,
      reported: this.props.reported,
      reports: this.props.item.userAbuses.length,
    };
    console.log(props);
  }

  openProfile() {
    this.props.nav.navigate('UserProfile', {id: this.props.item.createdBy._id});
  }

  render() {
    return (
      <MenuProvider>
        <View style={{padding: 10, flexDirection: 'column', minHeight: 100}}>
          <View style={{flexDirection: 'row', flex: 1}}>

            <View style={{flex: 1}}>
              <Touchable
                onPress={() => {
                  if(!this.props.ProfilePage) {
                    this.openProfile();
                  }
                }}
              >
                <ProfilePic item={this.props.item} />
              </Touchable>
            </View>

            <View style={{flex: 5}}>

              <Text>
                <Text   onPress={() => {
                  if(!this.props.ProfilePage) {
                    this.openProfile();
                  }
                }}
               style={{fontWeight: 'bold', color: '#000', fontSize: 16}}>
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

              {this.props.item.shared
                ? <View style={{flexDirection: 'row', flex: 1, paddingTop: 10}}>
                    <View style={{flex: 1}}>
                      <ProfilePic item={this.props.item} />
                    </View>
                    <View style={{flex: 5}}>
                      <Text>

                        <Text
                                                  style={{fontWeight: 'bold', fontSize: 16}}
                        >
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
            <View style={{flex: 0.6, alignItems: 'flex-end'}}>
             {
           !this.props.ProfilePage?(
             <Menu
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
                           <MenuOptions>
                             <MenuOption value={1} text="Edit" />
                             <MenuOption value={2} text="Delete" />
                           </MenuOptions>
                         </Menu>


           ):(<View />)

             }
                        </View>

          </View>
          <View style={{flex: 0.3, flexDirection: 'row'}}>

            <View style={{flex: 1}} />
            <View style={{flex: 5, flexDirection: 'row', paddingTop: 10}}>

              <View style={{flex: 1, flexDirection: 'row'}}>
                <MaterialCommunityIcons
                  size={20}
                  color="#B2B2B2"
                  name="message-reply-text"
                />
                <Text style={{color: '#B2B2B2', paddingLeft: 5}}>0</Text>
              </View>
              {this.props.item.shared
                ? <View />
                : <Touchable
                    style={{flex: 1}}
                    onPress={() => this.props.share()}
                  >
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <MaterialCommunityIcons
                        size={20}
                        color="#B2B2B2"
                        name="reply"
                        style={{transform: [{scaleX: -1}]}}
                        flip={'horizontal'}
                      />
                      <Text style={{color: '#B2B2B2', paddingLeft: 5}}>0</Text>
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
        </View>
      </MenuProvider>
    );
  }
}
