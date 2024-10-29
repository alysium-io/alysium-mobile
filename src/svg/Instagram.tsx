import { Path, Svg } from '@atomic';
import { IconProps } from '@types';
import React from 'react';
import { PathProps, SvgProps } from 'react-native-svg';

const svg: SvgProps = {
	viewBox: '0 0 18 18',
	fill: 'none'
};

const path: PathProps = {
	d: 'M12.6 0H5.4C2.422 0 0 2.422 0 5.4v7.2C0 15.577 2.422 18 5.4 18h7.2c2.977 0 5.4-2.423 5.4-5.4V5.4C18 2.422 15.578 0 12.6 0ZM16.2 12.6c0 1.986-1.615 3.601-3.6 3.601H5.4c-1.985 0-3.6-1.615-3.6-3.6V5.4c0-1.985 1.615-3.6 3.6-3.6h7.2c1.985 0 3.6 1.615 3.6 3.6v7.2ZM9 4.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Zm0 7.2a2.7 2.7 0 1 1 0-5.4 2.7 2.7 0 0 1 0 5.4Zm5.139-7.84c.161.172.261.406.261.64 0 .234-.1.468-.261.639a.9.9 0 0 1-1.278 0 .893.893 0 0 1-.261-.639c0-.234.099-.468.261-.639a.904.904 0 0 1 1.278 0Z'
};

const Instagram: React.FC<IconProps> = (props) => (
	<Svg {...svg} size={props.size} color={props.color}>
		<Path {...path} fill={props.color} />
	</Svg>
);

export default Instagram;
