import { createStackNavigator } from 'react-navigation'; // Version can be specified in package.json
import HomeScreen from "./HomeScreen"
import MoviePage from "./MoviePage"
export default createStackNavigator({
  MoviePage:{
  screen:MoviePage
},
  Home: {
    screen: HomeScreen

  },

},{   headerMode: 'none',});
