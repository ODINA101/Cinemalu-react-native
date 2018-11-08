import React, {Component} from 'react';
import {View} from 'react-native';
import TabNav from './TabNav';
import MainScreen from './MainScreen';
import CalendarPage from './CalendarComponents';
import Account from './Account';
import MyAccount from './MyAccount';
import Notifications from "./Notifications"
import {connect} from 'react-redux';
import * as Actions from './Actions';
import {bindActionCreators} from 'redux';
import date from 'date-and-time';




class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 'Movies',
      loggedIn:false,
      notifications:[],
      notRead:0,
      registering:false
    };




    this.tabChange = this.tabChange.bind(this);
    //this.props.red();
    console.log(this.props);
    let p = this;
    this.props.actions.getUserToken(function(data) {
      p.props.actions.GetAllMovies(data);
      if(data !== null && data !== "") {
        p.setState({loggedIn:true})
        setInterval(()=>{
          p.props.actions.getNotifications(p.props.redux.Auth.token,function(notdata) {
            //alert(notdata[0])
             p.setState({notifications:notdata})
             p.notComp.getAllNots(notdata)
            })

        },2000)

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
        return <MainScreen gotoLoginPage={() => this.setState({page:"Account"})} gotoRegPage={() => {
          this.setState({registering:true})
          this.setState({page:"Account"})
         }} loggedIn={this.state.loggedIn} nav={this.props.navigation} />;
      case 'Calendar':
        return <CalendarPage nav={this.props.navigation} />;
      case 'Notification':
        return <Notifications onRef={(ref)=> this.notComp = ref} nots={this.state.notifications} nav={this.props.navigation}/>
      case 'Account':
         if(this.state.loggedIn) {
           return <MyAccount  onLogout={()=>this.setState({loggedIn:false})} nav={this.props.navigation} />;
         }else{
           return <Account onLoginPage={()=>{this.setState({registering:false})}} registering={this.state.registering} onLogSuccess={() => this.setState({loggedIn:true})} nav={this.props.navigation} />;
         }
      default:
        return <MainScreen nav={this.props.navigation} />;
    }
  }
  render() {
    return (
      <View style={{flex: 1}}>
        {this.rend()}
        <TabNav onRef={(ref) => this.Tabs = ref} nots={this.state.notifications} onTabClick={item => this.tabChange(item)} />

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
