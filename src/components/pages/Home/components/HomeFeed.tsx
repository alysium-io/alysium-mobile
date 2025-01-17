import { ScrollView } from '@atomic';
import { useSearchNearbyEvents } from '@hooks';
import React from 'react';
import { Case, Switch } from 'react-if';
import LoadingFeed from '../Loading';
import FeedListItem from './FeedListItem';
import NoEventsFound from './NoEventsFound';
import ViewMapButton from './ViewMapButton';

const HomeFeed = () => {
	const { data, isSuccess, isLoading } = useSearchNearbyEvents();
	return (
		<Switch>
			<Case condition={isLoading}>
				<LoadingFeed />
			</Case>
			<Case condition={isSuccess && !data?.length}>
				<NoEventsFound />
			</Case>
			<Case condition={isSuccess}>
				<ScrollView>
					{data?.map((event) => (
						<FeedListItem {...event} key={event.event.event_uid} />
					))}
				</ScrollView>
				<ViewMapButton />
			</Case>
		</Switch>
	);
};

export default HomeFeed;
