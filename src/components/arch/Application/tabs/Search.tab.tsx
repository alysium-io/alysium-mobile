import {
	ArtistEventPage,
	ArtistEventsPage,
	ArtistPage,
	ScenePage,
	SearchPage,
	TagPage,
	TopTagsPage,
	UserArtistsFollowingPage,
	UserTagsFollowingPage,
	ViewGalleryPage
} from '@pages';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SearchStackNavigatorParamList } from '@types';
import React from 'react';
import { useTabSettings } from './settings';

export const SearchStack =
	createNativeStackNavigator<SearchStackNavigatorParamList>();

const SearchTab = () => {
	const { screenOptions } = useTabSettings();

	return (
		<SearchStack.Navigator screenOptions={screenOptions}>
			<SearchStack.Screen name='SearchPage' component={SearchPage} />

			<SearchStack.Screen name='ArtistPage' component={ArtistPage} />

			<SearchStack.Screen name='TagPage' component={TagPage} />

			<SearchStack.Screen
				name='UserArtistsFollowingPage'
				component={UserArtistsFollowingPage}
			/>

			<SearchStack.Screen
				name='UserTagsFollowingPage'
				component={UserTagsFollowingPage}
			/>

			<SearchStack.Screen name='TopTagsPage' component={TopTagsPage} />

			<SearchStack.Screen
				name='ViewGalleryPage'
				component={ViewGalleryPage}
				options={{
					presentation: 'transparentModal',
					animation: 'fade'
				}}
			/>

			<SearchStack.Screen name='ArtistEventPage' component={ArtistEventPage} />
			<SearchStack.Screen
				name='ArtistEventsPage'
				component={ArtistEventsPage}
			/>

			<SearchStack.Screen name='ScenePage' component={ScenePage} />
		</SearchStack.Navigator>
	);
};

export default SearchTab;
