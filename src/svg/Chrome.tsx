import { Path, Svg } from '@atomic';
import { IconProps } from '@types';
import React from 'react';

const Chrome: React.FC<IconProps> = (props) => (
	<Svg size={props.size} viewBox='0 0 18 18' fill='none'>
		<Path
			fill={props.color}
			d='M9 .18A8.802 8.802 0 0 0 1.902 3.76L4.626 8.48A4.41 4.41 0 0 1 9 4.59h7.64A8.808 8.808 0 0 0 9 .18ZM1.36 4.589a8.785 8.785 0 0 0-1.18 4.41 8.813 8.813 0 0 0 7.833 8.766l2.72-4.711A4.409 4.409 0 0 1 9 13.41a4.41 4.41 0 0 1-3.78-2.15.435.435 0 0 1-.04-.055L1.36 4.589ZM9 5.472a3.528 3.528 0 1 0 0 7.056 3.528 3.528 0 0 0 0-7.056Zm2.638 0A4.41 4.41 0 0 1 13.41 9a4.411 4.411 0 0 1-.558 2.137.456.456 0 0 1-.033.068L9 17.82A8.813 8.813 0 0 0 17.82 9a8.8 8.8 0 0 0-.734-3.528h-5.448Z'
		/>
	</Svg>
);

export default Chrome;
