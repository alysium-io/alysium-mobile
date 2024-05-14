import { Path, Svg } from '@atomic';
import { IconProps } from '@types';
import React from 'react';
import { PathProps, SvgProps } from 'react-native-svg';

const svg: SvgProps = {
	viewBox: '0 0 18 18',
	fill: 'none'
};

const path: PathProps = {
	d: 'M1.694 9.027H17.643c-.26-3.83-3.46-6.867-7.354-6.867H7.717C3.882 2.16.729 5.104.383 8.85c.064.057.127.117.19.177h1.12ZM5.942 12.653l3.13-2.551h-6.26l3.13 2.55ZM17.66 11.45a1.35 1.35 0 0 0-1.349-1.348h-5.634l-3.31 2.697h8.944a1.35 1.35 0 0 0 1.349-1.348ZM1.69 13.809H.39a2.54 2.54 0 0 0 2.486 2.03H15.12a2.54 2.54 0 0 0 2.485-2.03H1.69ZM1.693 12.8h2.835l-3.23-2.632c-.55.17-.954.678-.954 1.283a1.35 1.35 0 0 0 1.349 1.35Z'
};

const Cheeseburger: React.FC<IconProps> = (props) => {
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

export default Cheeseburger;
