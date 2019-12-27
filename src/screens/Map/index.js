import React, {Component} from 'react';
import { View, StyleSheet, TextInput, Alert, AppState } from 'react-native';
import { connect } from 'react-redux';

import { RNToasty } from 'react-native-toasty';
import MapView, {Marker, Polyline, Circle, PROVIDER_GOOGLE} from 'react-native-maps';
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

import AsyncStorage from '@react-native-community/async-storage';

import { Button, Block, Text, Header, MapMenuOption } from '../../components/';
import FontAwesome, { FaLightIcons } from '../../components/icons';
import { MapStyle, BgGeoConfig } from '../../config/';
import { Theme } from '../../constants/';
import { Device } from '../../utils/';

const LATITUDE_DELTA = 0.00922;
const LONGITUDE_DELTA = 0.00421;
const STORAGE_KEY:string = "@pushapp:";

type IProps = {
  navigation: any;
}
type IState = {
  appState: any,
  username?: string;
  enabled?: boolean;
  isMoving?: boolean;
  isMainMenuOpen?: boolean;
  isSyncing?: boolean;
  isEmailingLog?: boolean;
  isDestroyingLocations?: boolean;
  isPressingOnMap?: boolean;
  isResettingOdometer?: boolean;
  mapScrollEnabled?: boolean,
  showsUserLocation?: boolean,
  followsUserLocation?: boolean,
  tracksViewChanges?: boolean,
  motionActivity: MotionActivityEvent;
  odometer?: string;
  centerCoordinate?: any;
  stationaryLocation?: any;
  stationaryRadius?: number;
  markers?: any;
  stopZones?: any;
  geofences?: any;
  geofencesHit?: any;
  geofencesHitEvents?: any;
  coordinates?: any,
  // Application settings
  settings?: any,
  // BackgroundGeolocation state
  bgGeo: State
}

class Map extends Component<IProps, IState> {

