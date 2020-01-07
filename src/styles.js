import { StyleSheet } from 'react-native';
import { Theme } from './constants/';
import { Device, Scaling } from './utils/';

export default StyleSheet.create({
    row: {
        flex: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Theme.colors.white,
        height: Device.winHeight-Theme.sizes.headerHeight,
        width: Device.winWidth,
    },

    textbox:{
        color: Theme.colors.black,
        width: '100%',
        paddingLeft:Theme.sizes.indent,
        paddingRight:Theme.sizes.indent,
        fontFamily: 'Font-Regular',
        fontSize:Theme.sizes.body,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: Theme.colors.black,
        borderRadius: Theme.sizes.radius,
        fontSize: Theme.sizes.font,
        color: Theme.colors.black,
        height: Theme.sizes.base * 3,
    },
    inputError:{
        fontFamily: 'Font-Regular',
        color: Theme.colors.red,
        bottom:Theme.sizes.indentsmall,
        right:Theme.sizes.indentsmall,
        position:'absolute',
        fontSize:Theme.sizes.caption
    },
    inputLeftIcon:{
        position:'absolute', 
        left:0,
        bottom:10,
        paddingHorizontal:Theme.sizes.indent
    },
    inputRightIcon:{
        position:'absolute', 
        right:0,
        bottom:10,
        paddingHorizontal:Theme.sizes.indent
    },

    loginLogo:{
        width: Scaling.moderateScale(130)
    },

    mapContainer: {
        // ...StyleSheet.absoluteFillObject,
        height: Device.winHeight-(Theme.sizes.headerHeight-30),
        width: Device.winWidth,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    mapView: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#ffffff'
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
    mapFooter:{
        position:'absolute', 
        bottom:50, 
        width: '100%'
    },
    mapBtns:{
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mapBtnBottomLeft:{
        left:0,
        bottom:40
    },
    mapBtnBottomRight:{
        right:0,
        bottom:40
    },

});