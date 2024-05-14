import { Path, Svg } from '@atomic';
import { IconProps } from '@types';
import React from 'react';
import { PathProps, SvgProps } from 'react-native-svg';

const svg: SvgProps = {
	viewBox: '0 0 18 18',
	fill: 'none'
};

const path: PathProps = {
	d: 'M15.75 4.5c0-.22-.129-.42-.33-.512L9.233 1.176a.56.56 0 0 0-.466 0L2.58 3.988a.562.562 0 0 0 0 1.024l6.187 2.813a.56.56 0 0 0 .466 0l6.187-2.813a.562.562 0 0 0 .33-.512ZM8.108 9.05 1.92 6.238a.564.564 0 0 0-.795.512v6.75c0 .22.129.42.33.512l6.187 2.812a.56.56 0 0 0 .795-.512v-6.75c0-.22-.128-.42-.33-.512ZM16.617 6.277a.562.562 0 0 0-.537-.039L9.892 9.051a.562.562 0 0 0-.33.512v6.75a.563.563 0 0 0 .796.512l6.187-2.813a.562.562 0 0 0 .33-.512V6.75a.563.563 0 0 0-.258-.473Z'
};

const Components: React.FC<IconProps> = (props) => {
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

export default Components;
