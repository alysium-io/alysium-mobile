import { LiveIndicator, Text, View } from '@atomic';
import { Event } from '@flux/api/event';
import { ComplexEventStatus } from '@flux/api/event/types';
import { useEvent, withPoke } from '@hooks';
import React from 'react';

interface ComplexEventStatusIndicatorProps {
	event?: Event;
}

const ComplexEventStatusIndicator: React.FC<
	ComplexEventStatusIndicatorProps
> = ({ event }) => {
	const { complexStatus, semanticComplexStatus, _getComplexStatus } =
		useEvent(event);
	withPoke({
		interval: 5,
		checkFn: _getComplexStatus,
		name: 'ComplexEventStatusIndicator'
	});

	if (!event) return null;

	return (
		<View flexDirection='row' alignItems='center'>
			<LiveIndicator status={complexStatus} />
			<Text
				marginLeft='s'
				variant='paragraph-small-medium'
				color={complexStatus === ComplexEventStatus.live ? 'danger' : 'text.q'}
			>
				{semanticComplexStatus === 'Completed' ? 'EPK' : semanticComplexStatus}
			</Text>
		</View>
	);
};

export default ComplexEventStatusIndicator;
