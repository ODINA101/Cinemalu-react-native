import {createStackNavigator} from 'react-navigation'; // Version can be specified in package.json
import HomeScreen from './HomeScreen';
import MoviePage from './MoviePage';
import Profile from './Profile';
import Details from "./MoviePage/Details"
import Cast from "./MoviePage/Details/Cast"
import NewHome from "./Newdesign/main"
export default createStackNavigator(
  {

    // newDesign: {
    //   screen:NewHome
    // },
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
    Cast: {
   screen:Cast
   },

  },
  {headerMode: 'none'},
);
