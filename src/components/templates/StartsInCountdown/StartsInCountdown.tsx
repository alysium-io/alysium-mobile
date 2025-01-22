import { Text } from '@atomic';
import { Event } from '@flux/api/event';
import { useEvent, withPoke } from '@hooks';
import { Props } from '@types';
import dayjs from 'dayjs';
import React from 'react';

type StartsInCountdownProps = Props<typeof Text> & {
	event?: Event;
};

const StartsInCountdown: React.FC<StartsInCountdownProps> = ({
	event,
	...props
}) => {
	// Make sure to keep this ticker segregated here otherwise the
	// popup menu will retrigger while trying to close the sheet
	// if this updates at the same time.
	const { isLive, isEnded, isCompleted, isComingUp } = useEvent(event);
	const startTime = dayjs(event?.start_time);
	withPoke({
		interval: 1,
		name: 'StartsInCountdown'
	});

	if (!startTime || !startTime.isValid()) {
		return null;
	}

	if (isComingUp) {
		return (
			<Text variant='paragraph' color='text.s' marginBottom='s' {...props}>
				starts {startTime.untilFormatted()}
			</Text>
		);
	}

	if (isLive) {
		return (
			<Text variant='paragraph' color='text.s' marginBottom='s' {...props}>
				Live
			</Text>
		);
	}

	if (isEnded) {
		return (
			<Text variant='paragraph' color='text.s' marginBottom='s' {...props}>
				event has ended
			</Text>
		);
	}

	if (isCompleted) {
		return (
			<Text variant='paragraph' color='text.s' marginBottom='s' {...props}>
				{startTime.fromNow()}
			</Text>
		);
	}

	return null;
};

export default StartsInCountdown;
