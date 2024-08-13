import { Path, Svg } from '@atomic';
import { IconProps } from '@types';
import React from 'react';
import { PathProps, SvgProps } from 'react-native-svg';

const svg: SvgProps = {
	viewBox: '0 0 18 18',
	fill: 'none'
};

const path: PathProps = {
	fillRule: 'evenodd',
	clipRule: 'evenodd',
	d: 'M3.553 11.996a.612.612 0 0 0-.613.612v1.224H1.104a.612.612 0 1 0 0 1.224H2.94v1.225c0 .338.274.612.612.612H5.39A.612.612 0 0 0 6 16.28v-1.224h11.017a.613.613 0 1 0 0-1.224H6v-1.224a.612.612 0 0 0-.612-.612H3.552ZM12.733 6.488a.612.612 0 0 0-.612.612v1.224H1.104a.612.612 0 1 0 0 1.225h11.017v1.224c0 .338.274.612.612.612h1.837a.612.612 0 0 0 .612-.612V9.549h1.836a.612.612 0 1 0 0-1.225h-1.836V7.1a.612.612 0 0 0-.612-.612h-1.837ZM3.553.98a.612.612 0 0 0-.613.613v1.224H1.104a.612.612 0 1 0 0 1.224H2.94v1.224c0 .338.274.612.612.612H5.39A.612.612 0 0 0 6 5.265V4.04h11.017a.612.612 0 1 0 0-1.224H6V1.593A.612.612 0 0 0 5.389.98H3.552Z'
};

const Filter: React.FC<IconProps> = (props) => {
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
export default Filter;
