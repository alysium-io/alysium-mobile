import { View } from '@atomic';
import { EventLink } from '@flux/api/event-link/event-link.entity';
import { useNavigation } from '@hooks';
import { SimpleButton } from '@molecules';
import React from 'react';

interface EditAndViewSimpleButtonsProps {
	eventData: EventLink;
}

const EditAndViewSimpleButtons: React.FC<EditAndViewSimpleButtonsProps> = ({
	eventData
}) => {
	const { eventPage, editPublishedEventPage } = useNavigation();

	return (
		<View margin='m' columnGap='m' flexDirection='row'>
			<SimpleButton
				onPress={() => editPublishedEventPage(eventData.event.event_uid)}
				style={{ flex: 1 }}
				text='Edit Event'
			/>
			<SimpleButton
				onPress={() =>
					eventPage(eventData.event.event_uid, {
						to: 'EventPage',
						to_uid: eventData.event.event_uid,
						from: 'ManageEventPage',
						from_uid: eventData.event.event_uid,
						using: 'EVENT_PAGE_VIEW_PAGE_SIMPLE_BUTTON'
					})
				}
				style={{ flex: 1 }}
				text='View Page'
				afterIconProps={{ name: 'arrow-right' }}
			/>
		</View>
	);
};

export default EditAndViewSimpleButtons;
