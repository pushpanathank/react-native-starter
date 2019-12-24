import { createStackNavigator } from 'react-navigation-stack'
import Home from '../scenes/Home'
import Homenew from '../scenes/Homenew'
import Counter from '../scenes/Counter'
import Counternew from '../scenes/Counternew'

import { Login, Map, MapSettings, MapGeofence} from '../screens/'


const AppNavigator = createStackNavigator(
  {
    Home,
    Counter,
    Homenew,
    Counternew,

    Login,
    Map,
    MapSettings,
    MapGeofence,
  },
  {
    initialRouteName: 'Login',
  },
)

export default AppNavigator
