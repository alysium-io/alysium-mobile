import { Path, Svg } from '@atomic';
import { IconProps } from '@types';
import React from 'react';
import { PathProps, SvgProps } from 'react-native-svg';

const svg: SvgProps = {
	viewBox: '0 0 18 18',
	fill: 'none'
};

const path: PathProps = {
	d: 'M17.216 5.408c-.003-2.298-1.793-4.182-3.893-4.862-2.608-.844-6.048-.722-8.538.453C1.767 2.424.818 5.544.783 8.655.754 11.214 1.01 17.952 4.81 18c2.824.036 3.245-3.603 4.551-5.356.93-1.247 2.127-1.599 3.6-1.963 2.533-.627 4.259-2.626 4.255-5.273Z'
};

const Patreon: React.FC<IconProps> = (props) => (
	<Svg {...svg} size={props.size} color={props.color}>
		<Path {...path} fill={props.color} />
	</Svg>
);

export default Patreon;
