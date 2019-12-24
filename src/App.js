/*
https://github.com/prscX/react-native-toasty
*/

import React from 'react';
import { Text } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import SplashScreen from 'react-native-splash-screen';

import { store, persistor } from './store/';
import ReduxNavigation from './navigation/ReduxNavigation';

// provide store and export app root component
export default class Root extends React.Component {

  componentDidMount() {
      // do stuff while splash screen is shown
        // After having done stuff (such as async tasks) hide the splash screen
        SplashScreen.hide();
    }

  render () {
    return (
      <Provider store={store}>
        <PersistGate 
          loading={<Text>Loading</Text>}
          persistor={persistor}
        >
          <ReduxNavigation/>
        </PersistGate>
      </Provider>
    )
  }
}

// todo: disable yellow box when u are extremely angry
console.disableYellowBox = true
