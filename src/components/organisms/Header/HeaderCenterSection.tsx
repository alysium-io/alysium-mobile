import { View } from '@atomic';
import { ChildrenProps } from '@types';
import React from 'react';

type HeaderCenterSectionProps = React.ComponentProps<typeof View> &
	ChildrenProps;

const HeaderCenterSection: React.FC<HeaderCenterSectionProps> = (props) => (
	<View flex={2} justifyContent='center' alignItems='center' {...props} />
);

export default HeaderCenterSection;
