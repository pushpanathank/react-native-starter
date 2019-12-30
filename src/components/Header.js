// https://github.com/WrathChaos/react-native-header-view
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, View, TouchableOpacity } from "react-native";
import FontAwesome, { FaLightIcons } from './icons';
import Button from './Button';

import { Theme } from '../constants/';

const HITSLOP = 10;
const hitslopObj = {
  top: HITSLOP,
  left: HITSLOP,
  right: HITSLOP,
  bottom: HITSLOP
};

const leftCompStyle = left => ({
  left,
  position: "absolute"
});

const rightCompStyle = right => ({
  right,
  position: "absolute"
});

const container = (height, width, backgroundColor) => ({
  top: 0,
  height,
  width,
  backgroundColor,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center"
});

const textStyle= {
  color: Theme.colors.white,
  fontSize: Theme.sizes.title,
  }

export default class Header extends Component {
  constructor(props){
    super(props);
  }
  render() {
    const {
      left,
      text,
      right,
      width,
      height,
      textStyle,
      leftDisable,
      leftIconName,
      leftIconType,
      leftIconSize,
      rightDisable,
      leftIconColor,
      rightIconName,
      rightIconType,
      rightIconSize,
      rightIconColor,
      leftIconOnPress,
      backgroundColor,
      rightIconOnPress,
      leftIconComponent,
      rightIconComponent
    } = this.props;
    return (
      <View style={container(height, width, backgroundColor)}>
        {!leftDisable && (
          <TouchableOpacity
            style={leftCompStyle(left)}
            hitSlop={hitslopObj}
            onPress={leftIconOnPress}
          >
            {leftIconComponent || (
              <FontAwesome
                icon={leftIconName}
                type={leftIconType}
                size={leftIconSize}
                color={leftIconColor}
              />
            )}
          </TouchableOpacity>
        )}
        <Text style={textStyle}>{text}</Text>
        {!rightDisable && (
          <TouchableOpacity
            style={rightCompStyle(right)}
            hitSlop={hitslopObj}
            onPress={rightIconOnPress}
          >
            {rightIconComponent || (
              <FontAwesome
                icon={rightIconName}
                type={rightIconType}
                size={rightIconSize}
                color={rightIconColor}
              />
            )}
          </TouchableOpacity>
        )}
      </View>
    );
    }
};

Header.propTypes = {
  left: PropTypes.number,
  right: PropTypes.number,
  text: PropTypes.string,
  leftIconName: PropTypes.string,
  leftIconType: PropTypes.string,
  leftIconColor: PropTypes.string,
  rightIconName: PropTypes.string,
  rightIconType: PropTypes.string,
  rightIconColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  leftIconSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  rightIconSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

Header.defaultProps = {
  left: Theme.sizes.indent,
  right: Theme.sizes.indent,
  height: Theme.sizes.headerHeight,
  width: "100%",
  leftIconSize: Theme.sizes.h5,
  rightIconSize: Theme.sizes.h3,
  text: "Mahizh",
  rightIconName: FaLightIcons.ellipsisV,
  rightIconType: "light",
  backgroundColor: Theme.colors.primary,
  leftIconType: "light",
  leftIconColor: Theme.colors.white,
  rightIconColor: Theme.colors.white,
  textStyle: textStyle,
  leftIconName: FaLightIcons.bars
};
