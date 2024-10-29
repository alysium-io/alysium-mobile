import { Path, Svg } from '@atomic';
import { IconProps } from '@types';
import React from 'react';
import { PathProps, SvgProps } from 'react-native-svg';

const svg: SvgProps = {
	viewBox: '0 0 18 18',
	fill: 'none'
};

const path: PathProps = {
	d: 'M11 18a5.25 5.25 0 0 1-5.202-5.23 5.222 5.222 0 0 1 1.359-3.536L3.621 12.77 1.766 10.914l3.989-3.945c.54-.54.817-1.242.817-2.016V0h2.616v4.953c0 1.52-.54 2.805-1.593 3.857l-.117.117a5.222 5.222 0 0 1 3.521-1.359c2.966 0 5.231 2.352 5.231 5.202a5.231 5.231 0 0 1-5.231 5.23ZM11 9.965c-1.593 0-2.835 1.314-2.835 2.804 0 1.534 1.256 2.835 2.835 2.835a2.835 2.835 0 0 0 2.864-2.835C13.863 11.22 12.577 9.965 11 9.965Z'
};

const Beatport: React.FC<IconProps> = (props) => (
	<Svg {...svg} size={props.size} color={props.color}>
		<Path {...path} fill={props.color} />
	</Svg>
);

export default Beatport;
