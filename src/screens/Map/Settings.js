import React from 'react';
import { View, StyleSheet, TextInput, Alert, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import AsyncStorage from '@react-native-community/async-storage';

import FontAwesome, { FaLightIcons } from '../../components/icons';
import { Button, Block, Text, Input } from '../../components/';
import { BgGeoConfig } from '../../config/';
import { Theme, AppCons } from '../../constants/';
import { Device } from '../../utils/';


const STORAGE_KEY:string = "@pushapp:";
let _BgGeoConfig = {...BgGeoConfig};

class MapSettings extends React.Component {

  static navigationOptions = {
    title: 'MapSettings new',
  }

  constructor(props) {
    super(props);
    this.getConfig();
    this.state = {
        desiredAccuracy: ''+_BgGeoConfig.desiredAccuracy,
        distanceFilter: ''+_BgGeoConfig.distanceFilter,
        elasticityMultiplier: ''+_BgGeoConfig.elasticityMultiplier,
        desiredOdometerAccuracy: ''+_BgGeoConfig.desiredOdometerAccuracy,
        locationUpdateInterval: ''+_BgGeoConfig.locationUpdateInterval,
        fastestLocationUpdateInterval: ''+_BgGeoConfig.fastestLocationUpdateInterval,
        url: _BgGeoConfig.url,
        userid: ''+_BgGeoConfig.params.userid,
    }
  }

  async getConfig(){
    let config = await AsyncStorage.getItem(STORAGE_KEY+"BgGeoConfig");
    _BgGeoConfig = config ? JSON.parse(config) : {...BgGeoConfig};
    this.setState({
        desiredAccuracy: ''+_BgGeoConfig.desiredAccuracy,
        distanceFilter: ''+_BgGeoConfig.distanceFilter,
        elasticityMultiplier: ''+_BgGeoConfig.elasticityMultiplier,
        desiredOdometerAccuracy: ''+_BgGeoConfig.desiredOdometerAccuracy,
        locationUpdateInterval: ''+_BgGeoConfig.locationUpdateInterval,
        fastestLocationUpdateInterval: ''+_BgGeoConfig.fastestLocationUpdateInterval,
        url: _BgGeoConfig.url,
        userid: ''+_BgGeoConfig.params.userid,
    });
  }

  onInputChange(key,val,type){
    // type = 0->string, 1->int
    this.setState({
      [key]: val
    });
    let config = {..._BgGeoConfig};
    switch(type){
      case 1:
        if(key=='userid' && parseInt(val)>=0){
          config['params']={
            userid:parseInt(val)
          }
        }else{
          config[key] = parseInt(val);
        }
      break;
      default:
        config[key] = val;
      break;
    }
    _BgGeoConfig = config;
    // console.log("_BgGeoConfig", config);
    AsyncStorage.setItem(STORAGE_KEY+"BgGeoConfig", JSON.stringify(config));
  }

  saveSettings(){
    BackgroundGeolocation.ready(_BgGeoConfig, (state:State) => {
      console.log('- state: ', state);
      BackgroundGeolocation.stop();
      if (state.enabled) {
        BackgroundGeolocation.start((state:State) => {
          console.log("- Start success");
        });
      }
    }, (error:string) => {
      console.warn('BackgroundGeolocation error: ', error)
    });
  }

  render () {

    const { navigation } = this.props

    return (
      <ScrollView style={styles.container}>
          <Block row padding={[0,Theme.sizes.indent]}>
            <Block>
              <Text h3>Map</Text>
            </Block>
          </Block>
         <Block row padding={[0,Theme.sizes.indent]}>
            <Block>
              <Text>desiredAccuracy</Text>
              <Text>-2, -1, 0, 10, 100, 1000</Text>
            </Block>
            <Block>
              <Input
                  textColor={Theme.colors.black}
                  borderColor={Theme.colors.black}
                  activeBorderColor={Theme.colors.black}
                  returnKeyType={"next"}
                  value={this.state.desiredAccuracy}
                  onChangeText={value => {this.onInputChange("desiredAccuracy", value, 1);}}
                />
            </Block>
          </Block>
          <Block row padding={[0,Theme.sizes.indent]}>
            <Block>
              <Text>distanceFilter</Text>
              <Text>0, 10, 20, 50, 100, 500</Text>
            </Block>
            <Block>
              <Input
                  textColor={Theme.colors.black}
                  borderColor={Theme.colors.black}
                  activeBorderColor={Theme.colors.black}
                  returnKeyType={"next"}
                  value={this.state.distanceFilter}
                  onChangeText={value => {this.onInputChange("distanceFilter", value, 1 );}}
                />
            </Block>
          </Block>
          <Block row padding={[0,Theme.sizes.indent]}>
            <Block>
              <Text>elasticityMultiplier</Text>
              <Text>0, 1, 2, 3, 5, 10</Text>
            </Block>
            <Block>
              <Input
                  textColor={Theme.colors.black}
                  borderColor={Theme.colors.black}
                  activeBorderColor={Theme.colors.black}
                  returnKeyType={"next"}
                  value={this.state.elasticityMultiplier}
                  onChangeText={value => {this.onInputChange("elasticityMultiplier", value, 1);}}
                />
            </Block>
          </Block>
          <Block row padding={[0,Theme.sizes.indent]}>
            <Block>
              <Text>desiredOdometerAccuracy</Text>
              <Text>10, 20, 50, 100, 500</Text>
            </Block>
            <Block>
              <Input
                  textColor={Theme.colors.black}
                  borderColor={Theme.colors.black}
                  activeBorderColor={Theme.colors.black}
                  returnKeyType={"next"}
                  value={this.state.desiredOdometerAccuracy}
                  onChangeText={value => {this.onInputChange("desiredOdometerAccuracy", value, 1);}}
                />
            </Block>
          </Block>
          <Block row padding={[0,Theme.sizes.indent]}>
            <Block>
              <Text>locationUpdateInterval</Text>
              <Text>0, 1000, 5000, 10000, 30000, 60000</Text>
            </Block>
            <Block>
              <Input
                  textColor={Theme.colors.black}
                  borderColor={Theme.colors.black}
                  activeBorderColor={Theme.colors.black}
                  returnKeyType={"next"}
                  value={this.state.locationUpdateInterval}
                  onChangeText={value => {this.onInputChange("locationUpdateInterval", value, 1);}}
                />
            </Block>
          </Block>
          <Block row padding={[0,Theme.sizes.indent]}>
            <Block>
              <Text>fastestLocationUpdateInterval</Text>
              <Text>0, 1000, 5000, 10000, 30000, 60000</Text>
            </Block>
            <Block>
              <Input
                  textColor={Theme.colors.black}
                  borderColor={Theme.colors.black}
                  activeBorderColor={Theme.colors.black}
                  returnKeyType={"next"}
                  value={this.state.fastestLocationUpdateInterval}
                  onChangeText={value => {this.onInputChange("fastestLocationUpdateInterval", value, 1);}}
                />
            </Block>
          </Block>
          <Block row padding={[0,Theme.sizes.indent]}>
            <Block>
              <Input
                  textColor={Theme.colors.black}
                  borderColor={Theme.colors.black}
                  activeBorderColor={Theme.colors.black}
                  returnKeyType={"next"}
                  value={this.state.url}
                  onChangeText={value => {this.onInputChange("url", value, 0);}}
                />
            </Block>
          </Block>
          <Block row padding={[0,Theme.sizes.indent]}>
            <Block>
              <Text h3>User</Text>
            </Block>
          </Block>
         <Block row padding={[0,Theme.sizes.indent]}>
            <Block>
              <Text>userid</Text>
            </Block>
            <Block>
              <Input
                  textColor={Theme.colors.black}
                  borderColor={Theme.colors.black}
                  activeBorderColor={Theme.colors.black}
                  returnKeyType={"next"}
                  value={this.state.userid}
                  onChangeText={value => {this.onInputChange("userid", value, 1);}}
                />
            </Block>
          </Block>
          <Block row padding={[0,Theme.sizes.indent]} style={styles.bottomtab}>
            <Block>
              <Button ripple
                color="secondary"
                onPress={() => this.saveSettings()}
                style={[styles.btn]}
              >
                <Text white center> <FontAwesome icon={FaLightIcons.location}/> Login</Text>
              </Button> 
            </Block>
            <Block>
              <Button ripple
              color="secondary"
                onPress={() => this.props.navigation.openDrawer()}
                style={[{marginTop:0}]}
              >
                <Text>Menu</Text>
              </Button>
            </Block>
          </Block>
       </ScrollView>
    )
    }
}

const styles = StyleSheet.create({
  container: {
   height: Device.winHeight,
   width: Device.winWidth,
 },

})

export default connect()(MapSettings)