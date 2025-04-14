import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { RefreshControl, ScrollView, Separator, View } from '@atomic';
import { artistEventApiSlice } from '@flux/api/event';
import { EventStatus } from '@flux/api/event/types';
import { useEvent, useRefresh, useSheet, useTheme } from '@hooks';
import { ActionButtons } from '@molecules';
import { BasePage } from '@organisms';
import { ShareEventPosterSheet } from '@popups';
import { PageError } from '@templates';
import { NanoId } from '@types';
import React, { useCallback } from 'react';
import EditEventAboutMenuListItem from '../../components/EditEventAboutMenuListItem';
import EditEventDateMenuListItem from '../../components/EditEventDateMenuListItem';
import EditEventLocationMenuListItem from '../../components/EditEventLocationMenuListItem';
import EditEventName from '../../components/EditEventName';
import EditEventProfileImage from '../../components/EditEventProfileImage';
import EditEventTicketsUrlMenuListItem from '../../components/EditEventTicketsUrlMenuListItem';
import EditEventMediaSection from '../../components/EventMediaSection/EditEventMediaSection';
import PublicEventHeader from '../../components/PublicEvent.header';
import Loading from '../../Loading';
import ConfirmAddToEpkSheet from '../../sheets/ConfirmAddToEpkSheet';
import ConfirmPublishEvent from './sheets/ConfirmPublishEvent';
interface DraftEventPageProps {
	event_uid: NanoId;
	setDraftToPublished: () => void;
}

const DraftEventPage: React.FC<DraftEventPageProps> = ({
	event_uid,
	setDraftToPublished
}) => {
	const { theme } = useTheme();
	const { artistData } = useArtistAppContext();
	const confirmPublishEventSheetApi = useSheet();
	const confirmAddToEpkSheetApi = useSheet();
	const shareExternalSheetApi = useSheet();

	const { data, refetch, error } =
		artistEventApiSlice.usePrivateFindOneArtistEventQuery({
			params: {
				event_uid,
				artist_uid: artistData.artist_uid
			}
		});

	const { isInPast } = useEvent(data?.event);

	const refreshControl = useRefresh(refetch);

	const FooterComponent = useCallback(() => {
		if (data?.event.status === EventStatus.draft) {
			return (
				<View margin='m'>
					<ActionButtons
						buttonProps={
							isInPast
								? [
										{
											text: 'Publish',
											onPress: confirmPublishEventSheetApi.open,
											color: 'p',
											variant: 'outlined'
										},
										{
											text: 'Save to EPK',
											onPress: confirmAddToEpkSheetApi.open,
											color: 'p',
											afterIconProps: {
												name: 'arrow-right'
											}
										}
								  ]
								: {
										text: 'Publish',
										onPress: confirmPublishEventSheetApi.open,
										color: 'p'
								  }
						}
					/>
					<ConfirmPublishEvent
						sheetApi={confirmPublishEventSheetApi}
						event_uid={event_uid}
						setDraftToPublished={setDraftToPublished}
					/>
					<ConfirmAddToEpkSheet
						sheetApi={confirmAddToEpkSheetApi}
						event_uid={event_uid}
						setPublishedToCompleted={setDraftToPublished}
					/>
				</View>
			);
		}
	}, [data?.event.status, isInPast]);

	if (error) {
		return <PageError error={error} />;
	}

	if (!data) {
		return <Loading />;
	}

	return (
		<BasePage FooterComponent={FooterComponent}>
			<PublicEventHeader event={data} />
			<ScrollView
				contentContainerStyle={{ gap: theme.spacing.xxl }}
				refreshControl={<RefreshControl {...refreshControl} />}
			>
				<View>
					<EditEventProfileImage event_uid={data.event.event_uid} />
					<EditEventName event_uid={data.event.event_uid} />
					<EditEventDateMenuListItem
						event_uid={data.event.event_uid}
						startTime={data.event.start_time}
						endTime={data.event.end_time}
					/>
					<EditEventLocationMenuListItem event={data} />
					<EditEventAboutMenuListItem event={data} />
					<EditEventTicketsUrlMenuListItem event={data} />
				</View>
				<Separator size='thick' />
				<EditEventMediaSection event={data} />
			</ScrollView>
			<ShareEventPosterSheet event={data} sheetApi={shareExternalSheetApi} />
		</BasePage>
	);
};

export default DraftEventPage;
