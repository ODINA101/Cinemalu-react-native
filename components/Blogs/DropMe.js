/* @flow */

import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Vector from '../assets/VectorDown.png';
import PlatformTouchable from 'react-native-platform-touchable';
export default class DropMe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list:[],
      toggle:false
    };

    switch (props.type) {
    case 'tags':
        this.state.list = props.data.tags
        break;
     default:
        this.state.list = []
    }
  }

  render() {
    return (
      <View>
        <View style={styles.container}>
          <View style={{flex: 1, justifyContent: 'center', paddingLeft: 20}}>
            <Text style={{fontSize: 18, color: '#E7A842'}}>
              {this.props.value}
            </Text>
          </View>
          <PlatformTouchable
           onPress={()=>this.setState({toggle:!this.state.toggle})}
            style={{width: 80, justifyContent: 'center', alignItems: 'center'}}
          >
            <Image
              source={Vector}
              style={{marginTop: 5, width: 20, resizeMode: 'contain'}}
            />
          </PlatformTouchable>

        </View>
        {
          this.state.toggle?(
            <View>
        {

          this.state.list.map(item => {
            return (
          <View>
        <View style={{backgroundColor: '#2D2D2D', height: 40,paddingLeft:15}}>
          <Text style={{color:"#FFF",fontSize:18}}>{item}</Text>
        </View>
        <View style={{height:1,backgroundColor:"#E7A842"}}/>
        </View>
            )
          })
        }
          </View>
      ):(
        <View />
      )
        }

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    height: 50,
    backgroundColor: '#2D2D2D',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
