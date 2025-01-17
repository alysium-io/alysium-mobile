import { View } from '@atomic';
import { Props } from '@types';
import React from 'react';

type TimeLineTailProps = Props<typeof View> & {
	vertical: 'top' | 'bottom' | 'none';
};
const TimeLineTail: React.FC<TimeLineTailProps> = ({ vertical, ...props }) => {
	const TAIL_WIDTH = 1.5;
	if (vertical === 'none') return null;
	return (
		<View
			position='absolute'
			left='50%'
			top={vertical === 'top' ? 0 : undefined}
			bottom={vertical === 'bottom' ? 0 : undefined}
			width={TAIL_WIDTH}
			height='50%'
			backgroundColor='text.s'
			opacity={0.8}
			style={{
				transform: [{ translateX: -TAIL_WIDTH / 2 }]
			}}
			{...props}
		/>
	);
};

export default TimeLineTail;
