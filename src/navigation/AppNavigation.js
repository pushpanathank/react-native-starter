import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';


import { Login, Register, ForgotPassword, Home, Map, MapSettings, MapGeofence} from '../screens/';
import { DrawerNavigator } from '../components/';

import AuthStack from './AuthStack';


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
    drawerType: "front",
    drawerWidth: 300,
    edgeWidth: 100,
    minSwipeDistance: 10,
    overlayColor: "rgba(0,0,0,0.6)",
    drawerPosition: 'left',
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
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
