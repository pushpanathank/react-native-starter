import { Platform, StatusBar } from 'react-native';
import { Scaling } from '../utils/';

const baseSize = 16;
const indent = Scaling.moderateScale(baseSize);

const colors = {

  primary: '#7f71e7',
  primaryDark: '#695bd1',
  primaryLight: '#B4AEE8',
  secondary: '#f58c23',
  secondaryDark: '#BC6207',
  secondaryLight: '#F49F49',
  accent: "#F3534A",
  tertiary: "#FFE358",
  white: '#FFFFFF',
  lightWhite:'#dfdfdf',
  black:'#323643',
  lightBlack:'#50535d',
  lightBlack1:'#696b72',
  red:'#ee0701',
  green:'#24b124',
  gray: "#838a9c",
  gray2: "#acb5c1",
  gray3: "#8d96a2",
};

const sizes = {
  // global sizes
  base: baseSize,
  font: 14,
  radius: 0,
  padding: 25,

  // font sizes
  h1: 36,
  h2: 31,
  h3: 28,
  h4: 24,
  h5: 20,
  title: 18,
  header: 16,
  body: 14,
  caption: 12,
  small: 10,

  // General
  indent:indent,
  indentsmall:Scaling.moderateScale(indent / 3),
  indenthalf:Scaling.moderateScale(indent / 2),
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