import { ActivityIndicator, Section } from '@atomic';
import React from 'react';

const Loading = () => {
	return (
		<Section margin='m' justifyContent='center' flex={1}>
			<ActivityIndicator color='#000' />
		</Section>
	);
};

export default Loading;
