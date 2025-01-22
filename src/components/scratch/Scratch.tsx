import { View } from '@atomic';
import React from 'react';
import AnimatedPageChangeTest from './displays/AnimatedPageChangeTest';

const Scratch = () => {
	return (
		<View flex={1} backgroundColor='bg.p'>
			<AnimatedPageChangeTest />
		</View>
	);
};

export default Scratch;
