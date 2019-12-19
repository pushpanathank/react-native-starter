import { createStackNavigator } from 'react-navigation-stack'
import Home from './scenes/Home'
import Homenew from './scenes/Homenew'
import Counter from './scenes/Counter'
import Counternew from './scenes/Counternew'

import Map from './screens/Map'

const AppNavigator = createStackNavigator(
  {
    Home,
    Counter,
    Homenew,
    Counternew,

    Map,
  },
  {
    initialRouteName: 'Home',
  },
)

export default AppNavigator
