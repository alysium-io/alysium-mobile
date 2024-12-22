import { Path, Svg } from '@atomic';
import { IconProps } from '@types';
import React from 'react';
import { G } from 'react-native-svg';

const ClockOutlined: React.FC<IconProps> = (props) => (
	<Svg size={props.size} viewBox='0 0 18 18' fill='none' {...props}>
		<G fill={props.color}>
			<Path d='M9 18a9.004 9.004 0 0 1-6.364-2.635 9.004 9.004 0 0 1 0-12.73 9.004 9.004 0 0 1 12.73 0 9.004 9.004 0 0 1 0 12.73A9.004 9.004 0 0 1 9 18.001ZM9 1.287A7.712 7.712 0 0 0 1.286 9 7.712 7.712 0 0 0 9 16.715 7.712 7.712 0 0 0 16.715 9 7.712 7.712 0 0 0 9 1.286Z' />
			<Path d='M11.566 12.214a.642.642 0 0 1-.456-.187L8.538 9.456a.642.642 0 0 1-.186-.457V3.213a.643.643 0 1 1 1.285 0v5.523l2.386 2.378a.645.645 0 0 1 0 .913.642.642 0 0 1-.457.187Z' />
		</G>
	</Svg>
);

export default ClockOutlined;
