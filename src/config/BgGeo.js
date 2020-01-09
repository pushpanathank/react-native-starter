import { AppCons, Strings, Theme } from '../constants/';
import BackgroundGeolocation from "react-native-background-geolocation";

const config = {
  desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
  distanceFilter:25,
  disableElasticity: false,
  elasticityMultiplier:4,
  geofenceProximityRadius:200,
  geofenceInitialTriggerEntry:false,
  stopAfterElapsedMinutes:1,
  desiredOdometerAccuracy:100,
  useSignificantChangesOnly:false,
  stopTimeout:1,
  disableMotionActivityUpdates:false,
  disableStopDetection:false,
  url: AppCons.baseURL + AppCons.addLocationUrl,
  autoSync: true,
  disableAutoSyncOnCellular: false,
  autoSyncThreshold:0,
  batchSync:false,
  maxBatchSize: 50,
  maxRecordsToPersist:-1,
  maxDaysToPersist:14,
  persistMode:BackgroundGeolocation.PERSIST_MODE_ALL,
  encrypt:false,
  stopOnTerminate:false,
  startOnBoot:true,
  heartbeatInterval:60,
  debug:true,
  logLevel:BackgroundGeolocation.LOG_LEVEL_VERBOSE,
  logMaxDays:3,
  locationUpdateInterval:3000,
  fastestLocationUpdateInterval:2000,
  deferTime:0,
  geofenceModeHighAccuracy:true,
  triggerActivities:'in_vehicle, on_bicycle, on_foot, running, walking',
  enableHeadless:true,
  foregroundService:true,
  forceReloadOnMotionChange:false,
  forceReloadOnLocationChange:false,
  forceReloadOnGeofence:false,
  forceReloadOnHeartbeat:false,
  notificationPriority:BackgroundGeolocation.NOTIFICATION_PRIORITY_DEFAULT,
  scheduleUseAlarmManager:true,
  notification: {
      layout: "",
      title: Strings.bgNotificationTitle,
      text: Strings.bgNotificationText,
      color: Theme.colors.primary,
      channelName: "TSLocationManager",
      smallIcon: "ic_launcher",
      largeIcon: "ic_launcher",
      priority: 0,
      strings: {},
      actions: []
  },
  speedJumpFilter:300,
  isMoving:true,
  stopOnStationary:false, //--
  locationsOrderDirection: "DESC",
  method: "POST",
  params: {
    userid:0
  },
  trackingMode:1
}

export default config;

/* 
export default {
  "activityRecognitionInterval": 10000,
  "allowIdenticalLocations": false,
  "autoSync": true,
  "autoSyncThreshold": 0,
  "batchSync": false,
  "configUrl": "",
  "debug": true,
  "deferTime": 0,
  "desiredAccuracy": 0,
  "desiredOdometerAccuracy": 10,
  "disableAutoSyncOnCellular": false,
  "disableElasticity": false,
  "disableLocationAuthorizationAlert": false,
  "disableMotionActivityUpdates": false,
  "disableStopDetection": false,
  "distanceFilter": 50,
  "elasticityMultiplier": 5,
  "enableHeadless": true,
  "enableTimestampMeta": false,
  "encrypt": false,
  "extras": {
  	"id":1
  },
  "fastestLocationUpdateInterval": 0,
  "forceReloadOnBoot": false,
  "forceReloadOnGeofence": false,
  "forceReloadOnHeartbeat": false,
  "forceReloadOnLocationChange": false,
  "forceReloadOnMotionChange": false,
  "forceReloadOnSchedule": false,
  "foregroundService": true,
  "geofenceInitialTriggerEntry": true,
  "geofenceModeHighAccuracy": true,
  "geofenceProximityRadius": 1000,
  "geofenceTemplate": "",
  "headers": {},
  "headlessJobService": "com.transistorsoft.rnbackgroundgeolocation.HeadlessTask",
  "heartbeatInterval": 60,
  "httpRootProperty": "location",
  "httpTimeout": 60000,
  "isMoving": true,
  "locationAuthorizationRequest": "Always",
  "locationTemplate": "",
  "locationTimeout": 60,
  "locationUpdateInterval": 1000,
  "locationsOrderDirection": "ASC",
  "logLevel": 5,
  "logMaxDays": 3,
  "maxBatchSize": -1,
  "maxDaysToPersist": 14,
  "maxRecordsToPersist": -1,
  "method": "POST",
  "minimumActivityRecognitionConfidence": 75,
  "notification": {
    "layout": "",
    "title": Strings.bgNotificationTitle,
    "text": Strings.bgNotificationText,
    "color": "",
    "channelName": "TSLocationManager",
    "smallIcon": "ic_launcher",
    "largeIcon": "ic_launcher",
    "priority": 0,
    "strings": {},
    "actions": []
  },
  "params": {
  	"userid":1
  },
  "persist": true,
  "persistMode": 2,
  "schedule": [],
  "scheduleUseAlarmManager": false,
  "speedJumpFilter": 300,
  "startOnBoot": true,
  "stationaryRadius": 25,
  "stopAfterElapsedMinutes": 0,
  "stopOnStationary": false,
  "stopOnTerminate": false,
  "stopTimeout": 1,
  "triggerActivities": "in_vehicle, on_bicycle, on_foot, running, walking",
  "url": AppCons.baseURL + AppCons.addLocationUrl,
  "useSignificantChangesOnly": false,
  "enabled": true,
  "schedulerEnabled": false,
  "trackingMode": 1,
  "odometer": 0,
  "isFirstBoot": false,
  "didLaunchInBackground": false
}
*/