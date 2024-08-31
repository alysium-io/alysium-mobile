import { View } from '@atomic';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import {
	useAnimatedStyle,
	useSharedValue,
	withTiming
} from 'react-native-reanimated';

interface TabTogglerAnimatedBackgroundProps {
	numItems: number;
	tabIndex: number;
}

const TabTogglerAnimatedBackground: React.FC<
	TabTogglerAnimatedBackgroundProps
> = ({ tabIndex, numItems }) => {
	const left = useSharedValue<number>((tabIndex * 100) / numItems);

	useEffect(() => {
		left.value = withTiming((tabIndex * 100) / numItems, { duration: 200 });
	}, [tabIndex]);

	const animatedStyles = useAnimatedStyle(() => {
		return {
			width: `${100 / numItems}%`,
			left: `${left.value}%`
		};
	}, [numItems]);

	return (
		<View
			animated
			style={[styles.container, animatedStyles]}
			backgroundColor='bg.p'
		/>
	);
};

const styles = StyleSheet.create({
	container: {
		borderRadius: 999,
		position: 'absolute',
		height: '100%',
		transform: [{ translateX: 1 }, { translateY: 1 }]
	}
});

export default TabTogglerAnimatedBackground;
