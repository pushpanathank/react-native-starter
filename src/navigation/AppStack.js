import { createStackNavigator, StackViewTransitionConfigs } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';


import { Home, Map, MapSettings, MapGeofence, MapHistory} from '../screens/';
import { DrawerNavigator } from '../components/';
import { Device } from '../utils/';


const HomeStack = createStackNavigator({
  Home: { screen: Home },
}, {
  initialRouteName: "Home",
  headerMode: 'none',
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
    },

    MapHistory: {
      navigationOptions: {
        drawerLabel: "MapHistory"
      },
      screen: MapHistory
    }
}, {
  initialRouteName: "Map",
  headerMode: 'none',
  transitionConfig: () => StackViewTransitionConfigs.SlideFromRightIOS,
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
    headerMode: 'none',
    initialRouteName: "Home",
    drawerType: "front",
    drawerWidth: Device.winWidth-Device.winWidth/4,
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
},{
  headerMode: 'none',
});

export default AppStack;