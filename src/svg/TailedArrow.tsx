import { Path, Svg } from '@atomic';
import { IconProps } from '@types';
import * as React from 'react';
import { PathProps, SvgProps } from 'react-native-svg';

const svg: SvgProps = {
	fill: 'none',
	viewBox: '0 0 475 475'
};

const path: PathProps = {
	strokeLinecap: 'round',
	strokeLinejoin: 'round',
	strokeWidth: 50,
	d: 'M236.667 38v400m0-400L70 204.667M236.667 38l166.666 166.667'
};

const TailedArrow: React.FC<IconProps> = (props) => {
	return (
		<Svg {...svg} size={props.size}>
			<Path {...path} stroke={props.color} />
		</Svg>
	);
};

export default TailedArrow;
