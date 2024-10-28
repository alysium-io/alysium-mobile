import { Path, Svg } from '@atomic';
import { IconProps } from '@types';
import React from 'react';
import { PathProps, SvgProps } from 'react-native-svg';

const svg: SvgProps = {
	viewBox: '0 0 18 18',
	fill: 'none'
};

const path: PathProps = {
	d: 'm16.217 7.691-.174-.099L3.652.517A1.594 1.594 0 0 0 2.672.18c-.88 0-1.593.704-1.593 1.575v14.49c0 .87.714 1.575 1.593 1.575a1.587 1.587 0 0 0 1.072-.414l12.15-6.938c.161-.061.312-.147.444-.255a1.564 1.564 0 0 0-.12-2.522Z'
};

const Play: React.FC<IconProps> = (props) => {
	return (
		<Svg {...svg} size={props.size}>
			<Path {...path} fill={props.color} />
		</Svg>
	);
};

export default Play;
