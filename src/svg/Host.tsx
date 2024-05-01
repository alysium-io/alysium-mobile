import { Path, Svg } from '@atomic';
import { IconProps } from '@types';
import React from 'react';
import { PathProps, SvgProps } from 'react-native-svg';

const svg: SvgProps = {
	viewBox: '0 0 18 18',
	fill: 'none'
};

const path1: PathProps = {
	d: 'M9.002 12.92a3.694 3.694 0 0 0 3.69-3.69V4.14A3.694 3.694 0 0 0 9.003.45a3.694 3.694 0 0 0-3.69 3.69v5.09a3.694 3.694 0 0 0 3.69 3.69Zm0-11.57a2.793 2.793 0 0 1 2.79 2.79v2.326h-5.58V4.14a2.793 2.793 0 0 1 2.79-2.79Z'
};

const path2: PathProps = {
	d: 'M14.544 9.23V7.38h-.9V9.23a4.647 4.647 0 0 1-4.642 4.642A4.647 4.647 0 0 1 4.361 9.23V7.38h-.9V9.23a5.548 5.548 0 0 0 5.091 5.522v1.897H6.225v.9h5.555v-.9H9.452v-1.897a5.548 5.548 0 0 0 5.092-5.522Z'
};

const Host: React.FC<IconProps> = (props) => {
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
					fill={props.color}
					animated={true}
					animatedProps={props.animatedPathProps}
				/>
				<Path
					{...path2}
					fill={props.color}
					animated={true}
					animatedProps={props.animatedPathProps}
				/>
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

export default Host;
