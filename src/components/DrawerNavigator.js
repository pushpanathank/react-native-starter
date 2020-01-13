import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { connect } from 'react-redux';
import { DrawerItems } from "react-navigation-drawer";
import {GoogleSignin, GoogleSigninButton, statusCodes} from 'react-native-google-signin';

import { AuthActions } from "../store/actions/";
import appStyles from '../styles';
import { Theme } from '../constants';
import Button from './Button';
import Block from './Block';
import Text from './Text';

class DrawerNavigator extends React.Component {

  constructor(props) {
    super(props);
  }

  signOut = async () => {
    try {
      await GoogleSignin.configure();
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.props.logout();
      this.props.navigation.navigate('Login');
    } catch (error) {
      console.error(error);
    }
  };

  render () {

    return (
      <View style={[appStyles.row]}>
        <View style={appStyles.drawerHeader}>
          <Image style={appStyles.profilePic} source={{uri:this.props.user.photo}} />
          <Block padding={10}>
            <Text center>~~Welcome~~</Text>
            <Text h4 white>{this.props.user.name}</Text>
          </Block>
        </View>
        <DrawerItems
          activeBackgroundColor={Theme.colors.secondary}
          activeTintColor={Theme.colors.black}
          iconContainerStyle={styles.icons}
          {...this.props}
        />

        <Button style={appStyles.logoutBtn} onPress={()=> this.signOut()}><Text center header>Logout</Text></Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  icons: {
    width: 30
  },
  
});

const mapStateToProps = (state) => {
  return {
    user: state.Auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
      logout: () => dispatch(AuthActions.Logout()),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawerNavigator);