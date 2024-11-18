import { View } from '@atomic';
import { ChildrenProps, Props } from '@types';
import React from 'react';

type HeaderRightSectionProps = Props<typeof View> & ChildrenProps;

const HeaderRightSection: React.FC<HeaderRightSectionProps> = (props) => (
	<View
		paddingRight='m'
		flexDirection='row'
		alignItems='center'
		justifyContent='flex-end'
		flex={1}
		{...props}
	/>
);

export default HeaderRightSection;
