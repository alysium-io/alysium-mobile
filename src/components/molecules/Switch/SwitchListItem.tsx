import { Switch, Text, View } from '@atomic';
import { Props } from '@types';
import React from 'react';

interface SwitchListItemProps extends Props<typeof Switch> {
	title: string;
	description: string;
}

const SwitchListItem: React.FC<SwitchListItemProps> = ({
	title,
	description,
	...props
}) => {
	return (
		<View
			margin='m'
			flexDirection='row'
			justifyContent='space-between'
			columnGap='m'
		>
			<View rowGap='xs' flex={1}>
				<Text variant='paragraph' numberOfLines={1}>
					{title}
				</Text>
				<Text variant='paragraph-small' color='text.q' numberOfLines={1}>
					{description}
				</Text>
			</View>
			<Switch {...props} />
		</View>
	);
};

export default SwitchListItem;
