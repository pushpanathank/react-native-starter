// https://github.com/djuniorscjr/basic-loading-rn
import React from 'react';
import {
	StyleSheet,
	View,
	Animated,
} from 'react-native';

import { Theme } from '../../constants/';

type PropsObjectAnimated = {
	value: Animated.Value,
	sizes: Array<number>,
};

const ObjectAnimated = ({ value, sizes, color }: PropsObjectAnimated) => (
	<Animated.View
		style={[
			styles.circle, {
				backgroundColor: color,
				transform: [{
					scale: value.interpolate({
						inputRange: [0, 1, 2],
						outputRange: sizes,
					}),
				}],
			}]}
	/>
);

type Props = {
	active: ?boolean;
};

class CircleLoader extends React.Component<Props> {
	constructor(props) {
		super(props);
		this.animatedValue = new Animated.Value(0);
	}

	componentWillMount() {
		this.animate();
	}

	setTimingAnimated(originalValue, newValue, duration) {
		return Animated.timing(originalValue, {
			toValue: newValue,
			duration,
			useNativeDriver: true,
		});
	}

	animate() {
		Animated.sequence([
			this.setTimingAnimated(this.animatedValue, 1, 350),
			this.setTimingAnimated(this.animatedValue, 2, 350),
			this.setTimingAnimated(this.animatedValue, 0, 350),
		]).start(() => this.animate());
	}

	render() {
		return (
				<View style={styles.group}>
					<ObjectAnimated
						value={this.animatedValue}
						sizes={[1.6, 1, 1]}
						color={this.props.color||Theme.colors.black}
					/>
					<ObjectAnimated
						value={this.animatedValue}
						sizes={[1, 1.6, 1]}
						color={this.props.color||Theme.colors.black}
					/>
					<ObjectAnimated
						value={this.animatedValue}
						sizes={[1, 1, 1.6]}
						color={this.props.color||Theme.colors.black}
					/>
				</View>
		);
	}
}

const styles = StyleSheet.create({
	group: {
		width: 60,
		height: 25,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
	},
	circle: {
		height: 12,
		width: 12,
		margin: 4,
		borderRadius: 12,
		borderWidth: 0,
	},
});

export default CircleLoader;