import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { Section, View } from '@atomic';
import { artistEventApiSlice } from '@flux/api/event';
import { EventStatus } from '@flux/api/event/types';
import { useKeyboard, useSheet } from '@hooks';
import { ActionButtons } from '@molecules';
import { BasePage } from '@organisms';
import { ShareEventPosterSheet } from '@popups';
import { useRoute } from '@react-navigation/native';
import { PageError } from '@templates';
import { EditPublishedEventPageRouteProp } from '@types';
import React, { useCallback } from 'react';
import { If, Then } from 'react-if';
import { ScrollView } from 'react-native';
import EditEventAboutMenuListItem from '../../components/EditEventAboutMenuListItem';
import EditEventDateMenuListItem from '../../components/EditEventDateMenuListItem';
import EditEventGallery from '../../components/EditEventGallery';
import EditEventLocationMenuListItem from '../../components/EditEventLocationMenuListItem';
import EditEventName from '../../components/EditEventName';
import EditEventProfileImage from '../../components/EditEventProfileImage';
import EditEventTicketsUrlMenuListItem from '../../components/EditEventTicketsUrlMenuListItem';
import PublicEventHeader from '../../components/PublicEvent.header';
import Loading from '../../Loading';

const EditPublishedEvent = () => {
	const route = useRoute<EditPublishedEventPageRouteProp>();
	const { dismiss } = useKeyboard();
	const { artistData } = useArtistAppContext();
	const confirmPublishEventSheetApi = useSheet();
	const shareExternalSheetApi = useSheet();
	const { data, error } = artistEventApiSlice.usePrivateFindOneArtistEventQuery(
		{
			params: {
				event_uid: route.params.event_uid,
				artist_uid: artistData.artist_uid
			}
		}
	);

	const FooterComponent = useCallback(
		() => (
			<If condition={data?.event.status === EventStatus.draft}>
				<Then>
					<View margin='m'>
						<ActionButtons
							buttonProps={{
								text: 'Publish',
								onPress: confirmPublishEventSheetApi.open,
								color: 'p'
							}}
						/>
					</View>
				</Then>
			</If>
		),
		[data?.event.status]
	);

	if (error) {
		return <PageError error={error} />;
	}

	if (!data) {
		return <Loading />;
	}

	return (
		<BasePage FooterComponent={FooterComponent}>
			<PublicEventHeader event={data} />
			<ScrollView onScrollBeginDrag={dismiss}>
				<Section marginBottom='none'>
					<EditEventProfileImage event_uid={data.event.event_uid} />
					<EditEventName event_uid={data.event.event_uid} />
				</Section>
				<EditEventDateMenuListItem
					event_uid={data.event.event_uid}
					startTime={data.event.start_time}
					endTime={data.event.end_time}
				/>
				<EditEventLocationMenuListItem event={data} />
				<EditEventAboutMenuListItem event={data} />
				<EditEventTicketsUrlMenuListItem event={data} />
				<EditEventGallery event={data} />
			</ScrollView>
			<ShareEventPosterSheet event={data} sheetApi={shareExternalSheetApi} />
		</BasePage>
	);
};

export default EditPublishedEvent;
