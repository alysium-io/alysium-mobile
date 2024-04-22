import { View } from '@atomic';
import React from 'react';
import StatsItem from './StatsItem';

interface StatsProps {
	items: {
		title: string;
		subtitle: string;
		onPress: () => void;
	}[];
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
