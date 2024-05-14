import { Text, View } from '@atomic';
import React from 'react';

interface SummaryTextBlockProps {
	title: string;
	items: {
		label: string;
		value: string;
	}[];
}

const SummaryTextBlock: React.FC<SummaryTextBlockProps> = ({
	title,
	items
}) => {
	return (
		<View>
			<Text variant='paragraph-large' marginBottom='m'>
				{title}
			</Text>
			{items.map((item, index) => (
				<View
					key={index}
					marginVertical='s'
					flexDirection='row'
					justifyContent='space-between'
				>
					<Text variant='paragraph' color='t2'>
						{item.label}
					</Text>
					<Text variant='paragraph' color='t2'>
						{item.value}
					</Text>
				</View>
			))}
		</View>
	);
};

export default SummaryTextBlock;
