import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { RefreshControl, ScrollView, Text } from '@atomic';
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
import EmptyState from './EmptyState';
import LoadingView from './LoadingView';

interface ArchiveViewProps {}

const ArchiveView: React.FC<ArchiveViewProps> = () => {
	const { artistData } = useArtistAppContext();
	const { page, defaultLimit } = usePagination();
	const { data, isLoading, refetch, error } =
		artistEventApiSlice.useArchiveQuery({
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

	if (error) {
		return <PageError error={error} />;
	}

	if (isLoading) {
		return <LoadingView />;
	}

	if (!data?.length) {
		return (
			<EmptyState
				title={
					<Text variant='paragraph-medium' color='text.q' textAlign='center'>
						When you complete an{' '}
						<Text variant='paragraph-medium' color='text.s'>
							event
						</Text>
						{'\n'}
						it will appear here
					</Text>
				}
				refetch={refetch}
			/>
		);
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

export default ArchiveView;
