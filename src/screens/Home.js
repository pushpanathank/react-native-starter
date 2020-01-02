import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { connect } from 'react-redux';
import { StackActions, NavigationActions } from 'react-navigation';


import FontAwesome, { FaLightIcons } from '../components/icons';
import { Button, Block, Text, Input, Header } from '../components/';
import { Theme } from '../constants/';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      senderId: "0"
    };

  }

  render () {

    const { navigation } = this.props;

    return (
      <View>
        <Header
          text="Home"
          leftIconOnPress={()=>navigation.openDrawer()}
        />
        <View style={styles.container}>
          <Block row padding={[0,Theme.sizes.indent]} style={styles.bottomtab}>
              <Block>
                <Button ripple
                  color="secondary"
                  onPress={() => navigation.navigate('Map')}
                  style={[styles.btn]}
                >
                  <Text center> Go to Map 12</Text>
                </Button> 
              </Block>
            </Block>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
})

export default connect()(Home)
