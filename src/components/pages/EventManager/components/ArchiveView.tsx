import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { RefreshControl, ScrollView } from '@atomic';
import { artistEventApiSlice } from '@flux/api/event';
import {
	useEventDateFormatter,
	useNavigation,
	usePagination,
	useRefresh
} from '@hooks';
import { ContentListItem } from '@molecules';
import { orderBy } from 'lodash';
import React from 'react';
import ArchiveEmptyState from './ArchiveEmptyState';
import LoadingView from './LoadingView';

interface ArchiveViewProps {}

const ArchiveView: React.FC<ArchiveViewProps> = () => {
	const { artistData } = useArtistAppContext();
	const { page, defaultLimit } = usePagination();
	const { data, isLoading, refetch } = artistEventApiSlice.useArchiveQuery({
		params: {
			artist_uid: artistData.artist_uid
		},
		query: {
			page,
			limit: defaultLimit
		}
	});
	const refreshControl = useRefresh(refetch);
	const { manageEventPage } = useNavigation();
	const sortedEvents = orderBy(data, ['event.start_time'], ['desc']);

	if (isLoading) {
		return <LoadingView />;
	}

	if (!data?.length) {
		return <ArchiveEmptyState />;
	}

	return (
		<ScrollView refreshControl={<RefreshControl {...refreshControl} />}>
			{sortedEvents?.map((event) => {
				const dateFormatter = useEventDateFormatter(
					event.event.start_time,
					event.event.end_time
				);
				return (
					<ContentListItem
						key={event.event.event_uid}
						onPress={() => manageEventPage(event.event.event_uid)}
						titleTextProps={{
							title: event.event.name,
							bottomSubtext: dateFormatter.timeAgoConcise() || ''
						}}
						profileImageProps={{
							image: event.event.profile_image?.small.key,
							borderRadius: 'l',
							defaultImageProps: {
								icon: 'event'
							}
						}}
					/>
				);
			})}
		</ScrollView>
	);
};

export default ArchiveView;
