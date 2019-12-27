import React,{Component} from 'react'

import {
  StyleSheet,
  View
} from 'react-native';

import BackgroundGeolocation from "react-native-background-geolocation";

import { Theme } from '../../constants/';
import { Button, Block, Text, Input, Switch } from '../../components/';
import { Device } from '../../utils/';

export default class GeofenceView extends Component<any, any> {
  static navigationOptions = {
    title: 'Geofence',
  }
  constructor(props:any) {
    super(props);
    this.state = {
      identifier: undefined,
      radius: '50',
      notifyOnEntry: true,
      notifyOnExit: true,
      notifyOnDwell: true,
      loiteringDelay: '0'
    }
  }

  onClickCancel() {
    this.props.navigation.goBack();
  }

  onAddGeofence() {
    console.log('- onAddGeofence', this.state);

    let coordinate = this.props.navigation.state.params.coordinate;
    let radius = parseInt(this.state.radius, 10);
    let loiteringDelay = parseInt(this.state.loiteringDelay, 10);

    BackgroundGeolocation.addGeofence({
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
      identifier: this.state.identifier,
      radius: radius,
      notifyOnEntry: this.state.notifyOnEntry,
      notifyOnExit: this.state.notifyOnExit,
      notifyOnDwell: this.state.notifyOnDwell,
      extras: { // For tracker.transistorsoft.com to render geofence hits.
        radius: radius,
        center: coordinate
      }
    }, () => {
      console.log('- addGeofence success');
    }, (error) => {
      console.warn('- addGeofence error: ', error);
    });

    this.props.navigation.goBack();
  }

  onChangeText(field:any, value:any) {
    let state:any = {};
    state[field] = value;
    this.setState(state);
  }

  onToggle(field:any, value:any) {
    let state:any = {};
    state[field] = value;
    this.setState(state);
  }

  render() {
    return (
      <View style={styles.container}>
        <Block row center space="between" style={styles.row}>
            <Block>
              <Text>Identifier</Text>
            </Block>
            <Block>
              <Input
                  textColor={Theme.colors.black}
                  borderColor={Theme.colors.black}
                  activeBorderColor={Theme.colors.black}
                  returnKeyType={"next"}
                  value={this.state.identifier}
                  onChangeText={value => {this.onChangeText('identifier', value);}}
                />
            </Block>
        </Block>
        <Block row center space="between" style={styles.row}>
            <Block>
              <Text>Radius (meters)</Text>
            </Block>
            <Block>
              <Input
                  textColor={Theme.colors.black}
                  borderColor={Theme.colors.black}
                  activeBorderColor={Theme.colors.black}
                  returnKeyType={"next"}
                  value={this.state.radius}
                  onChangeText={value => {this.onChangeText('radius', value);}}
                />
            </Block>
        </Block>
        <Block row center space="between" style={styles.row}>
            <Block>
              <Text>Notify on Entry</Text>
            </Block>
            <Block>
              <Switch
                value={this.state.notifyOnEntry}
                onValueChange={(value) => {this.onToggle('notifyOnEntry', value)}}
              />
            </Block>
        </Block>
        <Block row center space="between" style={styles.row}>
            <Block>
              <Text>Notify on Exit</Text>
            </Block>
            <Block>
              <Switch
                value={this.state.notifyOnExit}
                onValueChange={(value) => {this.onToggle('notifyOnExit', value)}}
              />
            </Block>
        </Block>
        <Block row center space="between" style={styles.row}>
            <Block>
              <Text>Notify on Dwell</Text>
            </Block>
            <Block>
              <Switch
                value={this.state.notifyOnDwell}
                onValueChange={(value) => {this.onToggle('notifyOnDwell', value)}}
              />
            </Block>
        </Block>
        <Block row center space="between" style={styles.row}>
            <Block>
              <Text>Loitering delay (ms)</Text>
            </Block>
            <Block>
              <Input
                  textColor={Theme.colors.black}
                  borderColor={Theme.colors.black}
                  activeBorderColor={Theme.colors.black}
                  returnKeyType={"next"}
                  value={this.state.loiteringDelay}
                  onChangeText={value => {this.onChangeText('loiteringDelay', value);}}
                />
            </Block>
        </Block>
        <Block row center space="between" style={styles.row}>
            <Block>
              <Button ripple
                color="gray"
                onPress={() => this.onClickCancel()}
                style={[styles.btn]}
              >
                <Text white center > Back </Text>
              </Button>
            </Block>
            <Block>
              <Button ripple
                color="secondary"
                onPress={() => this.onAddGeofence()}
                style={[styles.btn]}
              >
                <Text white center > Add </Text>
              </Button>
            </Block>
        </Block>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    height: Device.winHeight-100,
    width: Device.winWidth,
    padding: Theme.sizes.indent
  },
  header: {
    backgroundColor: '#fedd1e'
  },
  title: {
    color: '#000'
  },
  content: {},
  headerItem: {
    marginTop: 20,
    marginLeft: 0,
    paddingLeft: 10,
    paddingBottom: 5,
    backgroundColor: "transparent"
  },
  formItem: {
    backgroundColor: "#fff",
    paddingLeft: 10,
    minHeight: 50,
    marginLeft: 0
  },
  label: {
    color: Theme.colors.secondary,
  },
  switch: {
    marginRight: 10
  }
});
