import { Props } from '@types';
import React from 'react';
import TimeLineContainer from './TimeLineContainer';
import TimeLineMarker from './TimeLineMarker';
import TimeLineTail from './TimeLineTail';

interface TimeLineProps {
	topTailProps?: Props<typeof TimeLineTail>;
	bottomTailProps?: Props<typeof TimeLineTail>;
	markerProps?: Props<typeof TimeLineMarker>;
}

const TimeLine: React.FC<TimeLineProps> = ({
	topTailProps,
	bottomTailProps,
	markerProps
}) => {
	return (
		<TimeLineContainer>
			<TimeLineTail vertical='top' {...topTailProps} />
			<TimeLineTail vertical='bottom' {...bottomTailProps} />
			<TimeLineMarker type='diamond' {...markerProps} />
		</TimeLineContainer>
	);
};

export default TimeLine;
