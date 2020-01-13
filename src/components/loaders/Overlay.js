// https://github.com/anooj1483/rn-progress-loader
import React, { Component } from 'react';

import {
    StyleSheet,
    View,ActivityIndicator,
    Modal,Text,TouchableHighlight,Dimensions
} from 'react-native';
import PropTypes from 'prop-types'

import CircleLoader from './Circle';
import { Theme } from '../../constants/';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

class OverlayLoader extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            visible: this.props.visible,
            color:this.props.color,
            barHeight:this.props.barHeight,
            isHUD:this.props.isHUD,
            hudColor:this.props.hudColor

        }
    }

    static propTypes = {
        visible: PropTypes.bool.isRequired,
        barHeight: PropTypes.number,
        color:PropTypes.string,
    };

    static defaultProps = {
        visible: false,
        barHeight:64,
        color:"#FFFFFF",
        radius:10
    };


    render(){
        const { top } = this.props;
        return (
            <Modal
                transparent={true}
                animationType={'none'}
                visible={this.props.visible}
                onRequestClose={() => {console.log('close modal')}}>
                <View style={[styles.modalBackground,{marginTop: top||0}]}>
                    <View style={[styles.activityIndicatorWrapper, {height: height-(top||0)}]}>
                        <CircleLoader color={Theme.colors.color2}/>
                    </View>
                </View>
            </Modal>
        )
    }



}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000080',
        //marginTop:Theme.sizes.headerHeight
    },
    activityIndicatorWrapper: {
        backgroundColor: 'transparent',
        //height: height,
	height: height-Theme.sizes.headerHeight,
        width: width,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
});
export default OverlayLoader;