import { Path, Svg } from '@atomic';
import { IconProps } from '@types';
import React from 'react';
import { PathProps, SvgProps } from 'react-native-svg';

const svg: SvgProps = {
	viewBox: '0 0 18 18',
	fill: 'none'
};

const path: PathProps = {
	d: 'M7.877 4.351c2.025-.452 3.976.375 5.101 1.874l-8.774 2.025c.299-1.875 1.722-3.452 3.673-3.9ZM13.05 11.701c-.673.972-1.721 1.722-2.923 1.948-2.024.452-3.975-.375-5.1-1.948l8.774-1.951 1.427-.3 2.774-.6c0-.6-.076-1.202-.225-1.726C16.652 2.25 11.853-.674 6.978.451 2.104 1.576-0.897 6.299.228 11.024c1.125 4.726 5.924 7.726 10.799 6.601 2.85-.673 5.1-2.548 6.149-4.951.076-.073-4.126-.972-4.126-.972Z'
};

const Eventbrite: React.FC<IconProps> = (props) => (
	<Svg {...svg} size={props.size} color={props.color}>
		<Path {...path} fill={props.color} />
	</Svg>
);

export default Eventbrite;
