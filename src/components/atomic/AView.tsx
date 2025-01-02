import { AnimatedView, AnimatedViewProps } from '@subatomic';
import React from 'react';
import { View as RNView } from 'react-native';

const AView = React.forwardRef<RNView, AnimatedViewProps>(
	({ backgroundColor = 'transparent', ...props }, ref) => {
		return (
			<AnimatedView ref={ref} backgroundColor={backgroundColor} {...props} />
		);
	}
);

export default AView;
