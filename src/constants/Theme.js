import { Platform, StatusBar } from 'react-native';
import { Scaling } from '../utils/';

const baseSize = 14;
const indent = Scaling.moderateScale(baseSize);
// #ff8fad, #31c9f3, #ffc654, #ff8352
const colors = {

  /*primary: '#31c9f3',
  primaryDark: '#228CAA',
  primaryLight: '#228CAA',
  secondary: '#ff8352',
  secondaryDark: '#B25B39',
  secondaryLight: '#FFA885',*/

  primary: '#ff8352',
  primaryDark: '#B25B39',
  primaryLight: '#FFA885',
  secondary: '#ffc654',
  secondaryDark: '#B28A3A',
  secondaryLight: '#FFD787',

  color1: '#ff8fad',
  color2: '#31c9f3',

  white: '#FFFFFF',
  lightWhite:'#dfdfdf',
  black:'#323643',
  lightBlack:'#50535d',
  red: "#dc1f1a",
  yellow: "#edc914",
  green:'#24b124',
  gray: "#696b72",
  gray2: "#838a9c",
  gray3: "#acb5c1",

  stationaryRegionFillColor: "rgba(200,0,0,0.2)",
  stationaryRegionStrokeColor: "rgba(200,0,0,0.2)",
  geofenceStrokeColor: "rgba(17,183,0,0.5)",
  geofenceFillColor:"rgba(17,183,0,0.2)",
  geofenceStrokeColorActivated: "rgba(127,127,127,0.5)",
  geofenceFillColorActivated: "rgba(127,127,127, 0.2)",
  polylineStrokeColor: "rgba(54, 4, 191, 0.8)",
};

const sizes = {
  // global sizes
  base: baseSize,
  radius: 0,
  padding: Scaling.moderateScale(baseSize,7.5),

  // font sizes
  h1: Scaling.moderateScale(baseSize,16.5),
  h2: Scaling.moderateScale(baseSize,13.5),
  h3: Scaling.moderateScale(baseSize,10.5),
  h4: Scaling.moderateScale(baseSize,7.5),
  h5: Scaling.moderateScale(baseSize,4.5),
  title: Scaling.moderateScale(baseSize,3),
  header: Scaling.moderateScale(baseSize,1.5),
  body: Scaling.moderateScale(baseSize,0),
  caption: Scaling.moderateScale(baseSize,-1.5),
  small: Scaling.moderateScale(baseSize,-3.0),

  // General
  indent:indent,
  indentSmall:Scaling.moderateScale(indent / 3),
  indentHalf:Scaling.moderateScale(indent / 2),
  indent2x:Scaling.moderateScale(indent * 2),
  indent3x:Scaling.moderateScale(indent * 3),
  indent4x:Scaling.moderateScale(indent * 4),
  indent5x:Scaling.moderateScale(indent * 5),
  indent6x:Scaling.moderateScale(indent * 6),
  indentY:Scaling.verticalScale(indent),
  indentYhalf:Scaling.verticalScale(indent / 2),
  indentY2x:Scaling.verticalScale(indent * 2),
  indentY3x:Scaling.verticalScale(indent * 3),
  indentY4x:Scaling.verticalScale(indent * 4),
  iconSize:Scaling.moderateScale(baseSize*2),
  midIconSize:Scaling.moderateScale(baseSize*2.5),
  bigIconSize:Scaling.moderateScale(baseSize*3),
};

const fonts = {
  h1: {
    fontSize: sizes.h1
  },
  h2: {
    fontSize: sizes.h2
  },
  h3: {
    fontSize: sizes.h3
  },
  h4: {
    fontSize: sizes.h4
  },
  h5: {
    fontSize: sizes.h5
  },
  header: {
    fontSize: sizes.header
  },
  title: {
    fontSize: sizes.title
  },
  body: {
    fontSize: sizes.body
  },
  caption: {
    fontSize: sizes.caption
  },
  small: {
    fontSize: sizes.small
  },
};


export default { colors, sizes, fonts };