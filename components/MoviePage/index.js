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
  KeyboardAvoidingView,
  Animated,

} from 'react-native';
import Toolbar from '../_GLOBAL/toolbar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import Tabs from './tabs';
import TabsT from './tabs2';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from '../Actions';
import Post from '../_GLOBAL/Post';
import Reply from '../_GLOBAL/Post/reply';

import MaterialCommunityIcons
  from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import picker from "react-native-picker-select"

import {MenuProvider} from 'react-native-popup-menu';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Touchable from 'react-native-platform-touchable';
import EmojiSelector from 'react-native-emoji-selector';
import ImagePicker from 'react-native-image-picker';
import Loader from 'react-native-modal-loader';
import Modal from 'react-native-modal';
import ShareModal from './shareModal';
import R from 'ramda';
import Makers from "./Makers"
import Events from "./events"
import Ad from "./Ads"
let kku = 0;

import Textarea from 'react-native-textarea';
class MoviePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      info: {},
      cover: '',
      myComment: '',
      editing: false,
      postId: '',
      itemId: '',
      emojies: false,
      image: null,
      isLoading: false,
      showShareModal: false,
      sharingItem: '',
      Tab:"Fans",
      loggedIn:props.redux.Auth.loggedInUser?(true):(false),
      visible: true,
      x: new Animated.Value(120),
    };
    this.AdsToPosts = this.AdsToPosts.bind(this)
    let item = this.props.navigation.state.params.info;
    let p = this;
    console.log(item.id);
    this.state.itemId = item.id;
    this.props.actions.GetMovieInfo(item._id,this.props.redux.Auth.token,function(details,err) {
      //console.log(details.media.url);

      p.setState({info: details, cover: details.media.url});


    });
   //console.log(this.props.navigation.state.params.postID)
    //  console.log(this.props.navigation.state.params.postID)

    this.handleLayoutChange = this.handleLayoutChange.bind(this);

    this.props.actions.GetPosts(item._id, false,this.props.redux.Auth.token,function(data) {

      p.setState({data});
      p.props.actions.getAds(function(dat) {

          p.AdsToPosts(dat)

       })

    });

    this.send = this.send.bind(this);
  }




  handleLayoutChange() {

      this.feedPost.measure( (fx, fy, width, height, px, py) => {
  console.log('Component width is: ' + width)
  console.log('Component height is: ' + height)
  console.log('X offset to page: ' + px)
  console.log('Y offset to page: ' + py)
  if(kku == 0) {
    kku = py;
    this.scroller.scrollTo({x: 0, y:py});

  }else{
    this.scroller.scrollTo({x: 0, y:kku});

  }
  })


    }

