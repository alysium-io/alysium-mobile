import { View } from '@atomic';
import { EventLink } from '@flux/api/event-link/event-link.entity';
import { useEvent, useSheet } from '@hooks';
import { Button } from '@molecules';
import React from 'react';
import ConfirmAddToEpkSheet from '../sheets/ConfirmAddToEpkSheet';

interface CompleteEventFooterProps {
	event?: EventLink;
	setPublishedToCompleted: () => void;
}

const CompleteEventFooter: React.FC<CompleteEventFooterProps> = ({
	event,
	setPublishedToCompleted
}) => {
	const { isEnded } = useEvent(event?.event);
	const confirmAddToEpkSheetApi = useSheet();
	if (isEnded && event) {
		return (
			<View margin='m'>
				<Button
					text='Add to EPK'
					color='p'
					afterIconProps={{
						name: 'arrow-right'
					}}
					onPress={confirmAddToEpkSheetApi.open}
				/>
				<ConfirmAddToEpkSheet
					sheetApi={confirmAddToEpkSheetApi}
					event_uid={event.event.event_uid}
					setPublishedToCompleted={setPublishedToCompleted}
				/>
			</View>
		);
	}
	return null;
};

export default CompleteEventFooter;
