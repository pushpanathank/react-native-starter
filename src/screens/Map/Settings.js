import React from 'react';
import { View, StyleSheet, TextInput, Alert, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import AsyncStorage from '@react-native-community/async-storage';

import FontAwesome, { FaLightIcons } from '../../components/icons';
import { Button, Block, Text, Input, Header, MenuOptionMap } from '../../components/';
import { BgGeoConfig } from '../../config/';
import { Theme, AppCons } from '../../constants/';
import { Device } from '../../utils/';
import appStyles from '../../styles/';


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
        optMenu:null,
        deferTime: ''+_BgGeoConfig.deferTime
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
        deferTime: ''+_BgGeoConfig.deferTime
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
      BackgroundGeolocation.removeListeners(() => {
        BackgroundGeolocation.stop();
        if (state.enabled) {
          BackgroundGeolocation.start((state:State) => {
            console.log("- Start success");
          });
        }
      });
    }, (error:string) => {
      console.warn('BackgroundGeolocation error: ', error)
    });
  }

  assignMenuref = (ref) =>{
    this.setState({
      optMenu: ref
    });
  }

  render () {

    const { navigation } = this.props;

    return (
      <View style={appStyles.row}>
        <Header
          text="Map Settings"
          leftIconName={FaLightIcons.arrowLeft}
          leftIconOnPress={()=>navigation.goBack()}
          rightIconComponent={<MenuOptionMap menuref={this.assignMenuref} navigation={navigation} />}
          rightIconOnPress={()=>this.state.optMenu.show()}
        />
        <ScrollView style={[appStyles.row,{padding: Theme.sizes.indent}]}>
            <Block row>
              <Block>
                <Text h4 center>Map</Text>
              </Block>
            </Block>
           <Block row>
              <Block>
                <Text>desiredAccuracy</Text>
                <Text small>-2, -1, 0, 10, 100, 1000</Text>
              </Block>
              <Input
                  textColor={Theme.colors.black}
                  borderColor={Theme.colors.black}
                  activeBorderColor={Theme.colors.black}
                  returnKeyType={"next"}
                  value={this.state.desiredAccuracy}
                  onChangeText={value => {this.onInputChange("desiredAccuracy", value, 1);}}
                />
            </Block>
            <Block row>
              <Block>
                <Text>distanceFilter</Text>
                <Text small>0, 10, 20, 50, 100, 500</Text>
              </Block>
              <Input
                  textColor={Theme.colors.black}
                  borderColor={Theme.colors.black}
                  activeBorderColor={Theme.colors.black}
                  returnKeyType={"next"}
                  value={this.state.distanceFilter}
                  onChangeText={value => {this.onInputChange("distanceFilter", value, 1 );}}
                />
            </Block>
            <Block row>
              <Block>
                <Text>elasticityMultiplier</Text>
                <Text small>0, 1, 2, 3, 5, 10</Text>
              </Block>
              <Input
                  textColor={Theme.colors.black}
                  borderColor={Theme.colors.black}
                  activeBorderColor={Theme.colors.black}
                  returnKeyType={"next"}
                  value={this.state.elasticityMultiplier}
                  onChangeText={value => {this.onInputChange("elasticityMultiplier", value, 1);}}
                />
            </Block>
            <Block row>
              <Block>
                <Text>desiredOdometerAccuracy</Text>
                <Text small>10, 20, 50, 100, 500</Text>
              </Block>
              <Input
                  textColor={Theme.colors.black}
                  borderColor={Theme.colors.black}
                  activeBorderColor={Theme.colors.black}
                  returnKeyType={"next"}
                  value={this.state.desiredOdometerAccuracy}
                  onChangeText={value => {this.onInputChange("desiredOdometerAccuracy", value, 1);}}
                />
            </Block>
            <Block row>
              <Block>
                <Text>locationUpdateInterval</Text>
                <Text small>0, 1000, 5000, 10000, 30000, 60000</Text>
              </Block>
              <Input
                  textColor={Theme.colors.black}
                  borderColor={Theme.colors.black}
                  activeBorderColor={Theme.colors.black}
                  returnKeyType={"next"}
                  value={this.state.locationUpdateInterval}
                  onChangeText={value => {this.onInputChange("locationUpdateInterval", value, 1);}}
                />
            </Block>
            <Block row>
              <Block>
                <Text>fastestLocationUpdateInterval</Text>
                <Text small>0, 1000, 5000, 10000, 30000, 60000</Text>
              </Block>
              <Input
                  textColor={Theme.colors.black}
                  borderColor={Theme.colors.black}
                  activeBorderColor={Theme.colors.black}
                  returnKeyType={"next"}
                  value={this.state.fastestLocationUpdateInterval}
                  onChangeText={value => {this.onInputChange("fastestLocationUpdateInterval", value, 1);}}
                />
            </Block>
            <Block row>
              <Text>URL</Text>
            </Block>
            <Block row>
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
            <Block row>
              <Block>
                <Text>deferTime</Text>
              </Block>
              <Input
                  textColor={Theme.colors.black}
                  borderColor={Theme.colors.black}
                  activeBorderColor={Theme.colors.black}
                  returnKeyType={"next"}
                  value={this.state.deferTime}
                  onChangeText={value => {this.onInputChange("deferTime", value, 1);}}
                />
            </Block>
            <Block row>
              <Block>
                <Text h4 center>User</Text>
              </Block>
            </Block>
           <Block row>
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
            <Block row style={styles.bottomtab}>
              <Block>
                <Button ripple
                  color="secondary"
                  onPress={() => this.saveSettings()}
                  style={[styles.btn]}
                >
                  <Text black center>Save</Text>
                </Button> 
              </Block>
            </Block>
         </ScrollView>
     </View>
    )
    }
}

const styles = StyleSheet.create({

})

export default connect()(MapSettings)