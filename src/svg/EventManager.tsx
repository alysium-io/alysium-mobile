import { Path, Svg } from '@atomic';
import { IconProps } from '@types';
import React from 'react';
import { PathProps, SvgProps } from 'react-native-svg';

const svg: SvgProps = {
	fill: 'none',
	viewBox: '0 0 101 101'
};

const path1: PathProps = {
	strokeLinecap: 'round',
	strokeLinejoin: 'round',
	strokeWidth: 5,
	d: 'M29.461 17.297a16.833 16.833 0 0 0-12.625 16.328V75.71a16.833 16.833 0 0 0 16.833 16.833h33.667a16.833 16.833 0 0 0 16.833-16.833V33.625A16.834 16.834 0 0 0 71.544 17.34'
};

const path2: PathProps = {
	strokeLinecap: 'round',
	strokeLinejoin: 'round',
	strokeWidth: 5,
	d: 'M37.878 25.208a8.416 8.416 0 0 1 0-16.833h25.25a8.416 8.416 0 0 1 0 16.833h-25.25Z'
};

const path3: PathProps = {
	strokeLinecap: 'round',
	strokeWidth: 4,
	d: 'M34 44h31M34 58h16'
};

const EventManager: React.FC<IconProps> = (props) => {
	if (props.animated) {
		return (
			<Svg
				{...svg}
				size={props.size}
				animated={true}
				animatedProps={props.animatedSvgProps}
			>
				<Path
					{...path1}
					stroke={props.color}
					animated={true}
					animatedProps={props.animatedPathProps}
				/>
				<Path
					{...path2}
					stroke={props.color}
					animated={true}
					animatedProps={props.animatedPathProps}
				/>
				<Path
					{...path3}
					stroke={props.color}
					animated={true}
					animatedProps={props.animatedPathProps}
				/>
			</Svg>
		);
	}

	return (
		<Svg {...svg} size={props.size}>
			<Path {...path1} stroke={props.color} />
			<Path {...path2} stroke={props.color} />
			<Path {...path3} stroke={props.color} />
		</Svg>
	);
};

export default EventManager;
