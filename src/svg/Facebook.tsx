import { Path, Svg } from '@atomic';
import { IconProps } from '@types';
import React from 'react';
import { PathProps, SvgProps } from 'react-native-svg';

const svg: SvgProps = {
	viewBox: '0 0 18 18',
	fill: 'none'
};

const path: PathProps = {
	d: 'M14.931 4.286h-1.978l.003-.003c-.818 0-1.483.577-1.483 1.286v1.285h3.46c.153 0 .297.063.39.167.095.106.127.242.088.371l-1.032 3.429a.494.494 0 0 1-.48.321h-2.6v6.429c0 .236-.222.429-.495.429H6.676c-.272 0-.494-.193-.494-.429v-6.429H3.065c-.273 0-.495-.192-.495-.428V7.32c0-.236.223-.429.495-.429h3.461V4.714C6.526 2.115 8.966 0 11.964 0h2.967c.272 0 .494.193.494.429v3.428c0 .236-.222.429-.494.429Z'
};

const Facebook: React.FC<IconProps> = (props) => (
	<Svg {...svg} size={props.size} color={props.color}>
		<Path {...path} fill={props.color} />
	</Svg>
);

export default Facebook;
