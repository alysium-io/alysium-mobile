import { Icon, Text, View } from '@atomic';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import {
	Easing,
	useAnimatedProps,
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withTiming
} from 'react-native-reanimated';

const SwipeUpToSubmitText = () => {
	const brightness = useSharedValue(1);

	// Set up an infinite loop animation for brightness
	useEffect(() => {
		brightness.value = withRepeat(
			withTiming(0.5, {
				duration: 1000,
				easing: Easing.inOut(Easing.ease)
			}),
			-1,
			true
		);
	}, []);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			color: `rgba(255, 255, 255, ${brightness.value})`
		};
	});

	const animatedFillStyle = useAnimatedProps(() => {
		return {
			fill: `rgba(255, 255, 255, ${brightness.value})`
		};
	});

	return (
		<View alignItems='center'>
			<Icon
				animated
				animatedPathProps={animatedFillStyle}
				name='arrow-up'
				color='bg1'
			/>
			<Text animated style={[styles.text, animatedStyle]}>
				Swipe up to submit
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	text: {
		marginTop: 10,
		fontWeight: 'bold',
		fontSize: 16
	}
});

export default SwipeUpToSubmitText;
