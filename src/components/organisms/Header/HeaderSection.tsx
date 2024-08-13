import { View } from '@atomic';
import React from 'react';

type HeaderSectionProps = {
	LeftComponent?: React.ReactNode;
	CenterComponent?: React.ReactNode;
	RightComponent?: React.ReactNode;
};

const HeaderSection: React.FC<HeaderSectionProps> = ({
	LeftComponent,
	CenterComponent,
	RightComponent
}) => (
	<View
		flexDirection='row'
		alignItems='center'
		justifyContent='space-between'
		paddingHorizontal='s'
		margin='m'
	>
		<View flex={1}>{LeftComponent}</View>
		<View flex={2} alignItems='center'>
			{CenterComponent}
		</View>
		<View flex={1} alignItems='flex-end'>
			{RightComponent}
		</View>
	</View>
);

export default HeaderSection;
