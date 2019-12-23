import React from 'react'
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native'
import { connect } from 'react-redux';


import FontAwesome, { FaLightIcons } from '../components/icons';
import { NotifService } from '../utils/';
import { AppCons } from '../constants/';

class Home extends React.Component {

  static navigationOptions = {
    title: 'Home',
  }

  constructor(props) {
    super(props);
    this.state = {
      // senderId: AppCons.gcmSenderId
    };

    this.notif = new NotifService(this.onRegister.bind(this), this.onNotif.bind(this));
  }

  onRegister(token) {
    console.log(token);
    Alert.alert("Registered !", JSON.stringify(token));
    this.setState({ registerToken: token.token, gcmRegistered: true });
  }

  onNotif(notif) {
    console.log(notif);
    Alert.alert(notif.title, notif.message);
  }

  handlePerm(perms) {
    Alert.alert("Permissions", JSON.stringify(perms));
  }

  render () {

    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.description}>
          <Text style={styles.descriptionText}>Tap the back button on your android phone.</Text>
        </View>
        <View style={styles.actions}>
          <Button style={styles.btn} title='Go To Counter Page' onPress={() => {navigation.navigate('Counter')}}>Go To Counter Page</Button>
        </View>

        <View style={styles.actions}>
          <Button style={styles.btn} title='Go To Map Page' onPress={() => {navigation.navigate('Map')}}>Go To Map Page</Button>
        </View>

        <FontAwesome style={styles.icon} icon={FaLightIcons.snowflakes} type={'light'}/>

        <TextInput style={styles.textField} value={this.state.registerToken} placeholder="Register token" />

        <TouchableOpacity style={styles.button} onPress={() => { this.notif.localNotif() }}><Text>Local Notification (now)</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => { this.notif.scheduleNotif() }}><Text>Schedule Notification in 30s</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => { this.notif.cancelNotif() }}><Text>Cancel last notification (if any)</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => { this.notif.cancelAll() }}><Text>Cancel all notifications</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => { this.notif.checkPermission(this.handlePerm.bind(this)) }}><Text>Check Permission</Text></TouchableOpacity>
        <TextInput style={styles.textField} value={this.state.senderId} onChangeText={(e) => {this.setState({ senderId: e })}} placeholder="GCM ID" />
        <TouchableOpacity style={styles.button} onPress={() => { this.notif.configure(this.onRegister.bind(this), this.onNotif.bind(this), this.state.senderId) }}><Text>Configure Sender ID</Text></TouchableOpacity>
        {this.state.gcmRegistered && <Text>GCM Configured !</Text>}

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  description: {
    alignItems: 'center',
  },
  descriptionText: {
    color: '#444',
    fontSize: 24,
    fontFamily: 'Quicksand-Bold'
  },
  actions: {
    marginTop: 10,
  },
  btn: {
    flexGrow: 1,
  },




  button: {
    borderWidth: 1,
    borderColor: "#AAAAAA",
    margin: 5,
    padding: 5,
    width: "100%",
    borderRadius: 0,
    backgroundColor: "#AAAAAA",
  },
  textField: {
    borderWidth: 1,
    borderColor: "#AAAAAA",
    margin: 5,
    padding: 5,
    width: "70%"
  },
})

export default connect()(Home)
