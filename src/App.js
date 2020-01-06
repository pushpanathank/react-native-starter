/*
https://github.com/prscX/react-native-toasty
*/

import React from 'react';
import { Text, StatusBar, Alert } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import SplashScreen from 'react-native-splash-screen';
import codePush from "react-native-code-push";
import { RNToasty } from 'react-native-toasty';

import { store, persistor } from './store/';
import ReduxNavigation from './navigation/ReduxNavigation';
import { Theme } from './constants/';
import { NotifService } from './utils/';

let codePushOptions = { 
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  updateDialog: true, 
  // installMode: codePush.installMode.IMMEDIATE
};

// provide store and export app root component
class Root extends React.Component {
  constructor(props) {
    super(props);
    this.notif = new NotifService();
  }

  componentDidMount() {
      // do stuff while splash screen is shown
        // After having done stuff (such as async tasks) hide the splash screen
        SplashScreen.hide();
        codePush.sync({
          deploymentKey: "q6u2Z7fFr9LfOtWA61hUuMmCA1p097cSMQ3qt",
          updateDialog: { title: "An update is available!" }, 
          // installMode: codePush.installMode.IMMEDIATE
        },this.codePushStatusDidChange);
        this.notif.configure();
  }

  codePushStatusDidChange(status) {
    switch(status) {
        case codePush.SyncStatus.CHECKING_FOR_UPDATE:
          // RNToasty.Show({ title: "Checking for updates." });
            console.log("Checking for updates.");
            break;
        case codePush.SyncStatus.DOWNLOADING_PACKAGE:
          RNToasty.Show({ title: "Downloading package." });
            console.log("Downloading package.");
            break;
        case codePush.SyncStatus.INSTALLING_UPDATE:
          RNToasty.Show({ title: "Installing update." });
            console.log("Installing update.");
            break;
        case codePush.SyncStatus.UP_TO_DATE:
          // RNToasty.Show({ title: "Up-to-date." });
            console.log("Up-to-date.");
            break;
        case codePush.SyncStatus.UPDATE_INSTALLED:
          RNToasty.Show({ title: "Update installed." });
            console.log("Update installed.");
            break;
    }
}

codePushDownloadDidProgress(progress) {
    console.log(progress.receivedBytes + " of " + progress.totalBytes + " received.");
}

  render () {
    return (
      <Provider store={store}>
        <PersistGate 
          loading={<Text>Loading</Text>}
          persistor={persistor}
        >
        <StatusBar backgroundColor={Theme.colors.primary} barStyle="light-content" />
          <ReduxNavigation/>
        </PersistGate>
      </Provider>
    )
  }
}

export default codePush(codePushOptions)(Root);

// todo: disable yellow box when u are extremely angry
console.disableYellowBox = true