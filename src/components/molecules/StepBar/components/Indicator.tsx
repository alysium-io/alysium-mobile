import { useTheme } from '@hooks';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
	Easing,
	interpolateColor,
	useAnimatedStyle,
	useSharedValue,
	withTiming
} from 'react-native-reanimated';

const INDICATOR_SIZE = 7;

interface IndicatorProps {
	isActive: boolean;
}

const Indicator: React.FC<IndicatorProps> = ({ isActive }) => {
	const progress = useSharedValue(isActive ? 1 : 0);
	const { theme } = useTheme();

	useEffect(() => {
		progress.value = withTiming(isActive ? 1 : 0, {
			duration: 150,
			easing: Easing.inOut(Easing.ease)
		});
	}, [isActive]);

	const animatedStyles = useAnimatedStyle(() => {
		const borderRadius = (progress.value * INDICATOR_SIZE) / 2;
		const scale = 1 + progress.value * 0.5;

		return {
			borderRadius,
			transform: [{ scale }, { rotate: '45deg' }],
			backgroundColor: interpolateColor(
				progress.value,
				[0, 1],
				[theme.colors['text.t'], theme.colors['text.s']]
			)
		};
	});

	return <Animated.View style={[styles.indicator, animatedStyles]} />;
};

const styles = StyleSheet.create({
	indicator: {
		width: INDICATOR_SIZE,
		height: INDICATOR_SIZE
	}
});

export default Indicator;