AdsToPosts(adss) {
  const integrateAdsToPosts = (posts,ads) => {
 let res = [];
 let adsPerf = [];
  let num = -1;
  for(var i =0;i<posts.length;i++) {
         num++;
        if(ads[num] == undefined) {
        num = 0;
         adsPerf.push(ads[num])

         }else{
          adsPerf.push(ads[num])
         }

  }



   posts.forEach((item,ind) => {
       // console.log(ind%5)
       if(ind == 0) {

             res.push(item)
       }else{
        if((ind%5) == 0) {
             res.push(adsPerf[ind/5])
             res.push(item)
        }else{
             res.push(item)
        }
       }

 })

 return res;
}


let posts = this.state.data;
let ads = adss;


console.log(integrateAdsToPosts(posts,ads))
console.log(integrateAdsToPosts(posts,ads))
this.setState({data:integrateAdsToPosts(posts,ads)})
//console.log(posts)
}




  send() {
    this.setState({isLoading: true});
    let p = this;
    let item = this.props.navigation.state.params.info;
    let formData = new FormData();
    formData.append('text', this.state.myComment);
    console.log(formData);
    formData.append('file', this.state.image);

    this.setState({myComment: ''});

    if (this.state.editing) {
      p.props.actions.EditPost(this.state.postId,this.state.myComment,this.props.redux.Auth.token,function() {
        p.props.actions.GetPosts(p.state.info._id, false,p.props.redux.Auth.token,function(data) {
          //alert("fuck off")

          p.setState({data});
          p.setState({isLoading: false});
          p.props.actions.getAds(function(dat) {

              p.AdsToPosts(dat)

           })
        });
      })

    } else {
    //  alert(this.state.info._id)
    this.props.actions.AddPost(this.state.info._id,formData,this.props.redux.Auth.token,function(){
      //alert("add post works")
      p.props.actions.GetPosts(p.state.info._id, false,p.props.redux.Auth.token,function(data) {
        //alert("fuck off")

        p.setState({data});
        p.setState({isLoading: false});
        p.props.actions.getAds(function(dat) {

            p.AdsToPosts(dat)

         })
      });
    })
    }

  }
  slide() {
    if(this.state.visible) {
      Animated.timing(this.state.x, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();


  }else{
Animated.timing(this.state.x, {
toValue:120,
duration: 500,
useNativeDriver: true,
}).start();

  }


this.setState({visible:!this.state.visible})



   }
  postReport(id, isReported) {
    let p = this;
    this.props.actions.ReportPost(id, isReported,this.props.redux.Auth.token,function() {
      p.setState({data});
      p.setState({isLoading: false});

    });
  }
  postLike(id) {
    this.props.actions.LikePost(id, this.props.redux.Auth.token,function() {});
  }

  onPostAction(n, item) {
    let p = this;
    //alert(n)
    if (n == 1) {
      //Edit
      this.setState({myComment: item.text, editing: true, postId: item._id});
    } else {
      //Delete
      //console.log(this.state.postId);
      this.props.actions.DeletePost(item._id,this.props.redux.Auth.token,function() {
        let item = p.props.navigation.state.params.info;
        p.props.actions.GetPosts(item._id, false,p.props.redux.Auth.token, function(data) {
          p.setState({data});
          p.props.actions.getAds(function(dat) {

              p.AdsToPosts(dat)

           })
        });
      })
    }
  }

  render() {
    if (R.isEmpty(this.state.info)) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#393636" />
        </View>
      );
    } else {
      return (
        <MenuProvider>

        <View style={styles.container}>
          <Toolbar nav={this.props.navigation} />
          <ScrollView  ref={(scroller) => {this.scroller = scroller}}>

            <ImageBackground
              imageStyle={{
               height:"190%"
              }}
              style={{height:250, flexDirection: 'row'}}
              source={{uri: this.state.cover}}
            >
              <View style={{flex: 5, justifyContent: 'flex-end'}}>
                <View style={{paddingLeft: 16, paddingBottom: 40}}>
                  <Text
                    style={{color: '#FFF', fontSize: 18, fontWeight: 'bold'}}
                  >
                    {this.state.info.name}
                  </Text>
                  <View style={{height: 5}} />
                  <Text
                    style={{color: '#FFF', fontSize: 18, fontWeight: '400'}}
                  >
                    {this.state.info.metaName}
                  </Text>

                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                }}
              >
                <Touchable
                  onPress={() => this.slide()}
                  style={{
                    backgroundColor: '#f5a623',
                    width: 37,
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <MaterialCommunityIcons
                    size={20}
                    color="#FFF"
                    name="information-outline"
                  />
                </Touchable>
                <View style={{height: 10}} />
                <Touchable
                  onPress={() => {
                    this.props.navigation.push("MovieDetails",{info:this.state.info})
                  }}
                  style={{
                    backgroundColor: '#f5a623',
                    width: 37,
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <MaterialCommunityIcons size={20} color="#FFF" name="movie" />
                </Touchable>
                <View style={{height: 50}} />

              </View>
             <Animated.View style={{width:120,height:130,backgroundColor:"rgba(74,74,74,.9)",position: 'absolute',right:0,top:0, transform: [
              {
                translateX: this.state.x
              }
            ]
          }}>

            <View style={{flex:1,padding:4}}>
            <View style={{flex:0.8}}>
            <Text style={{color:"#FFF",fontSize:15}}>{this.state.info.productionCompany}</Text>
            </View>

            <View style={{flex:0.3}}>
            <Text style={{color:"#f5a623",fontSize:15}}>U · {this.state.info.duration}</Text>
            </View>

            <View style={{flex:1}}>
            <Text style={{color:"#f5a623",fontSize:15,paddingTop:5}}>{this.state.info.genre}</Text>

            </View>
            </View>




          </Animated.View>
            </ImageBackground>

            <Tabs info={this.state.info} followed={this.state.info.interestedByCurrentUser} />

            {
            // <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',backgroundColor:"#FFF",height:80,paddingLeft:50,paddingRight:50}}>
            // <Text style={{color:"black",fontSize:18}}>CAST & PRODUCTION</Text>
            // <Ionicons size={40} color="#000"  name="ios-arrow-forward"/>
            // </View>
            }

            <TabsT onTabClick={(tab) => this.setState({Tab:tab})}/>

            {

              this.state.Tab=="Events"?(
                 <Events events={this.state.info.events} navigation={this.props.navigation}
                 movieId={this.props.navigation.state.params.info._id}/>
              ):(<View/>)

            }

      {

        this.state.Tab=="Makers"?(
           <Makers navigation={this.props.navigation} postLike={(id)=> {
             this.postLike(id)
           }} postReport={(id,abuses)=>this.postReport(id,abuses)} onPostAction={(e,item)=>this.onPostAction(e,item)} movieId={this.props.navigation.state.params.info._id}/>
        ):(<View/>)

      }


       {
         this.state.Tab=="Fans"?(
           <View>
           {
             this.state.loggedIn?(
               <Reply send={() => {this.send()}} o={this} addComment={(t) => this.setState({myComment:t})} myComment={this.state.myComment} />

             ):(<View />)
           }
            {this.state.data.map(item => {
              if(item) {
              if(!item.displayDevice) {
             return (
             <View  onLayout={(event) =>{
               if(this.props.navigation.state.params.fromNot) {

                if(item._id == this.props.navigation.state.params.postID) {
                  this.handleLayoutChange(event)

                }
              }

                }}
              ref={view => {
               if(this.props.navigation.state.params.fromNot) {
                 if(item._id==this.props.navigation.state.params.postID){this.feedPost = view;}
               }
               }}>
               <Post
                 replyId={this.props.navigation.state.params.replyId?(this.props.navigation.state.params.replyId):("")}
                 fromNotType={this.props.navigation.state.params.type?(this.props.navigation.state.params.type):("")}
                 fromNotId={this.props.navigation.state.params.postID?(this.props.navigation.state.params.postID):("")}
                 nav={this.props.navigation}
                 share={() =>
                   this.setState({sharingItem: item, showShareModal: true})}
                 liked={item.userLikes.includes(this.props.redux.Auth.loggedInUser._id)}
                 reported={item.userAbuses.includes(
                    this.props.redux.Auth.loggedInUser._id,
                 )}
                 like={() => this.postLike(item._id)}
                 report={() =>
                   this.postReport(
                     item._id,
                     item.userAbuses.includes(this.props.redux.Auth.loggedInUser._id),
                   )}
                 action={e => this.onPostAction(e, item)}
                 item={item}
               />
               <View style={{backgroundColor: '#B0AFB2', height: 2}} />
             </View>
           );
         }else{
           return(
             <Ad item={item} />
           )
         }
}



         })}

         {this.state.data == []
           ? <View />
           : <View
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

             </View>}
           </View>
         ):(<View />)
       }









          </ScrollView>
          {this.state.isLoading
            ? <Loader loading={true} color="#ff66be" />
            : <View />}

          <ShareModal
             share={(id,comment) => {
               this.setState({isLoading:true})
               let p = this;
               this.props.actions.SharePost(id,comment,this.props.redux.Auth.token,function(){
                p.setState({isLoading:false,showShareModal:false})
                let item = p.props.navigation.state.params.info;

                p.props.actions.GetPosts(item._id, false,p.props.redux.Auth.token, function(data) {
                p.setState({data});
                p.props.actions.getAds(function(dat) {
               p.AdsToPosts(dat)
             })
           });

               })
             }}
             addComment={(t) => this.setState({myComment:t})}
            item={this.state.sharingItem}
            dismiss={() => this.setState({showShareModal: false})}
            showShareModal={this.state.showShareModal}
          />
        </View>
        {
          this.state.loggedIn?(
            <View />
          ):(
            <View style={{zIndex:20,padding:30,alignItems: 'center',position:'absolute',width:Dimensions.get("window").width,height:200,backgroundColor:"#4a4a4a",top:Dimensions.get("window").width/2,left:0}} >
            <Text style={{color:"#FFF"}}>
              Join the cinemalu community and participate in all conversations !!
            </Text>

            <Touchable onPress={()=>{
              this.props.navigation.pop();
              this.props.navigation.state.params.gotoRegPage()
            }} style={{width:200,height:50,marginTop:10,alignItems: 'center',justifyContent: 'center',backgroundColor:"#f5a623",borderWidth:0.5,borderColor:"#ea8409"}}>
            <Text style={{fontSize:13,color:"#FFF"}}>REGISTER NOW</Text>
            </Touchable>
            <Text style={{color:"#FFF",marginTop:10}}>
            Already Registered? Sign in <Text onPress={()=> {
              this.props.navigation.pop()
              this.props.navigation.state.params.gotoLoginPage()}} style={{
                textDecorationLine: "underline",
                textDecorationStyle: "solid",
                textDecorationColor: "#FFF"
            }}>here</Text>
            </Text>

            </View>
          )
        }
        {
          !this.state.loggedIn?(
            <View style={{position:'absolute',zIndex:10,top:60,backgroundColor:"rgba(0,0,0,0.5)",width:Dimensions.get("window").width,height:Dimensions.get("window").height+50}}/>
          ):(<View />)
        }

        </MenuProvider>

      );
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);