  static navigationOptions = {
    title: 'Map',
  }

  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState,
      enabled: false,
      isMoving: false,
      motionActivity: {activity: 'unknown', confidence: 100},
      odometer: '0.0',
      username: "Push",
      // ActionButton state
      isMainMenuOpen: true,
      isSyncing: false,
      isEmailingLog: false,
      isDestroyingLocations: false,
      tracksViewChanges: true,
      // Map state
      centerCoordinate: {
        latitude: 0,
        longitude: 0
      },
      isPressingOnMap: false,
      mapScrollEnabled: false,
      showsUserLocation: false,
      followsUserLocation: false,
      isResettingOdometer: false,
      stationaryLocation: {timestamp: '',latitude:0,longitude:0},
      stationaryRadius: 0,
      markers: [],
      stopZones: [],
      geofences: [],
      geofencesHit: [],
      geofencesHitEvents: [],
      coordinates: [],
      lastMotionChangeLocation:Location,
      // Application settings
      settings: {},
      // BackgroundGeolocation state
      bgGeo: {didLaunchInBackground: false, enabled: false, schedulerEnabled: false, trackingMode: 1, odometer: 0},
    };
  }

  componentDidMount() {
    // Configure BackgroundGeolocation
    this.configureBackgroundGeolocation();

    // [Optional] Configure BackgroundFetch
    // this.configureBackgroundFetch();
  }

  async configureBackgroundGeolocation() {

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
    console.log("config", config);
    config = config ? JSON.parse(config) : BgGeoConfig;
    BackgroundGeolocation.ready(config, (state:State) => {
      console.log('- state: ', state);
      if (state.schedule && state.schedule.length > 0) {
        BackgroundGeolocation.startSchedule();
      }
      this.onClickGetCurrentPosition();
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
  onLocation(location:Location) {
    console.log('[location] -', location);
    if (!location.sample) {
      this.addMarker(location);
      this.setState({
        odometer: (location.odometer/1000).toFixed(1)
      });
    }
    this.setCenter(location);
  }
  onLocationError(errorCode:LocationError) {
    console.log('[location] ERROR - ', errorCode);
  }
  onHeartbeat(params:HeartbeatEvent) {
    console.log("[heartbeat] - ", params.location);
  }
  onHttp(response:HttpEvent) {
    console.log('[http] - ', JSON.stringify(response));
  }
  onSchedule(state:State) {
    console.log("[schedule] - ", state.enabled, state);
    this.setState({
      enabled: state.enabled
    });
  }
  onGeofencesChange(event:GeofencesChangeEvent) {
    var on  = event.on;
    var off = event.off;
    var geofences  = this.state.geofences || [];

    // Filter out all "off" geofences.
    geofences = geofences.filter(function(geofence:Geofence) {
      return off.indexOf(geofence.identifier) < 0;
    });

    console.log('[geofenceschange] - ', event);
    // Add new "on" geofences.
    on.forEach((geofence:Geofence) => {
      var marker = geofences.find(function(m:Geofence) { return m.identifier === geofence.identifier;});
      if (marker) { return; }
      geofences.push(this.createGeofenceMarker(geofence));
    });

    this.setState({
      geofences: geofences
    });
  }
  onGeofence(event:GeofenceEvent) {
    console.log('[geofence] - ', event);
    let location:Location = event.location;
    let geofences = this.state.geofences || [];
    var marker = geofences.find((m:any) => {
      return m.identifier === event.identifier;
    });
    if (!marker) { return; }

    marker.fillColor = Theme.colors.geofenceStrokeColorActivated;
    marker.strokeColor = Theme.colors.geofenceStrokeColorActivated;

    let coords = location.coords;

    let geofencesHit = this.state.geofencesHit || [];
    let hit = geofencesHit.find((hit:any) => {
      return hit.identifier === event.identifier;
    });

    if (!hit) {
      hit = {
        identifier: event.identifier,
        radius: marker.radius,
        center: {
          latitude: marker.center.latitude,
          longitude: marker.center.longitude
        },
        events: []
      };
      this.setState({
        geofencesHit: [...this.state.geofencesHit, hit]
      });
    }
    // Get bearing of location relative to geofence center.
    let bearing = this.getBearing(marker.center, location.coords);
    let edgeCoordinate = this.computeOffsetCoordinate(marker.center, marker.radius, bearing);
    let record = {
      coordinates: [
        edgeCoordinate,
        {latitude: coords.latitude, longitude: coords.longitude},
      ],
      action: event.action,
      key: event.identifier + ":" + event.action + ":" + location.timestamp
    };
    this.setState({
      geofencesHitEvents: [...this.state.geofencesHitEvents, record]
    });
  }
  onPowerSaveChange(isPowerSaveMode:boolean) {
    console.log('[powersavechange] - ', isPowerSaveMode);
  }
  onConnectivityChange(event:ConnectivityChangeEvent) {
    console.log('[connectivitychange] - ', event);
    RNToasty.Show({ title: '[connectivitychange] - ' + event.connected });
  }
  onEnabledChange(enabled:boolean) {
    console.log('[enabledchange] - ', enabled);
    RNToasty.Show({ title: '[enabledchange] - ' + enabled });
  }
  onNotificationAction(buttonId:string) {
    console.log('[notificationaction] - ', buttonId);
    switch(buttonId) {
      case 'notificationActionFoo':
        break;
      case 'notificationActionBar':
        break;
    }
  }
  onActivityChange(event:MotionActivityEvent) {
    console.log('[activitychange] -', event);  // eg: 'on_foot', 'still', 'in_vehicle'
    this.setState({
      motionActivity: event
    });
  }
  onProviderChange(event:ProviderChangeEvent) {
    console.log('[providerchange] - ', event);
  }
  onMotionChange(event:MotionChangeEvent) {
    console.log('[motionchange] - ', event.isMoving, event.location);
    let location = event.location;

    let state:any = {
      isMoving: event.isMoving
    };
    if (event.isMoving) {
      if (this.state.lastMotionChangeLocation) {
        state.stopZones = [...this.state.stopZones, {
          coordinate: {
            latitude: this.state.lastMotionChangeLocation.coords.latitude,
            longitude: this.state.lastMotionChangeLocation.coords.longitude
          },
          key: this.state.lastMotionChangeLocation.timestamp
        }];
      }
      state.stationaryRadius = 0,
      state.stationaryLocation = {
        timestamp: '',
        latitude: 0,
        longitude: 0
      };
    } else {
      let geofenceProximityRadius = this.state.bgGeo.geofenceProximityRadius || 1000;
      state.stationaryRadius = (this.state.bgGeo.trackingMode == 1) ? 200 : (geofenceProximityRadius/2);
      state.stationaryLocation = {
        timestamp: location.timestamp,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      };
    }
    this.setState(state);
    this.state.lastMotionChangeLocation = location;
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
        this.setState({
            showsUserLocation: enabled,
            followsUserLocation: enabled
          });
      });
    } else {
      BackgroundGeolocation.stop();
      // Clear markers, polyline, geofences, stationary-region
      this.clearMarkers();
      this.setState({
        stationaryRadius: 0,
        stationaryLocation: {
          timestamp: '',
          latitude: 0,
          longitude: 0
        }
      });
    }
  }

  onClickGetCurrentPosition() {
    // When getCurrentPosition button is pressed, enable followsUserLocation
    // PanDrag will disable it.
    this.setState({
      followsUserLocation: true
    });
    RNToasty.Show({ title: 'Getting position...' });
    BackgroundGeolocation.getCurrentPosition({
      persist: true,
      samples: 1,
      timeout: 30
    }).then((location:Location) => {
      console.log('[getCurrentPosition] success: ', location);
      this.addMarker(location);
      this.setCenter(location);
    }).catch((error:LocationError) => {
      console.warn('[getCurrentPosition] error: ', error);
    });
  }

  onClickChangePace() {
    console.log('- onClickChangePace');
    let isMoving = !this.state.isMoving;
    this.setState({isMoving: isMoving});
    BackgroundGeolocation.changePace(isMoving);
  }

  onPressGeofence() {

  }
  getMotionActivityIcon() {
    let activity = (this.state.motionActivity != null) ? this.state.motionActivity.activity : undefined;
    switch (activity) {
      case 'unknown':
        return 'ios-help-circle';
      case 'still':
        return 'ios-body';
      case 'on_foot':
        return 'ios-walk';
      case 'walking':
        return 'ios-walk';
      case 'running':
        return 'ios-walk';
      case 'in_vehicle':
        return 'ios-car';
      case 'on_bicycle':
        return 'ios-bicycle';
      default:
        return 'ios-help-cirlce';
    }
  }

  renderMarkers() {
    let rs:any = [];
    this.state.markers.map((marker:any) => {
      rs.push((
        <Marker
          key={marker.key}
          tracksViewChanges={this.state.tracksViewChanges}
          coordinate={marker.coordinate}
          anchor={{x:0, y:0.1}}
          title={marker.title}>
          <View style={[styles.markerIcon]}></View>
        </Marker>
      ));
    });
    return rs;
  }

  renderStopZoneMarkers() {
    return this.state.stopZones.map((stopZone:any) => (
      <Marker
        key={stopZone.key}
        tracksViewChanges={this.state.tracksViewChanges}
        coordinate={stopZone.coordinate}
        anchor={{x:0, y:0}}>
        <View style={[styles.stopZoneMarker]}></View>
      </Marker>
    ));
  }

  renderActiveGeofences() {
    return this.state.geofences.map((geofence:any) => (
      <Circle
        tracksViewChanges={this.state.tracksViewChanges}
        key={geofence.identifier}
        radius={geofence.radius}
        center={geofence.center}
        strokeWidth={1}
        strokeColor={geofence.strokeColor}
        fillColor={geofence.fillColor}
        onPress={this.onPressGeofence}
      />
    ));
  }

  renderGeofencesHit() {
    let rs = [];
    return this.state.geofencesHit.map((hit:any) => {
      return (
        <Circle
          tracksViewChanges={this.state.tracksViewChanges}
          key={"hit:" + hit.identifier}
          radius={hit.radius+1}
          center={hit.center}
          strokeWidth={1}
          strokeColor={Theme.colors.black}>
        </Circle>
      );
    });
  }

  renderGeofencesHitEvents() {
    return this.state.geofencesHitEvents.map((event:any) => {
      let isEnter = (event.action === 'ENTER');
      let color = undefined;
      switch(event.action) {
        case 'ENTER':
          color = Theme.colors.green;
          break;
        case 'EXIT':
          color = Theme.colors.red;
          break;
        case 'DWELL':
          color = Theme.colors.yellow;
          break;
      }
      let markerStyle = {
        backgroundColor: color
      };
      return (
        <View key={event.key}>
          <Polyline
            tracksViewChanges={this.state.tracksViewChanges}
            key="polyline"
            coordinates={event.coordinates}
            geodesic={true}
            strokeColor={Theme.colors.black}
            strokeWidth={1}
            zIndex={1}
            lineCap="square" />
          <Marker
            tracksViewChanges={this.state.tracksViewChanges}
            key="edge_marker"
            coordinate={event.coordinates[0]}
            anchor={{x:0, y:0.1}}>
            <View style={[styles.geofenceHitMarker, markerStyle]}></View>
          </Marker>
          <Marker
            tracksViewChanges={this.state.tracksViewChanges}
            key="location_marker"
            coordinate={event.coordinates[1]}
            anchor={{x:0, y:0.1}}>
            <View style={styles.markerIcon}></View>
          </Marker>
        </View>
      );
    });
  }

  setCenter(location:Location) {
    if (!this.refs.map) { return; }
    if (!this.state.followsUserLocation) { return; }

    this.refs.map.animateToRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    });
  }

  addMarker(location:Location) {
    console.log("addMarker", location);
    let marker = {
      key: location.uuid,
      title: location.timestamp,
      heading: location.coords.heading,
      coordinate: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      }
    };

    this.setState({
      markers: [...this.state.markers, marker],
      coordinates: [...this.state.coordinates, {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      }]
    });
  }

  createGeofenceMarker(geofence:Geofence) {
    return {
      radius: geofence.radius,
      center: {
        latitude: geofence.latitude,
        longitude: geofence.longitude
      },
      identifier: geofence.identifier,
      strokeColor:Theme.colors.geofenceStrokeColor,
      fillColor: Theme.colors.geofenceFillColor
    }
  }

  onMapPanDrag() {
    this.setState({
      followsUserLocation: false,
      mapScrollEnabled: true
    });
  }

  onLongPress(params:any) {
    console.log("onLongPress");
    var coordinate = params.nativeEvent.coordinate;
    this.props.navigation.navigate('MapGeofence', {
      coordinate: coordinate
    });
  }

  clearMarkers() {
    this.setState({
      coordinates: [],
      markers: [],
      stopZones: [],
      geofences: [],
      geofencesHit: [],
      geofencesHitEvents: []
    });
  }

  toRad(n) {
    return n * (Math.PI / 180);
  }
  toDeg(n) {
    return n * (180 / Math.PI);
  }

  getBearing(start:any, end:any){
    let startLat = this.toRad(start.latitude);
    let startLong = this.toRad(start.longitude);
    let endLat = this.toRad(end.latitude);
    let endLong = this.toRad(end.longitude);

    let dLong = endLong - startLong;

    let dPhi = Math.log(Math.tan(endLat/2.0+Math.PI/4.0)/Math.tan(startLat/2.0+Math.PI/4.0));
    if (Math.abs(dLong) > Math.PI){
      if (dLong > 0.0)
         dLong = -(2.0 * Math.PI - dLong);
      else
         dLong = (2.0 * Math.PI + dLong);
    }
    return (this.toDeg(Math.atan2(dLong, dPhi)) + 360.0) % 360.0;
  }

  computeOffsetCoordinate(coordinate:any, distance:number, heading:number) {
    distance = distance / (6371*1000);
    heading = this.toRad(heading);

    var lat1 = this.toRad(coordinate.latitude), lon1 = this.toRad(coordinate.longitude);
    var lat2 = Math.asin(Math.sin(lat1) * Math.cos(distance) +
                        Math.cos(lat1) * Math.sin(distance) * Math.cos(heading));

    var lon2 = lon1 + Math.atan2(Math.sin(heading) * Math.sin(distance) *
                                Math.cos(lat1),
                                Math.cos(distance) - Math.sin(lat1) *
                                Math.sin(lat2));

    if (isNaN(lat2) || isNaN(lon2)) return null;

    return {
      latitude: this.toDeg(lat2),
      longitude: this.toDeg(lon2)
    };
  }


  goToSettings(){
    const { navigation } = this.props;
    navigation.navigate('MapSettings');
  }

  render () {

    const { navigation } = this.props

    return (
      <View>
        <Header
          text="Map"
          leftIconOnPress={()=>navigation.openDrawer()}
        />
        <View style={styles.container}>
          <MapView
            ref="map"
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            customMapStyle={MapStyle}
            showsUserLocation={this.state.showsUserLocation}
            followsUserLocation={false}
            onLongPress={this.onLongPress.bind(this)}
            onPanDrag={this.onMapPanDrag.bind(this)}
            scrollEnabled={this.state.mapScrollEnabled}
            showsMyLocationButton={false}
            showsPointsOfInterest={false}
            showsScale={false}
            showsTraffic={false}
            toolbarEnabled={false}>
            <Circle
              key={this.state.stationaryLocation.timestamp}
              radius={this.state.stationaryRadius||200}
              fillColor={Theme.colors.stationaryRegionFillColor}
              strokeColor={Theme.colors.stationaryRegionStrokeColor}
              strokeWidth={1}
              center={{latitude: this.state.stationaryLocation.latitude, longitude: this.state.stationaryLocation.longitude}}
            />
            <Polyline
              tracksViewChanges={this.state.tracksViewChanges}
              key="polyline"
              coordinates={ this.state.coordinates }
              geodesic={true}
              strokeColor='rgba(0,179,253, 0.6)'
              strokeWidth={6}
              zIndex={0}
            />
            {this.renderMarkers()}
            {this.renderStopZoneMarkers()}
            {this.renderActiveGeofences()}
            {this.renderGeofencesHit()}
            {this.renderGeofencesHitEvents()}
          </MapView>
           {/* <MapView
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
           </MapView>*/}
           <Block row padding={[0,Theme.sizes.indent]} style={styles.bottomtab}>
              <Block>
                <Button ripple
                  color="secondary"
                  onPress={this.onClickGetCurrentPosition.bind(this)}
                  style={[styles.btn]}
                >
                  <Text white center> <FontAwesome icon={FaLightIcons.location}/></Text>
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
      </View>
    )
    }
}

const styles = StyleSheet.create({
  container: {
   // ...StyleSheet.absoluteFillObject,
   height: Device.winHeight-100,
   width: Device.winWidth,
   justifyContent: 'flex-end',
   alignItems: 'center',
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
 },
 stopZoneMarker: {
    borderWidth:1,
    borderColor: 'red',
    backgroundColor: "rgba(200,0,0,0.2)",
    opacity: 0.2,
    borderRadius: 15,
    zIndex: 0,
    width: 30,
    height: 30
  },
  geofenceHitMarker: {
    borderWidth: 1,
    borderColor:'black',
    borderRadius: 6,
    zIndex: 10,
    width: 12,
    height:12
  },
  markerIcon: {
    borderWidth:2,
    borderColor:Theme.colors.black,
    backgroundColor: Theme.colors.color2,
    width: 12,
    height: 12,
    borderRadius: 6
  },
});

const mapStateToProps = state => ({
  nav: state.nav,
})

export default connect(mapStateToProps)(Map)