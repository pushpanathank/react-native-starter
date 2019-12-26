import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';


import { Home, Map, MapSettings, MapGeofence} from '../screens/';
import { DrawerNavigator } from '../components/';


const HomeStack = createStackNavigator({
  Home: { screen: Home },
}, {
  initialRouteName: "Home",
});

const MapStack = createStackNavigator({
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
}, {
  initialRouteName: "Map",
});

const DrawerStack = createDrawerNavigator(
  {
    Home:{
        screen: HomeStack
    },
    Map:{
        screen: MapStack
    },
  },
  {
    initialRouteName: "Home",
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

export default AppStack;