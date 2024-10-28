import { Path, Svg } from '@atomic';
import { IconProps } from '@types';
import React from 'react';
import { PathProps, SvgProps } from 'react-native-svg';

const svg: SvgProps = {
	fill: 'none',
	viewBox: '0 0 18 18'
};

const path: PathProps = {
	d: 'M2.321.324h2.673c.738 0 1.337.738 1.337 1.337v14.702c0 .738-.6 1.336-1.337 1.336H2.32c-.738 0-1.337-.738-1.337-1.337v-14.7c0-.739.6-1.338 1.337-1.338ZM13.009.324h2.672c.739 0 1.337.738 1.337 1.337v14.702c0 .738-.599 1.336-1.337 1.336H13.01c-.738 0-1.337-.738-1.337-1.337v-14.7c0-.739.599-1.338 1.337-1.338Z'
};

const Pause: React.FC<IconProps> = (props) => (
	<Svg {...svg} size={props.size}>
		<Path {...path} fill={props.color} />
	</Svg>
);

export default Pause;
