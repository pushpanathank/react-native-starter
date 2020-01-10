import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';


import { Login, Register, ForgotPassword, Home, Map, MapSettings, MapGeofence} from '../screens/';
import { DrawerNavigator } from '../components/';

import AuthStack from './AuthStack';
import AppStack from './AppStack';

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
