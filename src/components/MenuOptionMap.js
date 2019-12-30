// https://github.com/mxck/react-native-material-menu
import React, {Component, memo} from 'react';
import { Platform } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

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

  render() {
    return (
      <Menu
          ref={this.setMenuRef}
          button={<FontAwesome
                icon={FaLightIcons.ellipsisV}
                type={'light'}
                size={Theme.sizes.h3}
                color={Theme.colors.white}
              />}
        >
        <MenuItem onPress={this.goToSettings}>Settings</MenuItem>
        <MenuDivider />
        <MenuItem onPress={this.hideMenu}>Menu item 4</MenuItem>
      </Menu>
    );
  }
}

export default memo(MenuOptionMap);