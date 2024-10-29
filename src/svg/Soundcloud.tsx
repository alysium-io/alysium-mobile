import { Path, Svg } from '@atomic';
import { IconProps } from '@types';
import React from 'react';
import { PathProps, SvgProps } from 'react-native-svg';

const svg: SvgProps = {
	viewBox: '0 0 18 18',
	fill: 'none'
};

const path: PathProps = {
	d: 'M6.772 5.962V14h8.016c2.26 0 3.516-2.618 2.138-4.387-.874-1.121-1.687-.752-1.719-1.25C14.993 4.989 11.355 2.971 8.392 4.542a4.381 4.381 0 0 0-1.62 1.42ZM2.068 8.26v5.353c.288.161.605.277.941.338V7.922a2.83 2.83 0 0 0-.941.338Zm-.627 4.888V8.724c-1.254 1.205-1.255 3.217 0 4.424ZM3.636 7.494V14h.941V6.376c-.427.254-.762.649-.941 1.118ZM5.204 6.123V14h.941V6.108a1.912 1.912 0 0 0-.941.015Z',
	fillRule: 'evenodd',
	clipRule: 'evenodd'
};

const Soundcloud: React.FC<IconProps> = (props) => (
	<Svg {...svg} size={props.size} color={props.color}>
		<Path {...path} fill={props.color} />
	</Svg>
);

export default Soundcloud;
