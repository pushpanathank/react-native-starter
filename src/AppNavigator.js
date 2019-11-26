import { createStackNavigator } from 'react-navigation'
import Home from './scenes/Home'
import Homenew from './scenes/Homenew'
import Counter from './scenes/Counter'
import Counternew from './scenes/Counternew'

const AppNavigator = createStackNavigator(
  {
    Home,
    Counter,
    Homenew,
    Counternew,
  },
  {
    initialRouteName: 'Home',
  },
)

export default AppNavigator
