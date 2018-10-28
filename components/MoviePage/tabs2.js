/* @flow */

import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
const Tabs = ['Fans', 'Makers', 'Events'];
import Touchable from 'react-native-platform-touchable';
export default class TabsT extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: 'Fans',
    };
  }
  render() {
    return (
      <View style={{flexDirection: 'row', height: 65, backgroundColor: '#FFF'}}>

        <Touchable onPress={()=>{
          this.setState({active:"Fans"})
          this.props.onTabClick("Fans")
        }}
          style={{
            flex: 1,
            borderBottomColor: '#EBA436',
            paddingLeft: 15,
            backgroundColor: this.state.active=='Fans'?('#f8f8f8'):('#FFF'),
          }}
        >
        <View style={{flex:1}}>

          <View
            style={{
              flex: 2,
              justifyContent: 'flex-end',
              alignItems: 'flex-start',
            }}
          >
            <Text style={{fontSize: 18, color: '#4a4a4a', fontWeight: '450'}}>
              Fans
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'flex-start',
            }}
          >
            {this.state.active == 'Fans'
              ? <View
                  style={{
                    height: 6,
                    borderRadius: 10,
                    backgroundColor: '#EBA436',
                    width: 28,
                  }}
                />
              : <View />}
          </View>
          </View>
        </Touchable>

        <Touchable  onPress={()=> {
          this.setState({active:"Makers"})
          this.props.onTabClick("Makers")

      }} style={{flex: 1,backgroundColor: this.state.active=='Makers'?('#f8f8f8'):('#FFF'), borderBottomColor: '#EBA436', paddingLeft: 15}}>
          <View style={{flex:1}} >
          <View
            style={{
              flex: 2,
              justifyContent: 'flex-end',
              alignItems: 'flex-start',
            }}
          >
            <Text style={{fontSize: 18, color: '#6f6f70', fontWeight: '450'}}>
              Makers
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'flex-start',
            }}
          >
            {this.state.active == 'Makers'
              ? <View
                  style={{
                    height: 6,
                    borderRadius: 10,
                    backgroundColor: '#EBA436',
                    width: 28,
                  }}
                />
              : <View />}
          </View>
        </View>
        </Touchable>


        <Touchable  onPress={()=> {
          this.setState({active:"Events"})
           this.props.onTabClick("Events")
          }} style={{flex: 1, backgroundColor: this.state.active=='Events'?('#f8f8f8'):('#FFF'),borderBottomColor: '#EBA436', paddingLeft: 15}}>
        <View style={{flex:1}}>
          <View
            style={{
              flex: 2,
              justifyContent: 'flex-end',
              alignItems: 'flex-start',
            }}
          >
            <Text style={{fontSize: 18, color: '#6f6f70', fontWeight: '450'}}>
              Events
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'flex-start',
            }}
          >
            {this.state.active == 'Events'
              ? <View
                  style={{
                    height: 6,
                    borderRadius: 10,
                    backgroundColor: '#EBA436',
                    width: 28,
                  }}
                />
              : <View />}
          </View>
          </View>
        </Touchable>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
