import { View } from '@atomic';
import { Props } from '@types';
import React from 'react';

type HeaderSectionProps = {
	LeftComponent?: React.ReactNode | null;
	CenterComponent?: React.ReactNode | null;
	RightComponent?: React.ReactNode | null;
	leftComponentContainerProps?: Props<typeof View>;
	centerComponentContainerProps?: Props<typeof View>;
	rightComponentContainerProps?: Props<typeof View>;
};

const HeaderSection: React.FC<HeaderSectionProps> = ({
	LeftComponent,
	CenterComponent,
	RightComponent,
	leftComponentContainerProps,
	centerComponentContainerProps,
	rightComponentContainerProps
}) => (
	<View
		flexDirection='row'
		alignItems='center'
		justifyContent='space-between'
		paddingHorizontal='s'
		margin='m'
	>
		{LeftComponent !== null && (
			<View flex={1} alignItems='flex-start' {...leftComponentContainerProps}>
				{LeftComponent}
			</View>
		)}
		{CenterComponent !== null && (
			<View flex={2} alignItems='center' {...centerComponentContainerProps}>
				{CenterComponent}
			</View>
		)}
		{RightComponent !== null && (
			<View flex={1} alignItems='flex-end' {...rightComponentContainerProps}>
				{RightComponent}
			</View>
		)}
	</View>
);

export default HeaderSection;
