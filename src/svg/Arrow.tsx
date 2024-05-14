import { Path, Svg } from '@atomic';
import { IconProps } from '@types';
import React from 'react';
import { PathProps, SvgProps } from 'react-native-svg';

const svg: SvgProps = {
	viewBox: '0 0 24 24',
	fill: 'none'
};

const path: PathProps = {
	d: 'M5.707 9.71a1 1 0 0 0 0 1.415l4.892 4.887a2 2 0 0 0 2.828 0l4.89-4.89a1 1 0 1 0-1.414-1.415l-4.185 4.186a1 1 0 0 1-1.415 0L7.121 9.71a1 1 0 0 0-1.414 0Z'
	// fillRule: 'evenodd',
	// clipRule: 'evenodd'
};

const Arrow: React.FC<IconProps> = (props) => {
	const getDirection = (): string => {
		/**
		 * Returns 'right' by default
		 */
		switch (props.direction) {
			case 'up':
				return '180deg';
			case 'down':
				return '0deg';
			case 'left':
				return '90deg';
			case 'right':
				return '270deg';
			default:
				return '0deg';
		}
	};

	if (props.animated) {
		return (
			<Svg
				{...svg}
				animated={true}
				animatedProps={props.animatedSvgProps}
				size={props.size}
				style={{ transform: [{ rotate: getDirection() }] }}
			>
				<Path
					{...path}
					animated={true}
					animatedProps={props.animatedPathProps}
					fill={props.color}
				/>
			</Svg>
		);
	}

	return (
		<Svg
			{...svg}
			size={props.size}
			style={{ transform: [{ rotate: getDirection() }] }}
		>
			<Path {...path} fill={props.color} />
		</Svg>
	);
};

export default Arrow;
