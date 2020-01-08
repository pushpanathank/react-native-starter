import React, { Component, memo } from 'react';
import { StyleSheet, Image } from 'react-native';

import Block from './Block';
import Text from './Text';
import { Theme } from '../constants';
import AllImages from "../assets/images/";
import appStyles from "../styles";

const fullLoader = class FullLoader extends Component {
  render() {
    return (
      <Block center middle column>
          <Image
            style={appStyles.loadingLogo}
            source={AllImages.logo}
            resizeMode="contain"
          />
        <Text h4>Loading...</Text>
      </Block>
    )
  }
}

export default memo(fullLoader);