import { View } from '@atomic';
import React from 'react';
import Vibrations from './displays/Vibrations';

const Scratch = () => {
	return (
		<View flex={1} backgroundColor='bg.p'>
			<Vibrations />
		</View>
	);
};

export default Scratch;
