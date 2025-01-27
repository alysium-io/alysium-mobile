import { Text, View } from '@atomic';
import React from 'react';

const AllEmptyState = () => {
	return (
		<View flex={1} justifyContent='center' alignItems='center'>
			<Text variant='paragraph-medium' color='text.q' textAlign='center'>
				All your{' '}
				<Text variant='paragraph-medium' color='text.s'>
					events
				</Text>
				{'\n'}
				will appear here.
			</Text>
		</View>
	);
};

export default AllEmptyState;
