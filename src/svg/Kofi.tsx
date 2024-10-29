import { Path, Svg } from '@atomic';
import { IconProps } from '@types';
import React from 'react';
import { PathProps, SvgProps } from 'react-native-svg';

const svg: SvgProps = {
	viewBox: '0 0 18 18',
	fill: 'none'
};

const path: PathProps = {
	d: 'M17.91 6.71c-.58-3.063-3.644-3.444-3.644-3.444H.542c-.453 0-.509.598-.509.598s-.061 5.493-.016 8.867c.123 1.818 1.94 2.004 1.94 2.004s6.2-.017 8.974-.037c1.829-.32 2.013-1.925 1.994-2.801 3.264.18 5.567-2.123 4.987-5.187ZM9.614 9.344c-.934 1.09-3.008 2.982-3.008 2.982s-.09.089-.232.017a1.123 1.123 0 0 1-.081-.068S3.766 9.989 3.267 9.31c-.532-.724-.781-2.025-.068-2.783.713-.757 2.254-.814 3.272.306 0 0 1.174-1.337 2.601-.723 1.428.615 1.374 2.259.542 3.234Zm4.63.36c-.696.087-1.261.021-1.261.021V5.462h1.327s1.478.413 1.478 1.979c0 1.434-.739 2-.1.544-.806.261-1.444.717Z'
};

const Kofi: React.FC<IconProps> = (props) => (
	<Svg {...svg} size={props.size} color={props.color}>
		<Path {...path} fill={props.color} />
	</Svg>
);

export default Kofi;
