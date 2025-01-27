import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { artistEventApiSlice } from '@flux/api/event';
import { useNavigation } from '@hooks';
import { MenuListItem } from '@molecules';
import { NanoId } from '@types';
import React from 'react';

interface ActionGoToLivePageProps {
	event_uid: NanoId;
}

const ActionGoToLivePage: React.FC<ActionGoToLivePageProps> = ({
	event_uid
}) => {
	const { eventPage } = useNavigation();
	const { artistData } = useArtistAppContext();
	const { data: eventData } =
		artistEventApiSlice.usePrivateFindOneArtistEventQuery({
			params: {
				event_uid,
				artist_uid: artistData.artist_uid
			}
		});

	if (!eventData) return null;

	return (
		<MenuListItem
			onPress={() =>
				eventPage(eventData.event.event_uid, {
					to: 'EventPage',
					to_uid: eventData.event.event_uid,
					from: 'ManageEventPage',
					from_uid: event_uid,
					using: 'PUBLISHED_EVENT_ACTION_VIEW_LIVE_PAGE_IN_APP'
				})
			}
			prefixIconProps={{
				name: 'logo',
				size: 'm'
			}}
			titleTextProps={{
				title: 'Live Page',
				bottomSubtext: 'View your event page on Alysium',
				titleVariant: 'paragraph',
				bottomSubtextColor: 'text.q'
			}}
		/>
	);
};

export default ActionGoToLivePage;
