import { View } from '@atomic';
import { Props } from '@types';
import React from 'react';

type TimeLineContainerProps = Props<typeof View> & {};

const TimeLineContainer: React.FC<TimeLineContainerProps> = (props) => {
	return (
		<View
			justifyContent='center'
			alignItems='center'
			height='100%'
			{...props}
		/>
	);
};

export default TimeLineContainer;
