import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { RefreshControl, ScrollView } from '@atomic';
import { artistEventApiSlice } from '@flux/api/event';
import {
	useEventDateFormatter,
	useNavigation,
	usePagination,
	useRefresh
} from '@hooks';
import { EventContentListItem } from '@molecules';
import { PageError } from '@templates';
import { orderBy } from 'lodash';
import React from 'react';
import EndedEmptyState from './EndedEmptyState';
import LoadingView from './LoadingView';

interface EndedViewProps {}

const EndedView: React.FC<EndedViewProps> = () => {
	const { artistData } = useArtistAppContext();
	const { page, defaultLimit } = usePagination();
	const { data, isLoading, refetch, error } = artistEventApiSlice.useEndedQuery(
		{
			params: {
				artist_uid: artistData.artist_uid
			},
			query: {
				page,
				limit: defaultLimit
			}
		}
	);
	const refreshControl = useRefresh(refetch);
	const { manageEventPage } = useNavigation();
	const sortedEvents = orderBy(data, ['event.start_time'], ['desc']);

	if (error) {
		return <PageError error={error} />;
	}

	if (isLoading) {
		return <LoadingView />;
	}

	if (!data?.length) {
		return <EndedEmptyState />;
	}

	return (
		<ScrollView refreshControl={<RefreshControl {...refreshControl} />}>
			{sortedEvents?.map((event) => {
				const dateFormatter = useEventDateFormatter(
					event.event.start_time,
					event.event.end_time
				);
				return (
					<EventContentListItem
						key={event.event.event_uid}
						onPress={() => manageEventPage(event.event.event_uid)}
						titleTextProps={{
							title: event.event.name,
							bottomSubtext: dateFormatter.timeAgoConcise() || ''
						}}
						profileImageProps={{
							image: event.event.profile_image?.small.key
						}}
					/>
				);
			})}
		</ScrollView>
	);
};

export default EndedView;
