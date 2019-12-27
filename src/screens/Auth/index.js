import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { connect } from 'react-redux';
import { StackActions, NavigationActions } from 'react-navigation';


import FontAwesome, { FaLightIcons } from '../../components/icons';
import { Button, Block, Text, Input } from '../../components/';
import { Theme } from '../../constants/';

class Login extends React.Component {

  static navigationOptions = {
    title: 'Login',
  }

  constructor(props) {
    super(props);
    this.state = {
      senderId: "0"
    };

  }

  goTo(){
    const { navigation, nav } = this.props;
    navigation.navigate('Main');
    /*navigation.dispatch(StackActions.reset(
     {
        index: 0,
        actions: [
          navigation.navigate('Home')
        ]
      }));*/
    // navigation.navigate('MapSettings');
  }

  render () {

    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <Block row padding={[0,Theme.sizes.indent]} style={styles.bottomtab}>
            <Block>
              <Button ripple
                color="secondary"
                onPress={() => navigation.navigate('Home')}
                style={[styles.btn]}
              >
                <Text white center> <FontAwesome icon={FaLightIcons.location}/> Login</Text>
              </Button> 
            </Block>
            <Block>
              <Button ripple
                color="secondary"
                onPress={() => navigation.navigate('Register')}
                style={[styles.btn]}
              >
                <Text white center> <FontAwesome icon={FaLightIcons.location}/> Register</Text>
              </Button> 
            </Block>
          </Block>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
})

export default connect()(Login)
