import { Path, Svg } from '@atomic';
import { IconProps } from '@types';
import React from 'react';

const Eye: React.FC<IconProps> = (props) => (
	<Svg viewBox='0 0 18 18' size={props.size} fill='none'>
		<Path
			fill={props.color}
			d='M17.889 8.69c-2.731-2.655-5.657-4.01-8.694-4.01-4.597 0-8.108 3.05-9.056 4.01A.456.456 0 0 0 0 9c0 .113.056.226.14.31.975.932 4.458 4.01 9.055 4.01 3.065 0 5.99-1.356 8.694-4.01A.428.428 0 0 0 18 9a.428.428 0 0 0-.111-.31ZM9 11.54c-1.365 0-2.508-1.128-2.508-2.54 0-1.412 1.115-2.541 2.508-2.541s2.508 1.129 2.508 2.54c0 1.412-1.143 2.542-2.508 2.542Z'
		/>
	</Svg>
);

export default Eye;
