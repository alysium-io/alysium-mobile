import { View } from '@atomic';
import { Props } from '@types';
import React from 'react';

type TimeLineMarkerProps = Props<typeof View> & {
	type: 'circle' | 'diamond';
	size?: number;
};

const TimeLineMarker: React.FC<TimeLineMarkerProps> = ({
	type,
	size = 7,
	...props
}) => {
	return (
		<View
			backgroundColor='text.t'
			height={size}
			width={size}
			borderRadius={type === 'circle' ? 'round' : 'none'}
			style={{
				transform: [{ rotate: '45deg' }]
			}}
			{...props}
		/>
	);
};

export default TimeLineMarker;
