import { createStackNavigator } from 'react-navigation'; // Version can be specified in package.json
import HomeScreen from "./HomeScreen"
import MoviePage from "./MoviePage"
export default createStackNavigator({
  Home: {
    screen: HomeScreen

  },
  MoviePage:{
screen:MoviePage
},


},{   headerMode: 'none',});
