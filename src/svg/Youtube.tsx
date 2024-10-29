import { Path, Svg } from '@atomic';
import { IconProps } from '@types';
import React from 'react';
import { PathProps, SvgProps } from 'react-native-svg';

const svg: SvgProps = {
	viewBox: '0 0 18 18',
	fill: 'none'
};

const path: PathProps = {
	d: 'M2.623 3.222c-1.393.105-2.447 1.184-2.515 2.513C.053 6.831 0 8.092 0 8.962c0 .88.054 2.16.11 3.264.068 1.313 1.097 2.385 2.471 2.506 1.521.133 3.722.268 6.419.268 2.69 0 4.887-.134 6.407-.267 1.38-.121 2.411-1.2 2.477-2.518.059-1.163.116-2.493.116-3.253 0-.752-.056-2.062-.114-3.215-.067-1.335-1.122-2.421-2.52-2.525C13.868 3.11 11.708 3 9 3c-2.716 0-4.879.11-6.377.222ZM7.2 6.418l4.64 2.544L7.2 11.506V6.418Z',
	fillRule: 'evenodd',
	clipRule: 'evenodd'
};

const Youtube: React.FC<IconProps> = (props) => (
	<Svg {...svg} size={props.size} color={props.color}>
		<Path {...path} fill={props.color} />
	</Svg>
);

export default Youtube;
