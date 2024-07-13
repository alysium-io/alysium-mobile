import { View } from '@atomic';
import { SemanticColor } from '@types';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {
	useAnimatedStyle,
	useSharedValue,
	withSpring
} from 'react-native-reanimated';

interface RadioProps {
	active: boolean;
	color?: SemanticColor;
	onPress?: () => void;
}

const Radio: React.FC<RadioProps> = ({
	active,
	color = 'radio.default',
	onPress
}) => {
	useEffect(() => {
		if (active) {
			fadeInAndGrow();
		} else {
			fadeOutAndShrink();
		}
	}, [active]);

	const animatedValue = useSharedValue(0);
	const springConfig = { damping: 19, stiffness: 200 };

	const fadeInAndGrow = () =>
		(animatedValue.value = withSpring(1, springConfig));
	const fadeOutAndShrink = () =>
		(animatedValue.value = withSpring(0, springConfig));

	const animatedStyles = useAnimatedStyle(() => {
		return {
			transform: [{ scale: animatedValue.value }]
		};
	});

	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<View borderColor={color} style={styles.container}>
				<View
					animated
					style={[styles.dot, animatedStyles]}
					backgroundColor={color}
				/>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		height: 25,
		width: 25,
		borderRadius: 999,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 3
	},
	dot: {
		height: '70%',
		width: '70%',
		borderRadius: 999
	}
});

export default Radio;
