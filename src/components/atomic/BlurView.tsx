import { BlurView as RNBlurView } from '@react-native-community/blur';
import { Props } from '@types';
import React from 'react';
import Animated from 'react-native-reanimated';

const AnimatedBlurView = Animated.createAnimatedComponent(RNBlurView);

type InanimateBlurViewProps = Props<typeof RNBlurView>;
type AnimatedBlurViewProps = InanimateBlurViewProps &
	Props<typeof AnimatedBlurView>;

type BlurViewProps =
	| (InanimateBlurViewProps & { animated: false })
	| (AnimatedBlurViewProps & { animated?: true });

const BlurView: React.FC<BlurViewProps> = ({ animated = true, ...props }) => {
	if (animated) {
		const animatedBlurViewProps = props as AnimatedBlurViewProps;
		return <AnimatedBlurView {...animatedBlurViewProps} />;
	} else {
		const blurViewProps = props as InanimateBlurViewProps;
		return <RNBlurView {...blurViewProps} />;
	}
};

export default BlurView;
