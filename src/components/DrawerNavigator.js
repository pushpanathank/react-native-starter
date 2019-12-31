import React from "react";
import { View, StyleSheet } from "react-native";
import { connect } from 'react-redux';
import { DrawerItems } from "react-navigation-drawer";
import {GoogleSignin, GoogleSigninButton, statusCodes} from 'react-native-google-signin';

import { AuthActions } from "../store/actions/";
import appStyles from '../styles';
import { Theme } from '../constants';
import Button from './Button';
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
        <DrawerItems
          activeBackgroundColor={Theme.colors.secondary}
          activeTintColor={Theme.colors.black}
          iconContainerStyle={styles.icons}
          {...this.props}
        />

        <Button style={styles.logoutBtn} onPress={()=> this.signOut()}><Text center header>Logout</Text></Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  icons: {
    width: 30
  },
  logoutBtn:{
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: Theme.colors.primary,
    marginBottom: 0,
    height: 50
  }
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