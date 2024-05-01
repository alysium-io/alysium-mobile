import { Path, Svg } from '@atomic';
import { IconProps } from '@types';
import React from 'react';
import { PathProps, SvgProps } from 'react-native-svg';

const svg: SvgProps = {
	viewBox: '0 0 18 18',
	fill: 'none'
};

const path1: PathProps = {
	d: 'm16 14.412-4.161-8.476V2.077h1.153a.769.769 0 1 0 0-1.538H11.07a.77.77 0 0 0-.769.77v4.806a.77.77 0 0 0 .08.338l1.303 2.654h-5.36l1.303-2.654a.769.769 0 0 0 .079-.338V1.308a.77.77 0 0 0-.77-.769H5.014a.77.77 0 1 0 0 1.538h1.154v3.86L2.006 14.41a2.115 2.115 0 0 0 1.897 3.048h10.19a2.114 2.114 0 0 0 1.899-3.047h.007Zm-1.41 1.236a.576.576 0 0 1-.488.273H3.912a.577.577 0 0 1-.518-.83l2.175-4.444h6.868l2.182 4.443a.577.577 0 0 1-.029.56v-.002Z'
};

const path2: PathProps = {
	d: 'M7.021 14.767a1.13 1.13 0 1 0 0-2.261 1.13 1.13 0 0 0 0 2.261ZM10.386 13.199a.698.698 0 1 0 0-1.396.698.698 0 0 0 0 1.396Z'
};

const Experiment: React.FC<IconProps> = (props) => {
	if (props.animated) {
		return (
			<Svg
				{...svg}
				size={props.size}
				animated={true}
				animatedProps={props.animatedSvgProps}
			>
				<Path {...path1} fill={props.color} />
				<Path {...path2} fill={props.color} />
			</Svg>
		);
	}

	return (
		<Svg {...svg} size={props.size}>
			<Path {...path1} fill={props.color} />
			<Path {...path2} fill={props.color} />
		</Svg>
	);
};

export default Experiment;
