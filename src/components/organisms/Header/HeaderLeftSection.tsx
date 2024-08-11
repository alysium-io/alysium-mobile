import { View } from '@atomic';
import { ChildrenProps } from '@types';
import React from 'react';

type HeaderLeftSectionProps = React.ComponentProps<typeof View> & ChildrenProps;

const HeaderLeftSection: React.FC<HeaderLeftSectionProps> = (props) => (
	<View
		paddingLeft='m'
		flexDirection='row'
		alignItems='center'
		justifyContent='flex-start'
		flex={1}
		{...props}
	/>
);

export default HeaderLeftSection;
