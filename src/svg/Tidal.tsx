import { Path, Svg } from '@atomic';
import { IconProps } from '@types';
import React from 'react';
import { PathProps, SvgProps } from 'react-native-svg';

const svg: SvgProps = {
	viewBox: '0 0 18 18',
	fill: 'none'
};

const path: PathProps = {
	d: 'M9 9 12 12 9 15l-3-3 3-3ZM3 3l3 3-3 3L0 6l3-3Zm12 0 3 3-3 3-3-3L9 9 6 6l3-3 3 3 3-3Z'
};

const Tidal: React.FC<IconProps> = (props) => (
	<Svg {...svg} size={props.size} color={props.color}>
		<Path {...path} fill={props.color} />
	</Svg>
);

export default Tidal;
