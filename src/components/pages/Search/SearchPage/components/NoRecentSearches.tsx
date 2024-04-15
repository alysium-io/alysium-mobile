import { View } from '@atomic';
import { DeclarativeText } from '@molecules';
import React from 'react';

const NoRecentSearches = () => {
	return (
		<View margin='m'>
			<DeclarativeText
				textItems={[
					{
						text: 'No recent searches...',
						variant: 'paragraph-medium'
					}
				]}
			/>
		</View>
	);
};

export default NoRecentSearches;
