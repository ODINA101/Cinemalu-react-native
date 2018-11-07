import React, {Component} from 'react';
import {
  View,
  Dimensions,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather'; // Version can be specified in package.json
import MovieTabs from './MovieTabs';
const SCREEN_WIDTH = Dimensions.get('window').width;
import SingleMovie from './singleMovie';
import GridView from 'react-native-super-grid';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from './Actions';
import MyMovies from './MyMovies';
import {AsyncStorage} from 'react-native';

const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 20;
  return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom;
};

class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      offsetY: 6,
      loading: false,
      selected: 'key0',
      loggedIn: false,
    };

    let p = this;




    // this.props.actions.getUserToken(function(data) {
    //   console.log(data);
    //   if (data !== null) {
    //     p.setState({loggedIn: true});
    //   }
    // });
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#393636'}}>
        <View
          style={{
            flexDirection: 'row',
            height: 70,
            elevation: 5,
            backgroundColor: '#393636',
            alignItems: 'center',
            paddingLeft: 10,
          }}
        >

          <Feather size={25} color="#FFF" name="search" />
          <TextInput
            style={{color: '#FFF'}}
            onChangeText={e => {
              this.props.actions.Search(e);
            }}
            placeholder="Search"
            placeholderTextColor="#F3F3F3"
          />
        </View>
        <ScrollView
          style={{flex: 1}}
          onScroll={({nativeEvent}) => {
            let parent = this;

            if (isCloseToBottom(nativeEvent)) {
              if (!this.state.loading) {
                this.setState({offsetY: this.state.offsetY + 6, loading: true});
                setTimeout(
                  () => {
                    console.log(this.props.actions);
                    this.props.actions.ALLMOVIESLOADMORE(
                      this.state.offsetY,
                      this.props.redux.Auth.token,
                      function() {
                        parent.setState({loading: false});
                      },
                    );
                  },
                  1000,
                );
              }
            }
          }}
        >

          <View
            style={{
              width: SCREEN_WIDTH,
              height: 50,
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 20,
            }}
          >
            <MovieTabs
              selected={data => {
                this.setState({selected: data});
              }}
            />
          </View>
          {this.state.selected == 'key0'
            ? this.props.redux.Database.allMovies.length
                ? <View style={{marginTop: 50}}>

                    <GridView
                      itemDimension={150}
                      items={this.props.redux.Database.allMovies}
                      renderItem={item => (
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <SingleMovie
                            onFollow={data =>
                              this.props.actions.MovieFollow(item._id, data,this.props.redux.Auth.token)}
                            nav={this.props.nav}
                            item={item}
                          />
                        </View>
                      )}
                    />

                    {this.state.loading
                      ? <ActivityIndicator size="small" color="#00ff00" />
                      : <View />}
                  </View>
                : <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 500,
                    }}
                  >
                    <ActivityIndicator size="large" color="#00ff00" />
                  </View>
            : <MyMovies />}

        </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
