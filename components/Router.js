import {createStackNavigator} from 'react-navigation'; // Version can be specified in package.json
import HomeScreen from './HomeScreen';
import MoviePage from './MoviePage';
import Profile from './Profile';
import Details from "./MoviePage/Details"
export default createStackNavigator(
  {
    Home: {
      screen:HomeScreen,
    },
    MovieDetails:{
      screen:Details
    },


    MoviePage: {
      screen: MoviePage,
    },
    UserProfile: {
      screen: Profile,
    },
  },
  {headerMode: 'none'},
);
