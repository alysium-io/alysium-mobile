import { View } from '@atomic';
import { ChildrenProps } from '@types';
import React from 'react';

type HeaderRightSectionProps = React.ComponentProps<typeof View> &
	ChildrenProps;

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
