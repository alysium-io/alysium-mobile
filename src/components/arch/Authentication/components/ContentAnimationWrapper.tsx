import { LView, View } from '@atomic';
import { Props } from '@types';
import React from 'react';

type ContentAnimationWrapperProps = Omit<Props<typeof View>, 'animated'> & {};

const ContentAnimationWrapper: React.FC<ContentAnimationWrapperProps> = (
	props
) => <LView flex={1} {...props} />;

export default ContentAnimationWrapper;
