import { Path, Svg } from '@atomic';
import { IconProps } from '@types';
import React from 'react';
import { ClipPath, Defs, G, PathProps, SvgProps } from 'react-native-svg';

const svg: SvgProps = {
	viewBox: '0 0 18 18',
	fill: 'none'
};

const path1: PathProps = {
	d: 'M5.15 17.354 9 13.801l3.85 3.554a.313.313 0 0 0 .525-.23V7.437h-8.75v9.688c0 .124.074.236.187.286a.31.31 0 0 0 .337-.057Z'
};

const path2: PathProps = {
	d: 'M17.244.586a.314.314 0 0 0-.34.067L13.87 3.687H2.38A.936.936 0 0 0 .563 4v2.5a.936.936 0 0 0 1.817.313H13.871l3.033 3.033a.312.312 0 0 0 .533-.221V.875a.312.312 0 0 0-.193-.289Z'
};

const path3: PathProps = {
	d: 'M0 0h18v18H0z'
};

const Event: React.FC<IconProps> = (props) => {
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

export default Event;
