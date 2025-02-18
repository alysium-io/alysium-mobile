import { View } from '@atomic';
import React from 'react';
import ReanimaedSharedTransitionHangingBug from './displays/ReanimaedSharedTransitionHangingBug';

const Scratch = () => {
	return (
		<View flex={1} backgroundColor='bg.p'>
			<ReanimaedSharedTransitionHangingBug />
		</View>
	);
};

export default Scratch;
