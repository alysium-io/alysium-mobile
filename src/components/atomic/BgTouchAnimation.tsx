import { View } from '@atomic';
import { Colors } from '@etc';
import { useTheme } from '@hooks';
import { SemanticColor } from '@types';
import React from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {
	interpolateColor,
	useAnimatedStyle,
	useSharedValue,
	withTiming
} from 'react-native-reanimated';

interface BgTouchAnimationProps {
	children?: React.ReactNode;
	onPress?: () => void;
	color?: SemanticColor;
	activeOpacity?: number;
	disabled?: boolean;
}

const BgTouchAnimation: React.FC<BgTouchAnimationProps> = ({
	children,
	onPress = () => console.log('Touched BgTouchAnimation'),
	color = 'bg-touch-animation.bg.p',
	activeOpacity = 0.2,
	disabled = false
}) => {
	const { theme } = useTheme();
	const backgroundAnimation = useSharedValue(0);

	const activeColor =
		theme.colors[color] || theme.colors['bg-touch-animation.bg.p'];
	const transparentColor = Colors.hex2RGBAString(activeColor, 0);
	const opaqueColor = Colors.hex2RGBAString(activeColor, activeOpacity);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			backgroundColor: interpolateColor(
				backgroundAnimation.value,
				[0, 1],
				[transparentColor, opaqueColor]
			)
		};
	});

	const onPressIn = () => {
		backgroundAnimation.value = 1;
	};

	const onPressOut = () => {
		backgroundAnimation.value = withTiming(0, { duration: 250 });
	};

	return (
		<TouchableWithoutFeedback
			disabled={disabled}
			onPressIn={onPressIn}
			onPressOut={onPressOut}
			onPress={onPress}
		>
			<View animated style={animatedStyle}>
				{children}
			</View>
		</TouchableWithoutFeedback>
	);
};

export default BgTouchAnimation;
