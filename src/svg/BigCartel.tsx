import { Path, Svg } from '@atomic';
import { IconProps } from '@types';
import React from 'react';
import { PathProps, SvgProps } from 'react-native-svg';

const svg: SvgProps = {
	viewBox: '0 0 18 18',
	fill: 'none'
};

const path: PathProps = {
	d: 'M8.998 9.801v-.754c0-.473.19-.942.66-1.131l5.843-3.675c.377-.19.566-.66.566-1.133V0L8.998 4.523 1.93 0v9.518c0 2.545 1.132 4.713 3.015 5.937L8.905 18l3.96-2.545c1.884-1.132 3.015-3.298 3.015-5.937V5.277L8.998 9.801Z'
};

const BigCartel: React.FC<IconProps> = (props) => (
	<Svg {...svg} size={props.size} color={props.color}>
		<Path {...path} fill={props.color} />
	</Svg>
);

export default BigCartel;
