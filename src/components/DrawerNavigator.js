import React from "react";
import { View, StyleSheet } from "react-native";
import { DrawerItems } from "react-navigation-drawer";

const DrawerNavigator = props => (
  <View style={[styles.container]}>
    <DrawerItems
      activeBackgroundColor={"black"}
      activeTintColor={"white"}
      iconContainerStyle={styles.icons}
      {...props}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  icons: {
    width: 30
  }
});

export default DrawerNavigator;