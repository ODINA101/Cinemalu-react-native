/* @flow */

import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import Toolbar from '../_GLOBAL/toolbar';
import Post from '../_GLOBAL/Post';
import Touchable from 'react-native-platform-touchable';
import SingleMovie from '../singleMovie';
import GridView from 'react-native-super-grid';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from "../Actions"
 class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {
        interestedMovies: [],
      },
      posts: [],
      postCount: 1,
      cannotLoad: false,
      followedMovies: [],
    };

    axios
      .get(
        'http://cinemaluapi-test.us-east-1.elasticbeanstalk.com/api/users/movies/' +
          this.props.navigation.state.params.id,
          {
            headers: {
              Authorization: 'Bearer ' +
                this.props.redux.Auth.token,
            },
          }
      )
      .then(res => {
        this.setState({followedMovies: res.data});
        console.log(res.data);

      });

    axios
      .get(
        'http://cinemaluapi-test.us-east-1.elasticbeanstalk.com/api/users/' +
          this.props.navigation.state.params.id,
      )
      .then(res => {
        this.setState({info: res.data});
        console.log(this.state.info);
      });

    axios
      .get(
        'http://cinemaluapi-test.us-east-1.elasticbeanstalk.com/api/users/posts/' +
          this.props.navigation.state.params.id +
          '/0/1/',
      )
      .then(res => {
        this.setState({posts: res.data});
        console.log(res.data);
      });
  }

  loadMore() {
    axios
      .get(
        'http://cinemaluapi-test.us-east-1.elasticbeanstalk.com/api/users/posts/' +
          this.props.navigation.state.params.id +
          '/0/' +
          this.state.postCount +
          1 +
          '/',
      )
      .then(res => {
        console.log(res.data[res.data.length - 1]);
        console.log(this.state.posts[this.state.posts.length - 1]);
        if (
          res.data[res.data.length - 1]._id ==
          this.state.posts[this.state.posts.length - 1]._id
        ) {
          this.setState({cannotLoad: true});
          console.log('yeeeap');
        } else {
          this.setState({posts: res.data, postCount: this.state.postCount + 1});
        }
      });
  }



loadSame() {
  axios
  .get(
    'http://cinemaluapi-test.us-east-1.elasticbeanstalk.com/api/users/posts/' +
      this.props.navigation.state.params.id +
      '/0/' +
      this.state.postCount +
      '/',
  )
  .then(res => {
    console.log(res.data[res.data.length - 1]);
    console.log(this.state.posts[this.state.posts.length - 1]);

      this.setState({posts: res.data});
  });

}


    postReport(id, isReported) {
      let p = this;
      this.props.actions.ReportPost(id, isReported,this.props.redux.Auth.token, function() {
       console.log("reported")
      });
    }
    postLike(id) {
      this.props.actions.LikePost(id,this.props.redux.Auth.token,function() {console.log("liked")});
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
                this.loadSame()

                })
      }
    }

  render() {
    return (
      <View style={styles.container}>
        <Toolbar nav={this.props.navigation} />
        <ScrollView style={{flex: 1}}>
          <View style={{height: 400, backgroundColor: '#f8f8f8'}}>
            <View
              style={{
                flex: 1.3,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {this.state.info.profilePicture? <ImageBackground
                    source={{
                      uri: this.state.info.profilePicture.url,
                    }}
                    style={{
                      width: 120,
                      height: 120,
                      backgroundColor: '#C6C6C6',
                    }}
                  />
                : <ImageBackground
                    source={{
                      uri: 'https://cinemalu.com/assets/images/img-not-found.png',
                    }}
                    style={{
                      width: 120,
                      height: 120,
                      backgroundColor: '#C6C6C6',
                    }}
                  />}

            </View>
            <View style={{flex: 1}}>
              <Text style={{fontSize: 26, color: '#354052', paddingLeft: 35}}>
                {this.state.info.firstName} {this.state.info.lastName}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  color: '#363636',
                  paddingLeft: 35,
                  fontWeight: '700',
                }}
              >
                @{this.state.info.loginID}
              </Text>

            </View>

            <View style={{flex: 1, flexDirection: 'row'}}>

              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >

                <View style={{alignItems: 'center'}}>
                  <Text
                    style={{color: '#f1a61f', fontSize: 30, fontWeight: '500'}}
                  >
                    {this.state.info.sharesCount}
                  </Text>
                  <Text style={{color: '#bababa', fontSize: 14}}>Shares</Text>
                </View>

              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >

                <View style={{alignItems: 'center'}}>
                  <Text
                    style={{color: '#f1a61f', fontSize: 30, fontWeight: '500'}}
                  >
                    {this.state.info.thoughtsCount}
                  </Text>
                  <Text style={{color: '#bababa', fontSize: 14}}>Thoughts</Text>
                </View>

              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >

                <View style={{alignItems: 'center'}}>
                  <Text
                    style={{color: '#f1a61f', fontSize: 30, fontWeight: '500'}}
                  >
                    {this.state.info.followedCount}
                  </Text>
                  <Text style={{color: '#bababa', fontSize: 14}}>
                    Following
                  </Text>
                </View>

              </View>

            </View>

          </View>

          <View
            style={{
              height: 45,
              backgroundColor: '#4a4a4a',
              justifyContent: 'center',
            }}
          >
            <Text style={{color: '#FFF', fontSize: 15, padding: 20}}>
              ACTIVITY
            </Text>
          </View>

          {this.state.posts.map(item => {
            return (
              <Post
                ProfilePage
                MovieName={item.movie.name}
                nav={this.props.navigation}
                share={() =>
                  this.setState({sharingItem: item, showShareModal: true})}
                liked={item.userLikes.includes('5babc3e0a7f76013867020ce')}
                reported={item.userAbuses.includes('5babc3e0a7f76013867020ce')}
                like={() => this.postLike(item._id)}
                report={() =>
                  this.postReport(
                    item._id,
                    item.userAbuses.includes('5babc3e0a7f76013867020ce'),
                  )}
                action={e => this.onPostAction(e, item)}
                item={item}
              />
            );
          })}

          {this.state.posts == []
            ? <View
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

              </View>
            : <View />}

          {!this.state.cannotLoad
            ? <View style={{height: 40, alignItems: 'center'}}>
                <Touchable onPress={() => this.loadMore()}>
                  <Text style={{textDecorationLine: 'underline'}}>
                    See More
                  </Text>
                </Touchable>
              </View>
            : <View />}

          <View
            style={{
              height: 45,
              backgroundColor: '#4a4a4a',
              justifyContent: 'center',
            }}
          >
            <Text style={{color: '#FFF', fontSize: 15, padding: 20}}>
              FOLLOWING MOVIES
            </Text>
          </View>
          <View style={{flex: 1, backgroundColor: '#6F6F6F'}}>

            <GridView
              itemDimension={150}
              items={this.state.followedMovies}
              renderItem={item => (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <SingleMovie
                   ProfilePage
                    onFollow={data =>
                      this.props.actions.MovieFollow(item._id,data,this.props.redux.Auth.token)}
                    nav={this.props.navigation}
                    item={item}
                  />
                </View>
              )}
            />

          </View>

        </ScrollView>
      </View>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
