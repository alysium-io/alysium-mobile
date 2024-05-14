import { Path, Svg } from '@atomic';
import { IconProps } from '@types';
import React from 'react';
import { ClipPath, Defs, G, PathProps, SvgProps } from 'react-native-svg';

const svg: SvgProps = {
	viewBox: '0 0 18 18',
	fill: 'none'
};

const path1: PathProps = {
	d: 'M9 0a9 9 0 1 0 0 18A9 9 0 0 0 9 0Zm0 16.2A7.2 7.2 0 1 1 9 1.8a7.2 7.2 0 0 1 0 14.4Z'
};

const path2: PathProps = {
	d: 'M8.102 8.1h1.8v5.4h-1.8V8.1Zm0-3.6h1.8v1.8h-1.8V4.5Z'
};

const path3: PathProps = {
	d: 'M0 0h18v18H0z'
};

const InfoTwo: React.FC<IconProps> = (props) => {
	if (props.animated) {
		return (
			<Svg
				{...svg}
				size={props.size}
				animated={true}
				animatedProps={props.animatedSvgProps}
			>
				<G fill={props.color} clipPath='url(#a)'>
					<Path
						{...path1}
						animated={true}
						animatedProps={props.animatedPathProps}
					/>
					<Path
						{...path2}
						animated={true}
						animatedProps={props.animatedPathProps}
					/>
				</G>
				<Defs>
					<ClipPath id='a'>
						<Path
							{...path3}
							fill={props.color}
							animated={true}
							animatedProps={props.animatedPathProps}
						/>
					</ClipPath>
				</Defs>
			</Svg>
		);
	}

	return (
		<Svg {...svg} size={props.size}>
			<G fill={props.color} clipPath='url(#a)'>
				<Path {...path1} />
				<Path {...path2} />
			</G>
			<Defs>
				<ClipPath id='a'>
					<Path {...path3} fill={props.color} />
				</ClipPath>
			</Defs>
		</Svg>
	);
};

export default InfoTwo;
