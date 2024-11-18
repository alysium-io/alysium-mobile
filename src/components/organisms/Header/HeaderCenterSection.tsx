import { View } from '@atomic';
import { ChildrenProps, Props } from '@types';
import React from 'react';

type HeaderCenterSectionProps = Props<typeof View> & ChildrenProps;

const HeaderCenterSection: React.FC<HeaderCenterSectionProps> = (props) => (
	<View flex={2} justifyContent='center' alignItems='center' {...props} />
);

export default HeaderCenterSection;
