import { Path, Svg } from '@atomic';
import { IconProps } from '@types';
import React from 'react';
import { PathProps, SvgProps } from 'react-native-svg';

const svg: SvgProps = {
	viewBox: '0 0 18 18',
	fill: 'none'
};

const path: PathProps = {
	d: 'M7.545 3.91 7.46 5.104a.269.269 0 0 0 .368.267l1.112-.448 1.11.448a.269.269 0 0 0 .37-.267l-.084-1.196.77-.918a.269.269 0 0 0-.14-.434l-1.163-.29-.635-1.015a.269.269 0 0 0-.456 0l-.636 1.016-1.162.29a.269.269 0 0 0-.141.433l.77.918ZM17.41 16.101h-1.224v-2.058a.424.424 0 0 0-.423-.423H13.21a.424.424 0 0 0-.423.423V16.1h-2.143V8.6a.423.423 0 0 0-.424-.423H7.667a.423.423 0 0 0-.424.423v7.502H5.1v-4.477a.423.423 0 0 0-.424-.424H2.121a.423.423 0 0 0-.423.424V16.1H.474a.542.542 0 0 0-.544.545c0 .296.242.544.544.544H17.41a.546.546 0 0 0 .544-.544.542.542 0 0 0-.544-.545Z'
};

const Rank: React.FC<IconProps> = (props) => {
	return (
		<Svg {...svg} size={props.size}>
			<Path {...path} fill={props.color} />
		</Svg>
	);
};

export default Rank;
