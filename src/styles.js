import { StyleSheet } from 'react-native';
import { Theme } from './constants/';

export default StyleSheet.create({
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

});