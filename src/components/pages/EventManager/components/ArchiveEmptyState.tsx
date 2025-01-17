import { Text, View } from '@atomic';
import React from 'react';

const ArchiveEmptyState = () => {
	return (
		<View flex={1} justifyContent='center' alignItems='center'>
			<Text variant='paragraph-medium' color='text.q' textAlign='center'>
				When you complete an{' '}
				<Text variant='paragraph-medium' color='text.s'>
					event
				</Text>
				{'\n'}
				it will appear here
			</Text>
		</View>
	);
};

export default ArchiveEmptyState;
