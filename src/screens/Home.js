import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native'
import { connect } from 'react-redux';
import { StackActions, NavigationActions } from 'react-navigation';


import FontAwesome, { FaLightIcons } from '../components/icons';
import { Theme } from '../constants/';
import { Button, Block, Text, Input, Header, CircleLoader, OverlayLoader } from '../components/';
import appStyles from '../styles';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      senderId: "0",
    };

  }

  render () {

    const { navigation } = this.props;

    return (
      <View style={appStyles.row}>
        <Header
          text="Home"
          leftIconOnPress={()=>navigation.openDrawer()}
        />
        <ScrollView style={[appStyles.row,{padding: Theme.sizes.indent}]}>
          <Block row padding={[0,Theme.sizes.indent]}>
              <Block>
                <Button ripple
                  color="secondary"
                  onPress={() => navigation.navigate('Map')}
                  style={[appStyles.btn]}
                >
                  <Text center> Go to Map 12</Text>
                </Button> 
              </Block>
            </Block>
            <Block>
              <CircleLoader />
            </Block>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({

})

export default connect()(Home)
