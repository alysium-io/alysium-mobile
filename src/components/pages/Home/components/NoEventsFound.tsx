import { Text, View } from '@atomic';
import React from 'react';

const NoEventsFound = () => {
	return (
		<View margin='m' justifyContent='center' alignItems='center' flex={1}>
			<Text variant='paragraph-large'>Nothing coming up</Text>
		</View>
	);
};

export default NoEventsFound;
