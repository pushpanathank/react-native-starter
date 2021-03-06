import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import _ from 'lodash'; 
import { connect } from 'react-redux';
import { StackActions, NavigationActions } from 'react-navigation';
import {GoogleSignin, GoogleSigninButton, statusCodes} from 'react-native-google-signin';
import { RNToasty } from 'react-native-toasty';

import AllImages from "../../assets/images/";
import { AuthActions } from "../../store/actions/";
import FontAwesome, { FaLightIcons, FaBrandIcons } from '../../components/icons';
import { Button, Block, Text, Input } from '../../components/';
import { SocialAuth } from '../../config/';
import { Theme } from '../../constants/';
import appStyles from '../../styles/';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      senderId: "0",
    };

  }

  componentDidMount(){
    if(this.props.user!=null && this.props.user.user_id>0){
      this.props.navigation.navigate('Home');
    }
  }

  googleSignIn = async () => {
    const { navigation } = this.props;
    try {
      await GoogleSignin.configure();
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signIn().then((userInfo)=>{
        if(userInfo){
          this.props.loginWithGoogle(userInfo.user).then(res => {
            if(this.props.user.user_id>0){
              navigation.navigate('Home');
            }
          })
          .catch(error => {
            const messages = _.get(error, 'response.data.error')
            message = (_.values(messages) || []).join(',')
            if (message){
              RNToasty.Error({title: message});
            }
           console.log(`
              Error messages returned from server:`, messages )
          });
        }
      });
      /*const userInfo = await GoogleSignin.signIn();
      console.log("userInfo", userInfo.user);
      if(userInfo.hasOwnProperty('user')){
        this.props.login(userInfo);
        navigation.navigate('Home');
      }*/
      // this.setState({ userInfo });
    } catch (error) {
      console.log(error.code);
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

    return (
      <View style={appStyles.container}>
          <Block column={2}>
            <Block center>
              <Image
                style={appStyles.loginLogo}
                source={AllImages.logo}
                resizeMode="contain"
              />
            </Block>
          </Block>
          <Block column={1}>
            <Block center middle>
              <GoogleSigninButton
                style={{ width: 192, height: 48, backgroundColor: Theme.colors.primary, borderRadius:0 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Light}
                onPress={this.googleSignIn}
                disabled={this.state.isSigninInProgress} />

            </Block>
          </Block>
          { /* <Block row padding={[0,Theme.sizes.indent]}>
            <Block>
              <Button ripple
                onPress={() => navigation.navigate('Register')}
                style={[styles.btn]}
              >
                <Text black center title> Dont have account? <Text primary>Register Here</Text></Text>
              </Button> 
            </Block>
          </Block> */ }
      </View>
    )
  }
}

const styles = StyleSheet.create({

})

const mapStateToProps = (state) => {
  return {
    user: state.Auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
      loginWithGoogle: (values) => dispatch(AuthActions.LoginWithGoogle(values)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);