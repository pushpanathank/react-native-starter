import React, { Component } from 'react'
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native'
import { connect } from 'react-redux';


import FontAwesome, { FaLightIcons } from '../../components/icons';
import { AppCons } from '../../constants/';

class Login extends React.Component {

  static navigationOptions = {
    title: 'Login',
  }

  constructor(props) {
    super(props);
    this.state = {
      senderId: AppCons.gcmSenderId
    };

  }

  render () {

    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <Text>Login page</Text>
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
