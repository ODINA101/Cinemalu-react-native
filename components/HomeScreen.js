import React, {Component} from 'react';
import {View} from 'react-native';
import TabNav from './TabNav';
import MainScreen from './MainScreen';
import CalendarPage from './CalendarComponents';
import Account from './Account';
import MyAccount from './MyAccount';

import {connect} from 'react-redux';
import * as Actions from './Actions';
import {bindActionCreators} from 'redux';

class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 'Calendar',
      loggedIn:false
    };
    this.tabChange = this.tabChange.bind(this);
    //this.props.red();
    console.log(this.props);
    let p = this;
    this.props.actions.getUserToken(function(data) {
      p.props.actions.GetAllMovies(data);
      if(data !== null && data !== "") {
        p.setState({loggedIn:true})
      }
    });
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.nowPlayingMovies && nextProps.popularMovies) {
  //     this.setState({ isLoading: false });
  //   }
  // }
  //
  tabChange(item) {
    this.setState({page: item.name});
    console.log(item.name);
  }

  rend() {
    switch (this.state.page) {
      case 'Movies':
        return <MainScreen nav={this.props.navigation} />;
      case 'Calendar':
        return <CalendarPage nav={this.props.navigation} />;
      case 'Account':
         if(this.state.loggedIn) {
           return <MyAccount onLogout={()=>this.setState({loggedIn:false})} nav={this.props.navigation} />;

         }else{
           return <Account onLogSuccess={() => this.setState({loggedIn:true})} nav={this.props.navigation} />;

         }
      default:
        return <MainScreen nav={this.props.navigation} />;
    }
  }
  render() {
    return (
      <View style={{flex: 1}}>
        {this.rend()}
        <TabNav onTabClick={item => this.tabChange(item)} />

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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
