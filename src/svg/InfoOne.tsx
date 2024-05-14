import { Path, Svg } from '@atomic';
import { IconProps } from '@types';
import React from 'react';
import { ClipPath, Defs, G, PathProps, SvgProps } from 'react-native-svg';

const svg: SvgProps = {
	viewBox: '0 0 18 18',
	fill: 'none'
};

const path1: PathProps = {
	d: 'M9 .54a8.46 8.46 0 1 0 0 16.919A8.46 8.46 0 0 0 9 .539Zm0 15.282a6.822 6.822 0 1 1-.001-13.645 6.822 6.822 0 0 1 0 13.645Z'
};

const path2: PathProps = {
	d: 'M9.902 9.469c0-.22-.095-.43-.264-.586a.941.941 0 0 0-.636-.242.941.941 0 0 0-.637.242.796.796 0 0 0-.263.586v2.484c0 .22.094.43.263.585a.941.941 0 0 0 .637.243.941.941 0 0 0 .636-.243.796.796 0 0 0 .264-.585V9.469ZM9.002 6.48c.497 0 .9-.363.9-.81 0-.448-.403-.81-.9-.81s-.9.362-.9.81c0 .447.403.81.9.81Z'
};

const path3: PathProps = {
	d: 'M0 0h18v18H0z'
};

const InfoOne: React.FC<IconProps> = (props) => {
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
					<Path fill={props.color} {...path3} />
				</ClipPath>
			</Defs>
		</Svg>
	);
};

export default InfoOne;
