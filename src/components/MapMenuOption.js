import React, {Component, memo} from 'react';
import { Platform } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';

import { Theme } from '../constants';

const GRAY_COLOR = 'rgba(168, 182, 200, 0.60)';

class MapMenuOption extends Component {
  _menu = null;

  setMenuRef = ref => {
    this._menu = ref;
  };

  hideMenu = () => {
    this._menu.hide();
  };

  showMenu = () => {
    this._menu.show();
  };

  render() {
    return (
      <Menu
          ref={this.setMenuRef}
          button={<Text onPress={this.showMenu}>Show menu</Text>}
        >
        <MenuItem onPress={this.hideMenu}>Menu item 1</MenuItem>
        <MenuItem onPress={this.hideMenu}>Menu item 2</MenuItem>
        <MenuItem onPress={this.hideMenu} disabled>
          Menu item 3
        </MenuItem>
        <MenuDivider />
        <MenuItem onPress={this.hideMenu}>Menu item 4</MenuItem>
      </Menu>
    );
  }
}

export default memo(MapMenuOption);