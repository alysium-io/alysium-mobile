import { Path, Svg } from '@atomic';
import { IconProps } from '@types';
import React from 'react';

const ClockFilled: React.FC<IconProps> = (props) => (
	<Svg size={props.size} viewBox='0 0 18 18' fill='none' {...props}>
		<Path
			fill={props.color}
			d='M9 0a9.004 9.004 0 0 0-6.364 2.636 9.003 9.003 0 0 0 0 12.728 9.003 9.003 0 0 0 12.728 0 9.003 9.003 0 0 0 0-12.728A9.003 9.003 0 0 0 9 0Zm3.028 12.028a.642.642 0 0 1-.457.186.643.643 0 0 1-.456-.186L8.544 9.456A.642.642 0 0 1 8.357 9V3.214a.643.643 0 1 1 1.286 0v5.523l2.385 2.378a.645.645 0 0 1 0 .913Z'
		/>
	</Svg>
);

export default ClockFilled;
