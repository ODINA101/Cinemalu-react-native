/* @flow */

import React, {Component} from 'react';
import {View, Text, StyleSheet,CheckBox} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from "../Actions"




class AccountInfo extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.lan)
    console.log(this.props.lan)
    console.log(this.props.lan)
    this.state = {
         languages:[],
         emailWhenSomeoneBlocksMe:this.props.info.emailWhenSomeoneBlocksMe,
         emailWhenSomeoneReportPost:this.props.info.emailWhenSomeoneReportPost,
         emailWhenSomeoneRespondsMyPost:this.props.info.emailWhenSomeoneRespondsMyPost,
         subscribeMonthlyNewsletter:this.props.info.subscribeMonthlyNewsletter,
         subscribeNewReleases:this.props.info.subscribeNewReleases,
         info:{
           languages:[]
         },
         pinfo:{}
    }




console.log(this.props.lan)
  }

UpdateInfo() {
  this.props.actions.UpdateAccountInfo({languages:this.state.languages,pinfo:this.state.pinfo},this.props.redux.Auth.token)
  this.props.closeEdit()
}

setInfo(data,type) {
  if(type) {
    if(type=="spec") {
        this.setState({info:data})
  }else{
    this.setState({pinfo:data})
    this.setState({languages:data.languages})
  }
 }

  }

componentWillReceiveProps() {
console.log(this.props.info)
}
componentDidMount() {
  //this.setState({languages:this.props.lan})
  this.props.onRef(this)
}
removeA(arr) {
      var what, a = arguments, L = a.length, ax;
      while (L > 1 && arr.length) {
          what = a[--L];
          while ((ax= arr.indexOf(what)) !== -1) {
              arr.splice(ax, 1);
          }
      }
      return arr;
  }
checkLanguage(name) {
  if(this.state.languages.includes(name)){
  return true;
 }else{
  return false;
 }
}

checkmark() {

if(!this.props.AccountEditing) {
  return (
<View style={{flex: 1, paddingLeft: 5, justifyContent: 'center'}}>
<Ionicons name="ios-checkmark-circle" color="#efa533" size={30} />
</View>
  )
}else {
  return (<View />)
}

}



  render() {
    return (
      <View style={{padding: 15, flexDirection: 'row'}}>
        <View style={{flex: 1, flexDirection: 'column'}}>
          <View
            style={{flex: 1, alignItems: 'flex-start', flexDirection: 'row'}}
          >
            <Text style={{color: '#000', fontWeight: '700', fontSize: 17}}>
              Languages
            </Text>
          </View>
          {
            this.state.info.languages.map(item => {
              console.log(this.state.languages)
            return (
              <View style={{flexDirection: 'row', marginTop: 20}}>
              {
                this.props.AccountEditing?(
                  <View  style={{flex: 0.3, justifyContent: 'center'}}>
                <CheckBox value={this.state.languages.includes(item._id)}
                onValueChange={(e) => {
                  let isChecked = e;
                  console.log(item.name + e)
                  console.log(this.state.languages)

                   if(isChecked) {
                     this.state.languages.push(item._id)
                     this.setState({languages:this.state.languages})
                   }else{
                     this.removeA(this.state.languages,item._id)
                     this.setState({languages:this.state.languages})
                       console.log(this.state.languages)

                   }
                }}/>
                </View>

):(<View/>)
              }
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <Text
                    style={{fontSize: 14, color: '#989da7', fontWeight: '700'}}
                  >
                    {item.name}
                  </Text>

                </View>
                {
                  this.checkLanguage(item._id)?(
                    this.checkmark()
                  ):(<View />)
                }
              </View>
            );
          })

         }

        </View>

        <View style={{flex:1, flexDirection: 'column',justifyContent: 'flex-start'}}>
          <View
            style={{ alignItems: 'flex-start', flexDirection: 'row'}}
          >
            <Text style={{color: '#000', fontWeight: '700', fontSize: 17}}>
              Notifications
            </Text>

          </View>



          <View style={{flexDirection: 'row',marginTop:20}}>
          {
          this.props.AccountEditing?(

          <View  style={{flex: 1, justifyContent: 'center'}}>
            <CheckBox value={this.state.pinfo.emailWhenSomeoneRespondsMyPost} onValueChange={(e) => {
              let pf = this.state.pinfo;
              pf.emailWhenSomeoneRespondsMyPost = e;
              this.setState({pinfo:pf})
            }}/>
            </View>
          ):(<View />)
          }
            <View style={{flex: 4, justifyContent: 'center'}}>
              <Text style={{color: '#989da7', fontSize: 14}}>
                {' '}Email me when someone responds to my posts{' '}
              </Text>
            </View>
             {
               this.state.pinfo.emailWhenSomeoneRespondsMyPost?(
                 this.checkmark()

                 ):(<View/>)
             }

          </View>



          <View style={{flexDirection: 'row',marginTop:20}}>
          {
this.props.AccountEditing?(

<View  style={{flex: 1, justifyContent: 'center'}}>
            <CheckBox value={this.state.pinfo.subscribeMonthlyNewsletter} onValueChange={(e) => {

              let pf = this.state.pinfo;
              pf.subscribeMonthlyNewsletter = e;
              this.setState({pinfo:pf})

            }}/>
</View>
):(<View />)
}

            <View style={{flex: 4, justifyContent: 'center'}}>
              <Text style={{color: '#989da7', fontSize: 14}}>
                {' '} Receive the monthly cinemalu newsletter {' '}
              </Text>
          </View>

            {
    this.state.pinfo.subscribeMonthlyNewsletter?(
      this.checkmark()

      ):(<View/>)
           }


          </View>



          <View style={{flexDirection: 'row',marginTop:20}}>
          {
this.props.AccountEditing?(

<View  style={{flex: 1, justifyContent: 'center'}}>
            <CheckBox value={this.state.pinfo.subscribeNewReleases} onValueChange={(e) => {
              let pf = this.state.pinfo;
               pf.subscribeNewReleases = e;
              this.setState({pinfo:pf})

            }}/>
</View>
):(<View />)
}

            <View style={{flex: 4, justifyContent: 'center'}}>

              <Text style={{color: '#989da7', fontSize: 14}}>
                {' '} Receive posts about new cinemalu features {' '}
              </Text>
            </View>

            {
       this.state.pinfo.subscribeNewReleases?(
         this.checkmark()
      ):(<View/>)
             }


          </View>



          <View style={{flexDirection: 'row',marginTop:20}}>
          {
this.props.AccountEditing?(

<View  style={{flex: 1, justifyContent: 'center'}}>
            <CheckBox value={this.state.pinfo.emailWhenSomeoneBlocksMe} onValueChange={(e) => {
              let pf = this.state.pinfo;
              pf.emailWhenSomeoneBlocksMe = e;
              this.setState({pinfo:pf})


            }}/>
</View>
):(<View />)
}

            <View style={{flex: 4, justifyContent: 'center'}}>
              <Text style={{color: '#989da7', fontSize: 14}}>
                {' '}Email me when someone blocks me{' '}
              </Text>
            </View>



              {
          this.state.pinfo.emailWhenSomeoneBlocksMe?(
            this.checkmark()

            ):(<View/>)

        }


          </View>


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

export default connect(mapStateToProps, mapDispatchToProps)(AccountInfo);
