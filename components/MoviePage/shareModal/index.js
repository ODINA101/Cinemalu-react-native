/* @flow */

import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Image,
  ActivityIndicator,
  TextInput,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView
} from 'react-native';
import Modal from 'react-native-modal';
import ProfilePic from '../profilePic';
import Textarea from 'react-native-textarea';
import AutoHeightImage from 'react-native-auto-height-image';
import Touchable from 'react-native-platform-touchable';
export default class ShareModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myComment: '',
    };
  }
  render() {
    return (
      <Modal
        transparent={true}
        useNativeDriver={true}
        isVisible={this.props.showShareModal}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        onBackdropPress={() => this.props.dismiss()}
        onBackButtonPress={() => this.props.dismiss()}
        style={{justifyContent: 'flex-start'}}
      >
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              marginTop: Dimensions.get('window').width / 5,
              height: 440,
              width: Dimensions.get('window').width / 1.1,
              borderRadius: 12,
              backgroundColor: '#FFF',
            }}
          >
            <View
              style={{
                padding: 8,
                height: 50,
                borderTopRightRadius: 12,
                borderTopLeftRadius: 12,
                backgroundColor: '#ebebeb',
              }}
            >
              <Text style={{color: '#000', fontSize: 20, fontWeight: '400'}}>
                Share
              </Text>

            </View>
            <View style={{flex: 1, padding: 12}}>
            <ScrollView >
            <KeyboardAvoidingView enabled={false}>

              <Textarea
                containerStyle={{
                  height: 150,
                  borderWidth: 1,
                  borderColor: '#bababa',
                }}
                onChangeText={t => {
                  this.setState({myComment: t});
                }}
                defaultValue={this.state.myComment}
                maxLength={150}
                placeholder={'Comment on this movie...'}
                placeholderTextColor={'#c7c7c7'}
                underlineColorAndroid={'transparent'}
              />
              </KeyboardAvoidingView>

              <View style={{zIndex:9999,position: 'absolute', top: 130, left: 20}}>
                <ProfilePic item={this.props.item} />
              </View>

                <View style={{paddingTop:30}}>
                          <Text>
                            <Text style={{fontWeight: 'bold', color: '#000', fontSize: 16}}>
                              {this.props.item.createdBy?(this.props.item.createdBy.firstName):("")}
                            </Text>
                            {' '}
                            {' '}
                            {this.props.item.text}
                          </Text>
                           {
                             this.props.item.media?(
                               <AutoHeightImage  width={Dimensions.get("window").width/1.5} source={{uri:this.props.item.media.url}} />

                             ):(<View/>)
                           }
                 </View>

              </ScrollView>
              <View style={{height:50,flexDirection: 'row',alignItems: 'center',justifyContent: 'flex-end',borderTopWidth:1,borderColor: "#e9ecef"}}>
              <Touchable
                                  onPress={() => {
                                    this.props.dismiss();
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
                                    marginRight:20
                                  }}
                                >
                                  <Text>Cancel</Text>
                                </Touchable>
              <Touchable
                                  onPress={() => {
                                    this.props.share(this.props.item._id,this.state.myComment);
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
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
