import { Text } from '@atomic';
import { Event } from '@flux/api/event';
import { ComplexEventStatus } from '@flux/api/event/types';
import { useDatetimeCountdown, useEvent, useEventDateFormatter } from '@hooks';
import { Props } from '@types';
import React from 'react';

type StartsInCountdownProps = Props<typeof Text> & {
	event?: Event;
};

const StartsInCountdown: React.FC<StartsInCountdownProps> = ({
	event,
	...props
}) => {
	const { calculateComplexStatus } = useEvent();
	const complexStatus = calculateComplexStatus(event);

	// Make sure to keep this ticker segregated here otherwise the
	// popup menu will retrigger while trying to close the sheet
	// if this updates at the same time.
	const { countdown } = useDatetimeCountdown(
		event?.start_time ?? undefined,
		'D[d], H[h], m[m], s[s]'
	);

	const dateFormatter = useEventDateFormatter(
		event?.start_time,
		event?.end_time
	);

	if (countdown) {
		return (
			<Text variant='paragraph' color='text.s' marginBottom='s' {...props}>
				starts in {countdown}
			</Text>
		);
	}

	if (complexStatus === ComplexEventStatus.live) {
		return (
			<Text variant='paragraph' color='text.s' marginBottom='s' {...props}>
				Currently Live
			</Text>
		);
	}

	if (complexStatus === ComplexEventStatus.archived) {
		return (
			<Text variant='paragraph' color='text.s' marginBottom='s' {...props}>
				{dateFormatter.timeAgoConcise() || 'Completed'}
			</Text>
		);
	}

	return null;
};

export default StartsInCountdown;
