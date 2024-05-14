import { Path, Svg } from '@atomic';
import { IconProps } from '@types';
import React from 'react';
import { ClipPath, Defs, G, PathProps, SvgProps } from 'react-native-svg';

const svg: SvgProps = {
	viewBox: '0 0 18 18',
	fill: 'none'
};

const path1: PathProps = {
	fillRule: 'evenodd',
	d: 'M8.986.426c4.74 0 8.586 3.825 8.586 8.564a8.589 8.589 0 0 1-8.586 8.586c-4.739 0-8.564-3.847-8.564-8.586A8.553 8.553 0 0 1 8.986.426Zm0 7.204 2.635-2.635 1.382 1.36-2.635 2.635 2.635 2.635-1.382 1.382-2.635-2.636-2.635 2.636-1.36-1.382L7.626 8.99 4.991 6.355l1.36-1.36L8.986 7.63Z',
	clipRule: 'evenodd'
};

const path2: PathProps = {
	d: 'M0 0h18v18H0z'
};

const Clear: React.FC<IconProps> = (props) => {
	if (props.animated) {
		return (
			<Svg
				{...svg}
				size={props.size}
				animated={true}
				animatedProps={props.animatedSvgProps}
			>
				<G clipPath='url(#a)'>
					<Path
						{...path1}
						fill={props.color}
						animated={true}
						animatedProps={props.animatedPathProps}
					/>
				</G>
				<Defs>
					<ClipPath id='a'>
						<Path
							{...path2}
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
			<G clipPath='url(#a)'>
				<Path {...path1} fill={props.color} />
			</G>
			<Defs>
				<ClipPath id='a'>
					<Path {...path2} fill={props.color} />
				</ClipPath>
			</Defs>
		</Svg>
	);
};

export default Clear;
