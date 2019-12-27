import React, { PureComponent } from 'react';
import { Text, StyleSheet } from 'react-native';

import { Theme } from '../../constants/';
import FaLightIcons from './FontAwesomeLight';
import FaBrandIcons from './FontAwesomeBrands';
import FaDuotoneIcons from './FontAwesomeDuotone';
import FaRegularIcons from './FontAwesomeRegular';
import FaSolidIcons from './FontAwesomeSolid';

class Icon extends PureComponent {
  setNativeProps(nativeProps) {
    this._root.setNativeProps(nativeProps);
  }

  render() {

    const { style, color, size, icon, type, ...props } = this.props;
    // const [code, type] = (icon || '').split('|')

    let IconType = null;
    switch(type){
      case 'brand':
        IconType = FaBrandIcons;
      break;
      case 'solid':
        IconType = FaSolidIcons;
      break;
      case 'duotone':
        IconType = FaDuotoneIcons;
      break;
      case 'light':
        IconType = FaLightIcons;
      break;
      default: //regular
        IconType = FaRegularIcons;
      break;

    }

    const font = { fontFamily: IconType._fontFamily || '' }

    return (
      <Text
        {...props}
        style={[styles.icon, { color:color|| Theme.colors.black , fontSize: size|| Theme.sizes.header }, style, font]}
        ref={component => this._root = component}
      >
        {icon}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    backgroundColor: 'transparent',
  },
});

export { FaLightIcons, FaBrandIcons, FaDuotoneIcons, FaRegularIcons, FaSolidIcons };
export default Icon;