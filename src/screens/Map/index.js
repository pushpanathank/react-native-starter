import React from 'react';
import { View, StyleSheet, TextInput, Alert } from 'react-native';
import { connect } from 'react-redux';

import AsyncStorage from '@react-native-community/async-storage';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import BackgroundGeolocation, {
  State,
  Config,
  Location,
  LocationError,
  Geofence,
  HttpEvent,
  MotionActivityEvent,
  ProviderChangeEvent,
  MotionChangeEvent,
  GeofenceEvent,
  GeofencesChangeEvent,
  HeartbeatEvent,
  ConnectivityChangeEvent,
  DeviceSettings, DeviceSettingsRequest,
  Notification,
  DeviceInfo,
  Authorization, AuthorizationEvent,
  TransistorAuthorizationToken
} from "react-native-background-geolocation";
import BackgroundFetch from "react-native-background-fetch";

import { Button, Block, Text } from '../../components/';
import { MapStyle, BgGeoConfig } from '../../config/';
import { Theme } from '../../constants/';
import { Device } from '../../utils/';


const STORAGE_KEY:string = "@pushapp:";

class Map extends React.Component {

  static navigationOptions = {
    title: 'Map',
  }

  constructor(props) {
    super(props);
    this.state = {
      enabled: false,
      bgGeo: {didLaunchInBackground: false, enabled: false, schedulerEnabled: false, trackingMode: 1, odometer: 0},
    }
  }

  componentDidMount() {
    // Configure BackgroundGeolocation
    this.configureBackgroundGeolocation();

    // [Optional] Configure BackgroundFetch
    // this.configureBackgroundFetch();
  }

  async configureBackgroundGeolocation() {
    let orgname = 'push';
    let username = 'push';
    let id = 1;

    // Step 1:  Listen to events:
    BackgroundGeolocation.onLocation(this.onLocation.bind(this), this.onLocationError.bind(this));
    BackgroundGeolocation.onMotionChange(this.onMotionChange.bind(this));
    BackgroundGeolocation.onHeartbeat(this.onHeartbeat.bind(this));
    BackgroundGeolocation.onHttp(this.onHttp.bind(this));
    BackgroundGeolocation.onGeofence(this.onGeofence.bind(this));
    BackgroundGeolocation.onSchedule(this.onSchedule.bind(this));
    BackgroundGeolocation.onActivityChange(this.onActivityChange.bind(this));
    BackgroundGeolocation.onProviderChange(this.onProviderChange.bind(this));
    BackgroundGeolocation.onGeofencesChange(this.onGeofencesChange.bind(this));
    BackgroundGeolocation.onPowerSaveChange(this.onPowerSaveChange.bind(this));
    BackgroundGeolocation.onConnectivityChange(this.onConnectivityChange.bind(this));
    BackgroundGeolocation.onEnabledChange(this.onEnabledChange.bind(this));
    BackgroundGeolocation.onNotificationAction(this.onNotificationAction.bind(this));
    // Step 2:  #ready:
    // If you want to override any config options provided by the Settings screen, this is the place to do it, eg:
    // config.stopTimeout = 5;
    //
    let config = await AsyncStorage.getItem(STORAGE_KEY+"BgGeoConfig");
    config = config ? JSON.parse(config) : BgGeoConfig;
    BackgroundGeolocation.ready(config, (state:State) => {
      console.log('- state: ', state);
      if (state.schedule && state.schedule.length > 0) {
        BackgroundGeolocation.startSchedule();
      }

      this.setState({
        enabled: state.enabled,
        bgGeo: state
      });
    }, (error:string) => {
      console.warn('BackgroundGeolocation error: ', error)
    });
  }

