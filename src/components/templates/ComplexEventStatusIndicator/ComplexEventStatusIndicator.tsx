import { LiveIndicator, Text, View } from '@atomic';
import { Event } from '@flux/api/event';
import { ComplexEventStatus } from '@flux/api/event/types';
import { useComplexEventStatus } from '@hooks';
import React from 'react';

interface ComplexEventStatusIndicatorProps {
	event?: Event;
}

const ComplexEventStatusIndicator: React.FC<
	ComplexEventStatusIndicatorProps
> = ({ event }) => {
	const { complexStatus, semanticStatus } = useComplexEventStatus(event, {
		pokeInterval: 15
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
				{semanticStatus}
			</Text>
		</View>
	);
};

export default ComplexEventStatusIndicator;
