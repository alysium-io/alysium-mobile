import { View } from '@atomic';
import React from 'react';

const Bar = () => {
	return (
		<View
			backgroundColor='text.q'
			position='absolute'
			left={0}
			right={0}
			height={1}
			style={{
				top: '50%',
				transform: [{ translateY: -0.5 }]
			}}
		/>
	);
};

export default Bar;
