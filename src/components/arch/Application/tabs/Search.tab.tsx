import {
	ArtistEventsInteractiveMapPage,
	ArtistEventsPage,
	ArtistPage,
	EventPage,
	ScenePage,
	SearchPage,
	TagPage,
	TopTagsPage,
	UserArtistsFollowingPage,
	UserScenesFollowingPage,
	UserTagsFollowingPage,
	ViewEventMediaPage
} from '@pages';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SearchStackNavigatorParamList } from '@types';
import React from 'react';
import { useTabSettings } from './useTabSettings';

export const SearchStack =
	createNativeStackNavigator<SearchStackNavigatorParamList>();

const SearchTab = () => {
	const { screenOptions } = useTabSettings();

	return (
		<SearchStack.Navigator screenOptions={screenOptions}>
			<SearchStack.Screen name='SearchPage' component={SearchPage} />

			<SearchStack.Screen name='ArtistPage' component={ArtistPage} />
			<SearchStack.Screen
				name='ArtistEventsInteractiveMapPage'
				component={ArtistEventsInteractiveMapPage}
			/>

			<SearchStack.Screen name='TagPage' component={TagPage} />

			<SearchStack.Screen
				name='UserArtistsFollowingPage'
				component={UserArtistsFollowingPage}
			/>

			<SearchStack.Screen
				name='UserScenesFollowingPage'
				component={UserScenesFollowingPage}
			/>

			<SearchStack.Screen
				name='UserTagsFollowingPage'
				component={UserTagsFollowingPage}
			/>

			<SearchStack.Screen name='TopTagsPage' component={TopTagsPage} />

			<SearchStack.Screen
				name='ViewEventMediaPage'
				component={ViewEventMediaPage}
			/>

			<SearchStack.Screen name='EventPage' component={EventPage} />
			<SearchStack.Screen
				name='ArtistEventsPage'
				component={ArtistEventsPage}
			/>

			<SearchStack.Screen name='ScenePage' component={ScenePage} />
		</SearchStack.Navigator>
	);
};

export default SearchTab;
