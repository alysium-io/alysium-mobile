import { ScrollView, View } from '@atomic';
import { useSearchNearbyEvents } from '@hooks';
import { BasePage } from '@organisms';
import React from 'react';
import { Case, Switch } from 'react-if';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FeedListItem from './components/FeedListItem';
import NoEventsFound from './components/NoEventsFound';
import ViewMapButton from './components/ViewMapButton';
import LoadingFeed from './Loading';

const HomePage = () => {
	const { data, isSuccess, isLoading } = useSearchNearbyEvents();
	const insets = useSafeAreaInsets();

	return (
		<BasePage>
			<View style={{ flex: 1, marginTop: insets.top }}>
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
			</View>
		</BasePage>
	);
};

export default HomePage;
