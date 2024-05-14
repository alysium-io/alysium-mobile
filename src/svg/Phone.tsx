import { Path, Svg } from '@atomic';
import { IconProps } from '@types';
import React from 'react';
import { PathProps, SvgProps } from 'react-native-svg';

const svg: SvgProps = {
	viewBox: '0 0 18 18',
	fill: 'none'
};

const path: PathProps = {
	d: 'M12.464.496H5.537A1.576 1.576 0 0 0 3.961 2.07V15.93a1.577 1.577 0 0 0 1.576 1.573h6.927a1.577 1.577 0 0 0 1.577-1.573V2.07A1.576 1.576 0 0 0 12.464.495ZM9.002 16.522a.594.594 0 0 1-.417-1.012A.592.592 0 1 1 9 16.522ZM10.18 2.39h-2.36a.327.327 0 0 1 0-.631h2.36a.327.327 0 0 1 0 .63Z'
};

const Phone: React.FC<IconProps> = (props) => {
	if (props.animated) {
		return (
			<Svg
				{...svg}
				size={props.size}
				animated={props.animated}
				animatedProps={props.animatedSvgProps}
			>
				<Path
					{...path}
					fill={props.color}
					animated={props.animated}
					animatedProps={props.animatedPathProps}
				/>
			</Svg>
		);
	}

	return (
		<Svg {...svg} size={props.size}>
			<Path {...path} fill={props.color} />
		</Svg>
	);
};

export default Phone;
