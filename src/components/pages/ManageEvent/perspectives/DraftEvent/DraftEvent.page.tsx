import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { RefreshControl, ScrollView, Section, Separator, View } from '@atomic';
import { artistEventApiSlice } from '@flux/api/event';
import { EventStatus } from '@flux/api/event/types';
import { useRefresh, useSheet } from '@hooks';
import { ActionButtons } from '@molecules';
import { BasePage } from '@organisms';
import { ShareEventPosterSheet } from '@popups';
import { PageError } from '@templates';
import { NanoId } from '@types';
import React, { useCallback } from 'react';
import { If, Then } from 'react-if';
import EditEventAboutMenuListItem from '../../components/EditEventAboutMenuListItem';
import EditEventDateMenuListItem from '../../components/EditEventDateMenuListItem';
import EditEventLocationMenuListItem from '../../components/EditEventLocationMenuListItem';
import EditEventName from '../../components/EditEventName';
import EditEventProfileImage from '../../components/EditEventProfileImage';
import EditEventTicketsUrlMenuListItem from '../../components/EditEventTicketsUrlMenuListItem';
import EditEventMediaSection from '../../components/EventMediaSection/EditEventMediaSection';
import PublicEventHeader from '../../components/PublicEvent.header';
import Loading from '../../Loading';
import ConfirmPublishEvent from './sheets/ConfirmPublishEvent';

interface DraftEventPageProps {
	event_uid: NanoId;
	setDraftToPublished: () => void;
}

const DraftEventPage: React.FC<DraftEventPageProps> = ({
	event_uid,
	setDraftToPublished
}) => {
	const { artistData } = useArtistAppContext();
	const confirmPublishEventSheetApi = useSheet();
	const shareExternalSheetApi = useSheet();

	const { data, refetch, error } =
		artistEventApiSlice.usePrivateFindOneArtistEventQuery({
			params: {
				event_uid,
				artist_uid: artistData.artist_uid
			}
		});

	const refreshControl = useRefresh(refetch);

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
						<ConfirmPublishEvent
							sheetApi={confirmPublishEventSheetApi}
							event_uid={event_uid}
							setDraftToPublished={setDraftToPublished}
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
			<ScrollView refreshControl={<RefreshControl {...refreshControl} />}>
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
				<Separator size='thick' />
				<EditEventMediaSection event={data} />
			</ScrollView>
			<ShareEventPosterSheet event={data} sheetApi={shareExternalSheetApi} />
		</BasePage>
	);
};

export default DraftEventPage;
