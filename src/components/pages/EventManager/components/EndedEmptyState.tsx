import { Text, View } from '@atomic';
import React from 'react';

const EndedEmptyState = () => {
	return (
		<View flex={1} justifyContent='center' alignItems='center'>
			<Text variant='paragraph-medium' color='text.q' textAlign='center'>
				When you finish an{' '}
				<Text variant='paragraph-medium' color='text.s'>
					event
				</Text>
				{'\n'}
				it will appear here to review for your EPK.
			</Text>
		</View>
	);
};

export default EndedEmptyState;
