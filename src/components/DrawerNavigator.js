import React from "react";
import { View, StyleSheet } from "react-native";
import { DrawerItems } from "react-navigation-drawer";

import appStyles from '../styles';
import { Theme } from '../constants';
import Button from './Button';
import Text from './Text';

const DrawerNavigator = props => (
  <View style={[appStyles.row]}>
    <DrawerItems
      activeBackgroundColor={Theme.colors.secondary}
      activeTintColor={Theme.colors.black}
      iconContainerStyle={styles.icons}
      {...props}
    />
    <Button onPress={()=> props.navigation.navigate('Login')}><Text>Logout</Text></Button>
  </View>
);

const styles = StyleSheet.create({
  icons: {
    width: 30
  }
});

export default DrawerNavigator;