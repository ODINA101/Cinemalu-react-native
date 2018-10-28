/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Post from '../_GLOBAL/Post';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from '../Actions';

class Makers extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data:[]
    }

  let p = this;
  this.props.actions.GetPosts(this.props.movieId,true,this.props.redux.Auth.token,function(data) {
    console.log(data)
    console.log(data)
    console.log(data)
    console.log(data)
    console.log(data)
    console.log(data)
    console.log(data)
    p.setState({data})
  })



  }
  render() {
    return (
      <View style={styles.container}>


      {
        this.state.data.map(item => {
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
           like={() => this.props.postLike(item._id)}
           report={() =>
             this.props.postReport(
               item._id,
               item.userAbuses.includes('5babc3e0a7f76013867020ce'),
             )}
           action={e => this.props.onPostAction(e, item)}
           item={item}
         />
         <View style={{backgroundColor: '#B0AFB2', height: 2}} />
       </View>
     );
    })
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



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Makers);
