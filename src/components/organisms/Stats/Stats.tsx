import { View } from '@atomic';
import { Props } from '@types';
import React from 'react';
import StatsItem from './StatsItem';

interface StatsProps {
	items: Props<typeof StatsItem>[];
}

const Stats: React.FC<StatsProps> = ({ items }) => {
	return (
		<View flexDirection='row' alignItems='center'>
			{items.map((item, index) => (
				<View key={index} marginHorizontal='s'>
					<StatsItem {...item} />
				</View>
			))}
		</View>
	);
};

export default Stats;
