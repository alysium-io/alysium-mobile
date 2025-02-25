import { View } from '@atomic';
import React from 'react';
import SentryTest from './displays/SentryTest';

const Scratch = () => {
	return (
		<View flex={1} backgroundColor='bg.p'>
			<SentryTest />
		</View>
	);
};

export default Scratch;