  configureBackgroundFetch() {
    // [Optional] Configure BackgroundFetch.
    BackgroundFetch.configure({
      minimumFetchInterval: 15, // <-- minutes (15 is minimum allowed)
      stopOnTerminate: false, // <-- Android-only,
      startOnBoot: true, // <-- Android-only
      enableHeadless: true,
      requiresCharging: false,
      requiredNetworkType: BackgroundFetch.NETWORK_TYPE_NONE,
      requiresDeviceIdle: false,
      requiresBatteryNotLow: false,
      requiresStorageNotLow: false
    }, async () => {
      console.log('- BackgroundFetch start');
      let location = await BackgroundGeolocation.getCurrentPosition({persist: true, samples:1, extras: {'context': 'background-fetch-position'}});
      console.log('- BackgroundFetch current position: ', location) // <-- don't see this
      BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_NEW_DATA);
    }, (error) => {
      console.log('[js] RNBackgroundFetch failed to start')
    });
  }

  // You must remove listeners when your component unmounts
  componentWillUnmount() {
    BackgroundGeolocation.removeListeners();
  }
  onLocation(location) {
    console.log('[location] -', location);
  }
  onLocationError(error) {
    console.warn('[location] ERROR -', error);
  }
  onHeartbeat(event) {
    console.log('[onHeartbeat] -', event);
  }
  onHttp(event) {
    console.log('[onHttp] -', event);
  }
  onGeofence(event) {
    console.log('[onGeofence] -', event);
  }
  onSchedule(event) {
    console.log('[onSchedule] -', event);
  }
  onGeofencesChange(event) {
    console.log('[onGeofencesChange] -', event);
  }
  onPowerSaveChange(event) {
    console.log('[onPowerSaveChange] -', event);
  }
  onConnectivityChange(event) {
    console.log('[onConnectivityChange] -', event);
  }
  onEnabledChange(event) {
    console.log('[onEnabledChange] -', event);
  }
  onNotificationAction(event) {
    console.log('[onNotificationAction] -', event);
  }
  onActivityChange(event) {
    console.log('[activitychange] -', event);  // eg: 'on_foot', 'still', 'in_vehicle'
  }
  onProviderChange(provider) {
    console.log('[providerchange] -', provider.enabled, provider.status);
  }
  onMotionChange(event) {
    console.log('[motionchange] -', event.isMoving, event.location);
  }

  async onToggleEnabled() {
    let enabled = !this.state.enabled;
    console.log("enabled", enabled);

    this.setState({
      enabled: enabled,
    });

    if (enabled) {
      BackgroundGeolocation.start((state:State) => {
        console.log("- Start success");
      });
    } else {
      BackgroundGeolocation.stop();
      // Clear markers, polyline, geofences, stationary-region
      /*this.clearMarkers();
      this.setState({
        stationaryRadius: 0,
        stationaryLocation: {
          timestamp: '',
          latitude: 0,
          longitude: 0
        }
      });*/
    }
  }

  async getCurrentLocation(){
    let location = await BackgroundGeolocation.getCurrentPosition();
      console.log("location", location);
  }

  goToSettings(){
    const { navigation } = this.props;
    navigation.navigate('MapSettings');
  }

  render () {

    const { navigation } = this.props

    return (
      <View style={styles.container}>
         <MapView
           provider={PROVIDER_GOOGLE} // remove if not using Google Maps
           style={styles.map}
           customMapStyle={MapStyle}
           region={{
             latitude: 13.0827,
             longitude: 80.2707,
             latitudeDelta: 0.05,
             longitudeDelta: 0.05,
           }}
         >
         </MapView>
         <Block row padding={[0,Theme.sizes.indent]} style={styles.bottomtab}>
            <Block>
              <Button ripple
                color="secondary"
                onPress={() => this.getCurrentLocation()}
                style={[styles.btn]}
              >
                <Text white center> Loc </Text>
              </Button> 
            </Block>
            <Block>
              <Button ripple
                color="secondary"
                onPress={() => this.onToggleEnabled()}
                style={[styles.btn]}
              >
                <Text white center > { this.state.enabled ? 'Stop' : 'Start' } </Text>
              </Button>
            </Block>

            <Block>
              <Button ripple
                color="secondary"
                onPress={() => this.goToSettings()}
                style={[styles.btn]}
              >
                <Text white center > Settings </Text>
              </Button>
            </Block>
          </Block>
       </View>
    )
    }
}

const styles = StyleSheet.create({
  container: {
   ...StyleSheet.absoluteFillObject,
   height: Device.winHeight-100,
   width: Device.winWidth,
   justifyContent: 'flex-end',
   alignItems: 'center',
   backgroundColor: '#000'
 },
 map: {
   ...StyleSheet.absoluteFillObject,
   backgroundColor: '#ffffff'
 },
 bottomtab:{
  position: 'absolute',
  bottom:0,
  width: '100%',
  height: 50,
  backgroundColor: '#fff'
 },
 btn:{
  marginRight: 5
 }
})

export default connect()(Map)