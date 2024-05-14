import { Path, Svg } from '@atomic';
import { IconProps } from '@types';
import React from 'react';
import { PathProps, SvgProps } from 'react-native-svg';

const svg: SvgProps = {
	viewBox: '0 0 18 18',
	fill: 'none'
};

const path: PathProps = {
	d: 'm13.833 2.957.57.57a3.627 3.627 0 0 1 .678 4.185l-.04.08H8.998l-4.834 2.417v6.043a1.209 1.209 0 0 0 2.417 0v-1.813c0-1 .812-1.813 1.813-1.813h4.835c1 0 1.813.812 1.813 1.813v1.813a1.209 1.209 0 0 0 2.417 0V6.582a3.626 3.626 0 0 0-3.626-3.625ZM4.77.54l-.605 2.416L.539 4.165l.442 1.768c.1.404.403.726.798.856l1.681.547L3.884 9l4.511-2.2L4.769.54Z'
};

const Dog: React.FC<IconProps> = (props) => {
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

export default Dog;
