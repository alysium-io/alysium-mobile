import { View } from '@atomic';
import { useTheme } from '@hooks';
import { IChildrenProps } from '@types';
import React from 'react';
import {
	interpolate,
	SharedValue,
	useAnimatedStyle
} from 'react-native-reanimated';

interface AnimatedParallaxBannerContainerProps extends IChildrenProps {
	scrollY: SharedValue<number>;
	bannerImageHeight: number;
}

const AnimatedParallaxBannerContainer: React.FC<
	AnimatedParallaxBannerContainerProps
> = ({ children, scrollY, bannerImageHeight }) => {
	const { theme } = useTheme();

	const animatedContainerStyle = useAnimatedStyle(() => {
		return {
			height: interpolate(
				scrollY.value,
				[0, bannerImageHeight],
				[bannerImageHeight, 0],
				{
					extrapolateLeft: 'extend',
					extrapolateRight: 'clamp'
				}
			),
			zIndex: scrollY.value > bannerImageHeight ? 1 : 0
		};
	}, [bannerImageHeight]);

	return (
		<View
			animated
			position='absolute'
			borderColor='border.medium'
			style={[
				animatedContainerStyle,
				{ width: '100%', borderBottomWidth: theme.borderWidth.normal }
			]}
		>
			{children}
		</View>
	);
};

export default AnimatedParallaxBannerContainer;
