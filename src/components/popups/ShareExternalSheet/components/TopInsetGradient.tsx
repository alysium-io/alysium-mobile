import { LinearGradient } from '@atomic';
import React from 'react';

const TopInsetGradient = () => {
	return (
		<LinearGradient
			colors={['rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0)']}
			start={{ x: 0, y: 0 }}
			end={{ x: 0, y: 1 }}
			style={{
				height: 58,
				width: '100%',
				zIndex: 99999
			}}
		/>
	);
};

export default TopInsetGradient;
