import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { connect } from 'react-redux';
import { StackActions, NavigationActions } from 'react-navigation';
// import { google, facebook, twitter, tumblr } from 'react-native-simple-auth';
import {GoogleSignin, GoogleSigninButton, statusCodes} from 'react-native-google-signin';


import FontAwesome, { FaLightIcons, FaBrandIcons } from '../../components/icons';
import { Button, Block, Text, Input } from '../../components/';
import { SocialAuth } from '../../config/';
import { Theme } from '../../constants/';
import appStyles from '../../styles/';

class Login extends React.Component {

  static navigationOptions = {
    title: 'Login',
  }

  constructor(props) {
    super(props);
    this.state = {
      senderId: "0",
    };

  }

  componentDidMount(){
    GoogleSignin.configure();
  }

  googleSignin = ()=>{
    console.log("googleSignin");
    google({
      appId: '581159654063-9mcgh2119ikegrr6aer34rlv809ag30j.apps.googleusercontent.com',
      callback: 'com.transistorsoft.backgroundgeolocation.react:/oauth2redirect',
    }).then((info) => {
      console.log("info", info);
      // info.user - user details from the provider
      // info.credentials - tokens from the provider
    }).catch((error) => {
      console.log("error", error);
      // error.code
      // error.description
    });
  }

  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if(userInfo){
        const { navigation } = this.props;
        navigation.navigate('Home');
      }
      console.log("userInfo", userInfo);
      // this.setState({ userInfo });
    } catch (error) {
      console.log("error", error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  render () {

    const { navigation } = this.props;

    return (
      <View style={appStyles.container}>
        <Block row padding={[0,Theme.sizes.indent]}>
            <Block center>
              <GoogleSigninButton
              style={{ width: 192, height: 48 }}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={this.signIn}
              disabled={this.state.isSigninInProgress} />

            </Block>
          </Block>
          <Block row padding={[0,Theme.sizes.indent]}>
            <Block>
              <Button ripple
                onPress={() => navigation.navigate('Register')}
                style={[styles.btn]}
              >
                <Text black center title> Dont have account? <Text primary>Register Here</Text></Text>
              </Button> 
            </Block>
          </Block>
      </View>
    )
  }
}

const styles = StyleSheet.create({

})

export default connect()(Login)
