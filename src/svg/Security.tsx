import { Path, Svg } from '@atomic';
import { IconProps } from '@types';
import React from 'react';
import { PathProps, SvgProps } from 'react-native-svg';

const svg: SvgProps = {
	viewBox: '0 0 18 18',
	fill: 'none'
};

const path: PathProps = {
	d: 'm14.368 3.63-9.96 9.96a.855.855 0 0 1-1.307-.12C2.05 11.936 1.43 10.12 1.43 8.254V4.53c0-.696.526-1.485 1.17-1.748L7.326.847a4.344 4.344 0 0 1 3.326 0l3.436 1.4a.85.85 0 0 1 .28 1.382ZM15.165 4.795c.552-.467 1.392-.068 1.392.653v2.808c0 4.149-3.012 8.035-7.127 9.172-.28.076-.585.076-.874 0a9.587 9.587 0 0 1-3.283-1.655.853.853 0 0 1-.094-1.272c1.85-1.892 7.263-7.407 9.986-9.706Z'
};

const Security: React.FC<IconProps> = (props) => {
	if (props.animated) {
		return (
			<Svg
				{...svg}
				size={props.size}
				animated={props.animated}
				animatedProps={props.animatedSvgProps}
			>
				<Path
					{...path}
					fill={props.color}
					animated={props.animated}
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

export default Security;
