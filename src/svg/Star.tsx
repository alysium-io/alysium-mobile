import { Path, Svg } from '@atomic';
import { IconProps } from '@types';
import React from 'react';
import { PathProps, SvgProps } from 'react-native-svg';

const svg: SvgProps = {
	viewBox: '0 0 48 48',
	fill: 'none'
};

const path: PathProps = {
	d: 'M45.906 18.768c-.251-.713-.963-1.193-1.773-1.193H30.108L25.775 5.196v-.002C25.521 4.48 24.81 4 23.999 4c-.807 0-1.521.48-1.772 1.196L17.89 17.575H3.866c-.81 0-1.522.48-1.773 1.193-.251.714.018 1.492.675 1.936l11.35 7.652-4.336 12.381c-.25.716.026 1.494.684 1.934.326.218.709.329 1.092.329.383 0 .766-.11 1.095-.332l11.346-7.65 11.345 7.65a1.983 1.983 0 0 0 2.192.003c.657-.44.931-1.218.68-1.936l-4.335-12.379 11.352-7.652c.655-.444.927-1.222.673-1.936',
	fillRule: 'evenodd',
	clipRule: 'evenodd'
};

const Star: React.FC<IconProps> = (props) => {
	if (props.animated) {
		return (
			<Svg
				{...svg}
				size={props.size}
				animated={true}
				animatedProps={props.animatedSvgProps}
			>
				<Path
					{...path}
					fill={props.color}
					animated={true}
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

export default Star;
