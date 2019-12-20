import { Dimensions, Platform, StatusBar } from 'react-native';

const { width, height } = Dimensions.get('window');

export const winWidth= width;
export const winHeight= height;
export const statusBarHeight = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
export const isSmallDevice= width < 375;
