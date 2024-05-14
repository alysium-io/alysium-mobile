import { Text } from '@atomic';
import React from 'react';

interface ListItemRankProps {
	rnk?: number;
}

const ListItemRank: React.FC<ListItemRankProps> = ({ rnk }) => {
	return rnk ? (
		<Text variant='paragraph-medium' marginRight='m'>
			{rnk}
		</Text>
	) : (
		<></>
	);
};

export default ListItemRank;
