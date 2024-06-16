import { Text, View } from '@atomic';
import React from 'react';
import { If, Then } from 'react-if';

interface SimpleTableProps {
	title?: string;
	items: {
		field: string;
		value: string;
	}[];
}

const SimpleTable: React.FC<SimpleTableProps> = ({ title, items }) => {
	return (
		<View>
			<If condition={title}>
				<Then>
					<Text variant='paragraph-large'>Summary</Text>
					<View
						marginVertical='m'
						backgroundColor='bg2'
						style={{
							height: 1
						}}
					/>
				</Then>
			</If>
			{items.map(({ field, value }, index) => (
				<View
					flexDirection='row'
					justifyContent='space-between'
					key={index}
					marginVertical='s'
				>
					<Text variant='paragraph' color='t2'>
						{field}
					</Text>
					<Text variant='paragraph'>{value}</Text>
				</View>
			))}
		</View>
	);
};

export default SimpleTable;
