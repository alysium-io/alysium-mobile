import { View } from '@atomic';
import React from 'react';

type HeaderSectionProps = {
	LeftComponent?: React.ReactNode | null;
	CenterComponent?: React.ReactNode | null;
	RightComponent?: React.ReactNode | null;
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
		{LeftComponent !== null && (
			<View flex={1} alignItems='flex-start'>
				{LeftComponent}
			</View>
		)}
		{CenterComponent !== null && (
			<View flex={2} alignItems='center'>
				{CenterComponent}
			</View>
		)}
		{RightComponent !== null && (
			<View flex={1} alignItems='flex-end'>
				{RightComponent}
			</View>
		)}
	</View>
);

export default HeaderSection;
