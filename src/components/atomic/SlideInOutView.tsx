import { View } from '@atomic';
import { IChildrenProps } from '@types';
import React from 'react';
import {
	FadeInLeft,
	FadeInRight,
	FadeOutLeft,
	FadeOutRight
} from 'react-native-reanimated';

const duration = 250;
const animationConfigurations = {
	left: {
		entering: FadeInLeft.duration(duration),
		exiting: FadeOutLeft.duration(duration)
	},
	right: {
		entering: FadeInRight.duration(duration),
		exiting: FadeOutRight.duration(duration)
	}
};

type ViewProps = Omit<
	React.ComponentProps<typeof View>,
	'entering' | 'exiting' | 'animated'
>;
type SlideInOutViewProps = IChildrenProps &
	ViewProps & {
		direction: keyof typeof animationConfigurations;
	};

const SlideInOutView: React.FC<SlideInOutViewProps> = ({
	children,
	direction,
	...props
}) => {
	return (
		<View
			animated
			entering={animationConfigurations[direction].entering}
			exiting={animationConfigurations[direction].exiting}
			{...props}
		>
			{children}
		</View>
	);
};

export default SlideInOutView;
