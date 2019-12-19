import React from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { connect } from 'react-redux';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import BackgroundGeolocation from "react-native-background-geolocation";
import mapStyle from '../../config/mapStyle.json';

const { width, height } = Dimensions.get('window');


class Map extends React.Component {

  static navigationOptions = {
    title: 'Map',
  }

  constructor(props) {
    super(props);
    this.state = {
      senderId: 0
    };
  }

  componentWillMount() {
    ////
    // 1.  Wire up event-listeners
    //

    // This handler fires whenever bgGeo receives a location update.
    BackgroundGeolocation.onLocation(this.onLocation, this.onError);

    // This handler fires when movement states changes (stationary->moving; moving->stationary)
    BackgroundGeolocation.onMotionChange(this.onMotionChange);

    // This event fires when a change in motion activity is detected
    BackgroundGeolocation.onActivityChange(this.onActivityChange);

    // This event fires when the user toggles location-services authorization
    BackgroundGeolocation.onProviderChange(this.onProviderChange);

    ////
    // 2.  Execute #ready method (required)
    //
    BackgroundGeolocation.ready({
      // Geolocation Config
      desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
      distanceFilter: 10,
      // Activity Recognition
      stopTimeout: 1,
      // Application config
      debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      stopOnTerminate: false,   // <-- Allow the background-service to continue tracking when user closes the app.
      startOnBoot: true,        // <-- Auto start tracking when device is powered-up.
      // HTTP / SQLite config
      url: 'http://yourserver.com/locations',
      batchSync: false,       // <-- [Default: false] Set true to sync locations to server in a single HTTP request.
      autoSync: true,         // <-- [Default: true] Set true to sync each location to server as it arrives.
      headers: {              // <-- Optional HTTP headers
        "X-FOO": "bar"
      },
      params: {               // <-- Optional HTTP params
        "auth_token": "maybe_your_server_authenticates_via_token_YES?"
      }
    }, (state) => {
      console.log("- BackgroundGeolocation is configured and ready: ", state.enabled);

      if (!state.enabled) {
        ////
        // 3. Start tracking!
        //
        BackgroundGeolocation.start(function() {
          console.log("- Start success");
        });
      }
    });
  }

  // You must remove listeners when your component unmounts
  componentWillUnmount() {
    BackgroundGeolocation.removeListeners();
  }
  onLocation(location) {
    console.log('[location] -', location);
  }
  onError(error) {
    console.warn('[location] ERROR -', error);
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

  async getCurrentLocation(){
    let location = await BackgroundGeolocation.getCurrentPosition({
      timeout: 30,          // 30 second timeout to fetch location
      maximumAge: 5000,     // Accept the last-known-location if not older than 5000 ms.
      desiredAccuracy: 10,  // Try to fetch a location with an accuracy of `10` meters.
      samples: 3,           // How many location samples to attempt.
      extras: {             // Custom meta-data.
        "route_id": 123
      }
    });
      console.log("location", location);
  }

  render () {

    const { navigation } = this.props

    return (
      <View style={styles.container}>
         <MapView
           provider={PROVIDER_GOOGLE} // remove if not using Google Maps
           style={styles.map}
           customMapStyle={mapStyle}
           region={{
             latitude: 13.0827,
             longitude: 80.2707,
             latitudeDelta: 0.05,
             longitudeDelta: 0.05,
           }}
         >
         </MapView>
         <View style={styles.bottomtab}>
         <Button style={styles.btn} title='Loc' onPress={() => {this.getCurrentLocation()}}>Loc</Button>
         <Button style={styles.btn} title='Start' onPress={() => {navigation.navigate('Counter')}}>Start</Button>
         </View>
       </View>
    )
    }
}

const styles = StyleSheet.create({
  container: {
   ...StyleSheet.absoluteFillObject,
   height: height-100,
   width: width,
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
  color: '#fff',
  width:'50%',
  flex:1,
  marginRight: 3
 }
})

export default connect()(Map)