import { ScrollView } from '@atomic';
import { useSearchNearbyEvents } from '@hooks';
import { BasePage } from '@organisms';
import React from 'react';
import { Case, Switch } from 'react-if';
import FeedListItem from './components/FeedListItem';
import NoEventsFound from './components/NoEventsFound';
import ViewMapButton from './components/ViewMapButton';
import HomePageHeader from './Home.header';
import LoadingFeed from './Loading';

const HomePage = () => {
	const { data, isSuccess, isLoading } = useSearchNearbyEvents();

	return (
		<BasePage>
			<HomePageHeader />
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
		</BasePage>
	);
};

export default HomePage;
