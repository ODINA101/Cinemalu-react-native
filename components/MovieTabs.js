import React, { Component } from 'react';
import { Text, View,TouchableHighlight  } from 'react-native';



export default class MovieTabs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected:"key0"
    }

    this.onValueChange = this.onValueChange.bind(this)

  }

  onValueChange = (data) => {

    console.log(data)
    this.setState({selected:data})
  }




  render() {
    return (

       <View style={{width:200,height:50,backgroundColor:"#F8F8F8",borderRadius:5,flexDirection:"row"}}>
        {

          this.state.selected=="key0"?(
       <View style={{flex:1,backgroundColor:"#F5A623",borderBottomLeftRadius:5,borderTopLeftRadius:5,flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
        <Text style={{color:"#FFF"}}>
        All movies
        </Text>
        </View>

            ):(

        <TouchableHighlight  style={{flex:1,flexDirection:"row",alignItems:"center",justifyContent:"center"}} onPress={() => { this.onValueChange("key0")}}>
        <Text>
        All movies
        </Text>
        </TouchableHighlight >


      )

        }

        {
          this.state.selected=="key1"?(
            <View style={{flex:1,borderBottomRightRadius:5,borderTopRightRadius:5,flexDirection:"row",alignItems:"center",backgroundColor:"#F5A623",justifyContent:"center"}}>
          <Text  style={{color:"#FFF"}}>My movies</Text>
           </View>
            ):(
                <TouchableHighlight  onPress={() => this.onValueChange("key1") } style={{flex:1,flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
        <Text>My movies</Text>
        </TouchableHighlight >
              )
        }


       </View>

      )
  }
}
