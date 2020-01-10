// https://github.com/mxck/react-native-material-menu
import React, {Component, memo} from 'react';
import { Platform } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import BackgroundGeolocation from "react-native-background-geolocation";
import { RNToasty } from 'react-native-toasty';

import Text from './Text';
import FontAwesome, { FaLightIcons } from './icons';
import { Theme } from '../constants';

class MenuOptionMap extends Component {
  _menu = null;
  setMenuRef = ref => {
    this._menu = ref;
    this.props.menuref(ref);
  };

  hideMenu = () => {
    this._menu.hide();
  };

  showMenu = () => {
    this._menu.show();
  };

  goToSettings = () =>{
    this.props.navigation.navigate('MapSettings');
    this.hideMenu()
  }

  async emailLog() {
    let Logger = BackgroundGeolocation.logger;
    let email = "pushpanathank91@gmail.com";
        Logger.emailLog(email).then((succes) => {
          console.log('[emailLog] success');
        }).catch((error) => {
          console.log("email log error", error);
        });
  }

  resetOdometer() {
    BackgroundGeolocation.setOdometer(0).then(location => {
      RNToasty.Show({ title: 'Reset odometer success' });
    }).catch(error => {
      RNToasty.Show({ title: 'Reset odometer failure: ' + error });
    });
  }

  async sync() {
    let count = await BackgroundGeolocation.getCount();
    if (!count) {
      RNToasty.Show({ title: 'Locations database is empty'});
      return;
    }
    RNToasty.Show({ title: 'Sync records' + count });
    BackgroundGeolocation.sync((rs) => {
      RNToasty.Show({ title: 'Sync success (' + count + ' records)' });
    }, (error:string) => {
      RNToasty.Show({ title: 'Sync error: ' + error });
    });
  }

  render() {
    return (
      <Menu
          ref={this.setMenuRef}
          button={<FontAwesome
                icon={FaLightIcons.ellipsisV}
                type={'light'}
                size={Theme.sizes.h3*1.8}
                color={Theme.colors.white}
              />}
        >
        <MenuItem onPress={this.goToSettings}>Settings</MenuItem>
        <MenuDivider />
        <MenuItem onPress={this.resetOdometer}>Reset odometer</MenuItem>
        <MenuItem onPress={this.sync}>Sync</MenuItem>
        <MenuItem onPress={this.emailLog}>Email Log</MenuItem>
      </Menu>
    );
  }
}

export default memo(MenuOptionMap);