import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';


import Home from '../scenes/Home'
import Homenew from '../scenes/Homenew'
import Counter from '../scenes/Counter'
import Counternew from '../scenes/Counternew'

import { Login, Map, MapSettings, MapGeofence} from '../screens/';
import { DrawerNavigator } from '../components/';

const AuthStack = createStackNavigator({
  Login: {
    screen: Login,
  },
},{
  headerMode: 'none',
  initialRouteName: 'Login',
});

const DrawerStack = createDrawerNavigator(
  {
    Map: {
      navigationOptions: {
        // drawerIcon: ({ tintColor }) => (
        //   <Ionicons name="md-home" style={{ color: tintColor }} />
        // ),
        drawerLabel: "Map"
      },
      screen: Map
    },

    MapSettings: {
      navigationOptions: {
        drawerLabel: "MapSettings"
      },
      screen: MapSettings
    },

    MapGeofence: {
      navigationOptions: {
        drawerLabel: "MapGeofence"
      },
      screen: MapGeofence
    }
  },
  {
    initialRouteName: "Map",
    contentComponent: DrawerNavigator
  }
);

const AppStack = createStackNavigator({
  Home: {
    screen: DrawerStack,
  },
});

const App = createSwitchNavigator({
  Auth: {
    screen: AuthStack
  },
  Main: {
    screen: AppStack
  }
},
{
  initialRouteName: 'Auth',
});

export default createAppContainer(App)
