// import { StackViewTransitionConfigs } from 'react-navigation';
import { createStackNavigator, StackViewTransitionConfigs  } from 'react-navigation-stack';


import { Login, Register, ForgotPassword } from '../screens/';

const AuthStack = createStackNavigator({
  Login: {
    screen: Login,
  },
  Register: {
    screen: Register,
  },
  ForgotPassword: {
    screen: ForgotPassword,
  },
},{
  headerMode: 'none',
  initialRouteName: 'Login',
  transitionConfig: () => StackViewTransitionConfigs.SlideFromRightIOS,
});

export default AuthStack;