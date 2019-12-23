import { createStackNavigator } from 'react-navigation-stack'
import Home from './scenes/Home'
import Homenew from './scenes/Homenew'
import Counter from './scenes/Counter'
import Counternew from './scenes/Counternew'

import Map from './screens/Map'
import MapSettings from './screens/Map/Settings'

const AppNavigator = createStackNavigator(
  {
    Home,
    Counter,
    Homenew,
    Counternew,

    Map,
    MapSettings,
  },
  {
    initialRouteName: 'Home',
  },
)

export default AppNavigator
