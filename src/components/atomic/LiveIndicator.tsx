import { ComplexEventStatus } from '@flux/api/event/types';
import { useTheme } from '@hooks';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
	cancelAnimation,
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withTiming
} from 'react-native-reanimated';

interface LiveIndicatorProps {
	status?: ComplexEventStatus | null;
	size?: number;
	active?: boolean;
}

const LiveIndicator: React.FC<LiveIndicatorProps> = ({
	status,
	size = 8,
	active = false
}) => {
	const { theme } = useTheme();
	const isActive = active || status === ComplexEventStatus.live;
	const mainColor = isActive ? theme.colors['danger'] : theme.colors['text.s'];

	const opacity = useSharedValue(isActive ? 0.9 : 0.4);
	const scale = useSharedValue(1);

	useEffect(() => {
		if (isActive) {
			opacity.value = 0.9;
			scale.value = 0.8;

			opacity.value = withRepeat(withTiming(1, { duration: 2000 }), -1, true);
			scale.value = withRepeat(withTiming(1, { duration: 2000 }), -1, true);
		} else {
			// Cancel any ongoing animations
			cancelAnimation(opacity);
			cancelAnimation(scale);

			// Reset to static values
			opacity.value = withTiming(0.4);
			scale.value = withTiming(1);
		}

		return () => {
			cancelAnimation(opacity);
			cancelAnimation(scale);
		};
	}, [isActive]);

	const animatedStyle = useAnimatedStyle(() => ({
		width: size,
		height: size,
		borderRadius: size / 2,
		backgroundColor: mainColor,
		position: 'absolute',
		shadowColor: mainColor,
		shadowOffset: { width: 0, height: 0 },
		shadowRadius: size / 2,
		shadowOpacity: isActive ? 0.8 : 0,
		elevation: isActive ? 8 : 0,
		opacity: opacity.value,
		transform: [{ scale: scale.value }]
	}));

	return (
		<View style={{ width: size, height: size }}>
			<Animated.View style={animatedStyle} />
		</View>
	);
};

export default LiveIndicator;
