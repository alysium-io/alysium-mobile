import { Text, View } from '@atomic';
import React from 'react';

interface RankProps {
	rank: number;
}

const Rank: React.FC<RankProps> = ({ rank }) => {
	return (
		<View>
			<Text variant='paragraph-small' color='text.t'>
				#{rank.toLocaleString()}
			</Text>
		</View>
	);
};

export default Rank;
