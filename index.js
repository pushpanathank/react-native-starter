/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

import moment from 'moment';
import PushNotification from 'react-native-push-notification';
import BackgroundGeolocation from "react-native-background-geolocation";
import BackgroundFetch from "react-native-background-fetch";
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'


// Make BackgroundGeolocation API global for handy access in Javascript Debugger console
global.BackgroundGeolocation = BackgroundGeolocation;

AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(App));


/**
* BackgroundGeolocation Headless JS task.
* For more information, see:  https://github.com/transistorsoft/react-native-background-geolocation/wiki/Android-Headless-Mode
*/
let BackgroundGeolocationHeadlessTask = async (event) => {
  let params = event.params||{};
  let time = moment().format('DD/MM HH:mm:ss');
  console.log(time+' [HeadlessTask] -', event.name, params);

  switch (event.name) {
    case 'heartbeat':
      // Use await for async tasks
      /* DISABLED
      let location = await getCurrentPosition({
        samples: 1,
        persist: false
      });
      console.log('[HeadlessTask] - getCurrentPosition:', location);
      */
      if (event.location && event.location.battery && event.location.battery.level < 0.5) {
            PushNotification.localNotification({id:'17',message: time +'[HT] - heartbeat battery_low_level_warning'});
          }
          PushNotification.localNotification({id:'18',message: time +'[HT] - heartbeat'});
      break;
      case 'activitychange':
        PushNotification.localNotification({ message: time +" [HT] - activity "+ params.activity});
        if (params.activity !== "still"){
            
        }
        BackgroundGeolocation.getCurrentPosition();
      break;
      case 'http':
        PushNotification.localNotification({ message: time +" [HT] - http "});
      break;
      case 'connectivitychange':
        if (!params.connected) {
          PushNotification.localNotification({id:'19',message: time +'[HT] - connectivitychange'});
        }
      break;
      case 'providerchange':
        if (((params.provider && !params.provider.enabled)
                || (!params.provider && !params.enabled))) {
          PushNotification.localNotification({id:'20',message: time +'[HT] - providerchange'});
        }
      break;
      case 'powersavechange':
          PushNotification.localNotification({id:'21',message: time +'[HT] - powersavechange'});
      break;
  }
}

BackgroundGeolocation.registerHeadlessTask(BackgroundGeolocationHeadlessTask);

/**
* BackgroundFetch Headless JS Task.
* For more information, see:  https://github.com/transistorsoft/react-native-background-fetch#config-boolean-enableheadless-false
*/
let BackgroundFetchHeadlessTask = async (event) => {
  console.log('[BackgroundFetch HeadlessTask] start');
  // Important:  await asychronous tasks when using HeadlessJS.
  /* DISABLED
  let location = await BackgroundGeolocation.getCurrentPosition({persist: false, samples: 1});
  console.log('- current position: ', location);
  // Required:  Signal to native code that your task is complete.
  // If you don't do this, your app could be terminated and/or assigned
  // battery-blame for consuming too much time in background.
  */
  console.log('[BackgroundFetch HeadlessTask] finished');

  BackgroundFetch.finish();
}


// Register your BackgroundFetch HeadlessTask
BackgroundFetch.registerHeadlessTask(BackgroundFetchHeadlessTask);