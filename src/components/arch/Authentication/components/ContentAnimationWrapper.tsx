import { View } from '@atomic';
import React from 'react';
import { FadeInLeft, FadeOutRight } from 'react-native-reanimated';

interface ContentAnimationWrapperProps {
	children: React.ReactNode;
}

const ContentAnimationWrapper: React.FC<ContentAnimationWrapperProps> = ({
	children
}) => {
	return (
		<View
			animated
			entering={FadeInLeft.duration(200)}
			exiting={FadeOutRight.duration(200)}
		>
			{children}
		</View>
	);
};

export default ContentAnimationWrapper;
