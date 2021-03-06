import React  from 'react'
import { BackHandler } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation';
import { RNToasty } from 'react-native-toasty';
import { getCurrentRoute } from '../utils/Common';

// note here: imported App component
// import { App } from './App'
import { App } from "../store/";

class ReduxNavigation extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      backButtonLastPressTime: 0,
    }
  }

  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress)
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress)
  }

  onBackPress = () => {
    const { nav, dispatch, state } = this.props

    const currentRoute = getCurrentRoute(state);
    // on the root page
    // if (nav.index === 0) {
    if (currentRoute=="Login" || currentRoute=="Home") {
      const now = new Date().getTime()

      // pressed the back button within 2000ms twice
      // ToastAndroid.SHORT === 2000
      if (now - this.state.backButtonLastPressTime < 2000) {
        return false
      }

      RNToasty.Show({ title: 'Press Again to Exit App' });
      this.state.backButtonLastPressTime = now
      return true
    }

    // not on the root page, nav back
    dispatch(NavigationActions.back())
    return true
  }

  render () {
    const { nav, dispatch } = this.props

    return <App state={nav} dispatch={dispatch}/>
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
  state: state,
})

export default connect(mapStateToProps)(ReduxNavigation)
