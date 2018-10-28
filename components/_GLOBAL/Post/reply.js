/* @flow */

import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Textarea from 'react-native-textarea';
import Touchable from 'react-native-platform-touchable';
import MaterialCommunityIcons
  from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-picker';

export default class Reply extends Component {
  render() {
    return (
      <View style={{height: 300, backgroundColor: '#FFF'}}>
        <View style={{flex: 0.3, padding: 20}}>

          <View
            style={{
              width: 35,
              height: 35,
              backgroundColor: '#f1a61f',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >

            <Text style={{color: '#FFF', fontWeight: 'bold', fontSize: 18}}>
              BS
            </Text>

          </View>

        </View>

        <View style={{flex: 2, padding: 20}}>
          <Textarea
            containerStyle={{
              height: 150,
              borderWidth: 1,
              borderColor: '#bababa',
            }}
            onChangeText={t => {
              this.props.addComment(t)
            }}
          defaultValue={this.props.myComment}
            maxLength={150}
            placeholder={'Comment on this movie...'}
            placeholderTextColor={'#c7c7c7'}
            underlineColorAndroid={'transparent'}
          />

          <View style={{flexDirection: 'row', paddingTop: 5}}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Touchable
                onPress={() => {
                  ImagePicker.showImagePicker(response => {
                    console.log('Response = ', response);

                    if (response.didCancel) {
                      console.log('User cancelled image picker');
                    } else if (response.error) {
                      console.log('ImagePicker Error: ', response.error);
                    } else if (response.customButton) {
                      console.log(
                        'User tapped custom button: ',
                        response.customButton,
                      );
                    } else {
                      const source = {uri: response.uri};
                      const file = {
                        uri: response.uri, // e.g. 'file:///path/to/file/image123.jpg'
                        name: response.uri.split('/')[
                          response.uri.split('/').length - 1
                        ], // e.g. 'image123.jpg',
                        type: response.type, // e.g. 'image/jpg'
                      };

                      this.props.o.setState({image: file});

                      // You can also display the image using data:
                      // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                      console.log(file);
                      //  const body = new FormData()
                      // body.append('file', file)

                      this.props.o.setState({
                        avatarSource: source,
                      });
                    }
                  });
                }}
              >
                <MaterialIcons size={25} name="photo" color="#6F6F6F" />
              </Touchable>

            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
              }}
            >

              <Touchable
                onPress={() => {
                  this.props.send();
                }}
                style={{
                  width: 60,
                  height: 30,
                  backgroundColor: '#ebedee',
                  color: '#4a4a4a',
                  justifyContent: 'center',
                  borderWidth: 1,
                  borderColor: '6f6f70',
                  alignItems: 'center',
                }}
              >
                <Text>Send</Text>
              </Touchable>

            </View>

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
