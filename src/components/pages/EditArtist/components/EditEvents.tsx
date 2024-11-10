import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { Section, Text } from '@atomic';
import { artistEventApiSlice } from '@flux/api/event';
import { useImage, useNavigation, useSheet } from '@hooks';
import { ContentListItem } from '@molecules';
import { CreateArtistEventBottomSheet } from '@popups';
import React from 'react';

const EditEvents = () => {
	const createArtistEventBottomSheet = useSheet();
	const { artistData } = useArtistAppContext();
	const { editArtistEventPage } = useNavigation();
	const { urlForKey } = useImage();
	const { data } = artistEventApiSlice.usePrivateFindAllArtistEventsQuery({
		params: {
			artist_uid: artistData.artist_uid
		}
	});

	const onPressCreateEvent = () => {
		createArtistEventBottomSheet.open();
	};

	return (
		<Section>
			<Text variant='section-header-2' marginHorizontal='m' marginBottom='m'>
				Events
			</Text>
			<ContentListItem
				onPress={onPressCreateEvent}
				titleTextProps={{
					title: 'Create Event',
					bottomSubtext: 'Add a new event to your profile'
				}}
				profileImageProps={{
					borderRadius: 'none',
					defaultImageProps: {
						icon: 'plus'
					}
				}}
			/>
			{data?.map((event) => (
				<ContentListItem
					key={event.event.event_uid}
					onPress={() =>
						editArtistEventPage(event.event.event_uid, {
							from: 'EditArtistPage',
							from_uid: artistData.artist_uid,
							to: 'EditArtistEventPage',
							to_uid: event.event.event_uid,
							using: 'EDIT_ARTIST_EVENT_CONTENT_LIST_ITEM'
						})
					}
					titleTextProps={{
						title: event.event.name,
						bottomSubtext: event.event.status
					}}
					profileImageProps={{
						image: urlForKey(event.event.profile_image?.small.key),
						borderRadius: 'none',
						defaultImageProps: {
							icon: 'event'
						}
					}}
				/>
			))}
			<CreateArtistEventBottomSheet sheetApi={createArtistEventBottomSheet} />
		</Section>
	);
};

export default EditEvents;
