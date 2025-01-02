import { ScrollView } from '@atomic';
import { useSearchNearbyEvents } from '@hooks';
import { BasePage } from '@organisms';
import React from 'react';
import FeedListItem from './components/FeedListItem';
import ViewMapButton from './components/ViewMapButton';
import HomePageHeader from './Home.header';

const HomePage = () => {
	const { data } = useSearchNearbyEvents();

	return (
		<BasePage>
			<HomePageHeader />
			<ScrollView>
				{data?.map((event) => (
					<FeedListItem {...event} key={event.event.event_uid} />
				))}
			</ScrollView>
			<ViewMapButton />
		</BasePage>
	);
};

export default HomePage;
