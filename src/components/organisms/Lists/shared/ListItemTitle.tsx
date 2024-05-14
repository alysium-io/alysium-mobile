import { Text, View } from '@atomic';
import React from 'react';

const propsScheme = new Map([
	[
		true,
		{
			title: {
				variant: 'paragraph',
				color: 't1'
			},
			subtitle: {
				variant: 'paragraph-small',
				color: 't2',
				marginBottom: 'xs'
			}
		}
	],
	[
		false,
		{
			title: {
				variant: 'paragraph',
				color: 't1',
				marginBottom: 'xs'
			},
			subtitle: {
				variant: 'paragraph-small',
				color: 't2'
			}
		}
	]
]);

interface ListItemTitleProps {
	title: string;
	subtitle?: string;
	subtitleFirst?: boolean;
}

const ListItemTitle: React.FC<ListItemTitleProps> = ({
	title,
	subtitle,
	subtitleFirst = false
}) => {
	const props = propsScheme.get(subtitleFirst);

	const titleComponent = (
		<Text {...props?.title} numberOfLines={1} ellipsizeMode='tail' key={0}>
			{title}
		</Text>
	);
	const subtitleComponent = subtitle ? (
		<Text {...props?.subtitle} numberOfLines={1} ellipsizeMode='tail' key={1}>
			{subtitle}
		</Text>
	) : null;

	return (
		<View flex={1} marginLeft='m'>
			{subtitleFirst
				? [subtitleComponent, titleComponent]
				: [titleComponent, subtitleComponent]}
		</View>
	);
};

export default ListItemTitle;
