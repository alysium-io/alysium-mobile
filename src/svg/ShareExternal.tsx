import { Path, Svg } from '@atomic';
import { IconProps } from '@types';
import React from 'react';
import { G, PathProps, SvgProps } from 'react-native-svg';

const svg: SvgProps = {
	viewBox: '0 0 18 18',
	fill: 'none'
};

const path1: PathProps = {
	d: 'M16.98 11.172a.684.684 0 0 0-.694.694v2.558c0 .737-.585 1.301-1.323 1.301H3.038c-.715 0-1.3-.585-1.3-1.3v-2.56a.684.684 0 0 0-.694-.693.704.704 0 0 0-.716.694v2.558a2.712 2.712 0 0 0 2.71 2.71h11.925a2.712 2.712 0 0 0 2.71-2.71v-2.558a.685.685 0 0 0-.693-.694Z'
};

const path2: PathProps = {
	d: 'M5.056 5.859a.693.693 0 0 0 .499-.217l2.753-2.754v9.93c0 .391.303.694.694.694.39 0 .693-.303.693-.693V2.91l2.754 2.733c.282.282.715.26.975 0a.687.687 0 0 0 0-.976s-2.363-2.32-3.23-3.188C9.327.61 8.676.61 7.81 1.479L4.58 4.666c-.282.282-.282.716 0 .976.13.152.303.217.477.217Z'
};

const ShareExternal: React.FC<IconProps> = (props) => (
	<Svg {...svg} size={props.size}>
		<G fill={props.color}>
			<Path {...path1} />
			<Path {...path2} />
		</G>
	</Svg>
);

export default ShareExternal;
