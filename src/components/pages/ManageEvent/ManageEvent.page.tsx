import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { Text, View } from '@atomic';
import { artistEventApiSlice } from '@flux/api/event';
import { EventStatus } from '@flux/api/event/types';
import { useComplexEventStatus, useSheet } from '@hooks';
import { useRoute } from '@react-navigation/native';
import { ManageEventPageRouteProp } from '@types';
import React, { useEffect, useState } from 'react';
import { Case, Default, Switch } from 'react-if';
import {
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withSequence,
	withTiming
} from 'react-native-reanimated';
import { Loading } from './Loading';
import { CanceledEventPage } from './perspectives/CanceledEvent';
import { DraftEventPage } from './perspectives/DraftEvent';
import { PublishedEventPage } from './perspectives/PublishedEvent';
import NewEventCelebrationSheet from './perspectives/PublishedEvent/sheets/NewEventCelebrationSheet';

const ManageEventPage = () => {
	const route = useRoute<ManageEventPageRouteProp>();
	const newEventCelebrationSheetApi = useSheet();
	const { artistData } = useArtistAppContext();
	const visibility = useSharedValue(1);
	const [page, setPage] = useState<EventStatus | null>(null);
	const { data } = artistEventApiSlice.usePrivateFindOneArtistEventQuery({
		params: {
			artist_uid: artistData.artist_uid,
			event_uid: route.params.event_uid
		}
	});
	const { complexStatus } = useComplexEventStatus(data?.event);

	useEffect(() => {
		// Initial page load
		if (page === null && data?.event.status) {
			setPage(data.event.status);
		}
	}, [data?.event.status]);

	const setDraftToPublished = () => {
		// We separate this into its own function to avoid the following warning:
		// [Reanimated] Tried to modify key `current` of an object which has been already passed to a worklet. See
		// https://docs.swmansion.com/react-native-reanimated/docs/guides/troubleshooting#tried-to-modify-key-of-an-object-which-has-been-converted-to-a-shareable
		const showSheet = () => {
			newEventCelebrationSheetApi.open();
		};

		visibility.value = withSequence(
			// Fade out
			withTiming(0, { duration: 400 }),
			// Small delay at opacity 0 by using a 0-duration animation
			withTiming(0, { duration: 0 }, () => {
				// Change page when we're fully invisible and after delay
				runOnJS(setPage)(EventStatus.published);
			}),
			// Fade back in
			withDelay(
				250,
				withTiming(1, { duration: 400 }, (finished) => {
					if (finished) {
						runOnJS(showSheet)();
					}
				})
			)
		);
	};

	const animatedContainerProps = useAnimatedStyle(() => {
		return {
			opacity: visibility.value
		};
	}, []);

	return (
		<View
			flex={1}
			backgroundColor='transparent'
			animated
			style={animatedContainerProps}
		>
			<Switch>
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
					<PublishedEventPage event_uid={route.params.event_uid} />
				</Case>
				<Case condition={page === EventStatus.canceled}>
					<CanceledEventPage event_uid={route.params.event_uid} />
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
		</View>
	);
};

export default ManageEventPage;
