import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { AView, Text, View } from '@atomic';
import { artistEventApiSlice } from '@flux/api/event';
import { EventStatus } from '@flux/api/event/types';
import { useEnteringExitingPageAnimations, useEvent, useSheet } from '@hooks';
import { useRoute } from '@react-navigation/native';
import { PageError } from '@templates';
import { ManageEventPageRouteProp } from '@types';
import React, { useEffect, useState } from 'react';
import { Case, Default, Switch } from 'react-if';
import Loading from './Loading';
import CanceledEventPage from './perspectives/CanceledEvent/CanceledEvent.page';
import CompletedEventPage from './perspectives/CompletedEvent/CompletedEvent.page';
import DraftEventPage from './perspectives/DraftEvent/DraftEvent.page';
import PublishedEventPage from './perspectives/PublishedEvent/PublishedEvent.page';
import NewEventCelebrationSheet from './perspectives/PublishedEvent/sheets/NewEventCelebrationSheet';

const ManageEventPage = () => {
	const route = useRoute<ManageEventPageRouteProp>();
	const newEventCelebrationSheetApi = useSheet();
	const { artistData } = useArtistAppContext();
	const { onLoad, isLoaded, ...enteringExitingProps } =
		useEnteringExitingPageAnimations();
	const [page, setPage] = useState<EventStatus | null>(null);
	const { data, error, isSuccess } =
		artistEventApiSlice.usePrivateFindOneArtistEventQuery({
			params: {
				artist_uid: artistData.artist_uid,
				event_uid: route.params.event_uid
			}
		});
	const { status, complexStatus, isInPast } = useEvent(data?.event);

	useEffect(() => {
		// Initial page load
		if (page === null && status) {
			setPage(status);
		}
	}, [isSuccess]);

	useEffect(() => {
		if (page && !isLoaded) {
			onLoad();
		}
	}, [page]);

	const setDraftToPublished = () => {
		setPage(EventStatus.published);
		if (!isInPast) {
			setTimeout(() => {
				newEventCelebrationSheetApi.open();
			}, 1000);
		}
	};

	const setPublishedToCompleted = () => {
		setPage(EventStatus.completed);
	};

	return (
		<AView
			key={`page-${page}`}
			{...enteringExitingProps}
			flex={1}
			backgroundColor='transparent'
		>
			<Switch>
				<Case condition={error !== undefined}>
					<PageError error={error} />
				</Case>
				<Case condition={!data || !page}>
					<Loading />
				</Case>
				<Case condition={page === EventStatus.draft}>
					<DraftEventPage
						setDraftToPublished={setDraftToPublished}
						event_uid={route.params.event_uid}
					/>
				</Case>
				<Case condition={page === EventStatus.published}>
					<PublishedEventPage
						event_uid={route.params.event_uid}
						setPublishedToCompleted={setPublishedToCompleted}
					/>
				</Case>
				<Case condition={page === EventStatus.canceled}>
					<CanceledEventPage event_uid={route.params.event_uid} />
				</Case>
				<Case condition={page === EventStatus.completed}>
					<CompletedEventPage event_uid={route.params.event_uid} />
				</Case>
				<Default>
					{/** TODO: Add error handling */}
					<View>
						<Text>Something bad probably happened</Text>
						<Text>Event id: {data?.event.event_uid}</Text>
						<Text>Event status: {data?.event.status}</Text>
						<Text>Event complex status: {complexStatus}</Text>
					</View>
				</Default>
			</Switch>
			<NewEventCelebrationSheet
				sheetApi={newEventCelebrationSheetApi}
				event_uid={route.params.event_uid}
			/>
		</AView>
	);
};

export default ManageEventPage;
