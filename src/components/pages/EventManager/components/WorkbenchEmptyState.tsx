import { Text, View } from '@atomic';
import React from 'react';

const WorkbenchEmptyState = () => {
	return (
		<View flex={1} justifyContent='center' alignItems='center'>
			<Text variant='paragraph-medium' color='text.q' textAlign='center'>
				Create an{' '}
				<Text variant='paragraph-medium' color='text.s'>
					event
				</Text>{' '}
				to get started
			</Text>
		</View>
	);
};

export default WorkbenchEmptyState;
