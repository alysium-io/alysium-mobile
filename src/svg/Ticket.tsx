import { Path, Svg } from '@atomic';
import { IconProps } from '@types';
import React from 'react';
import { PathProps, SvgProps } from 'react-native-svg';

const svg: SvgProps = {
	viewBox: '0 0 18 18',
	fill: 'none'
};

const path: PathProps = {
	d: 'M17.026 7.774a.62.62 0 0 0 .618-.618V5.3a2.471 2.471 0 0 0-2.47-2.473H7.145v2.473c0 .816-1.235.816-1.235 0V2.828H2.822a2.471 2.471 0 0 0-2.47 2.473v1.855c0 .34.277.618.617.618 1.637 0 1.637 2.473 0 2.473a.62.62 0 0 0-.617.618v1.855a2.47 2.47 0 0 0 2.47 2.473H5.91V12.72c0-.816 1.235-.816 1.235 0v2.473h8.029a2.47 2.47 0 0 0 2.47-2.473v-1.855a.62.62 0 0 0-.618-.618c-1.636 0-1.636-2.473 0-2.473Zm-9.881 2.473c0 .816-1.235.816-1.235 0V7.774c0-.816 1.235-.816 1.235 0v2.473Z'
};

const Ticket: React.FC<IconProps> = (props) => {
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

export default Ticket;
