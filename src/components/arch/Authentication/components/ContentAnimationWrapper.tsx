import { View } from '@atomic';
import { Props } from '@types';
import React from 'react';
import { FadeInLeft, FadeOutRight } from 'react-native-reanimated';

type ContentAnimationWrapperProps = Omit<Props<typeof View>, 'animated'> & {};

const ContentAnimationWrapper: React.FC<ContentAnimationWrapperProps> = (
	props
) => (
	<View
		animated
		entering={FadeInLeft.duration(200)}
		exiting={FadeOutRight.duration(200)}
		flex={1}
		{...props}
	/>
);

export default ContentAnimationWrapper;
