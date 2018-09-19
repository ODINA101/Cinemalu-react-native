import { createStackNavigator } from 'react-navigation'; // Version can be specified in package.json
import HomeScreen from "./components/HomeScreen"

export default createStackNavigator({

  Home: {
    screen: HomeScreen
  },

},{   headerMode: 'none',});
