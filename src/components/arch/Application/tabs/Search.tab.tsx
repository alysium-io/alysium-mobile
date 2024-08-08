import {
	ArtistPage,
	HostPage,
	LocationPage,
	SearchPage,
	TagPage,
	UserArtistsFollowingPage,
	UserTagsFollowingPage
} from '@pages';
import { createStackNavigator } from '@react-navigation/stack';
import { SearchStackNavigatorParamList } from '@types';
import React from 'react';
import { useTabSettings } from './settings';

export const SearchStack =
	createStackNavigator<SearchStackNavigatorParamList>();

const SearchTab = () => {
	const { screenOptions } = useTabSettings();

	return (
		<SearchStack.Navigator screenOptions={screenOptions}>
			<SearchStack.Screen name='SearchPage' component={SearchPage} />

			<SearchStack.Screen name='HostPage' component={HostPage} />

			<SearchStack.Screen name='ArtistPage' component={ArtistPage} />

			<SearchStack.Screen name='TagPage' component={TagPage} />

			<SearchStack.Screen name='LocationPage' component={LocationPage} />

			<SearchStack.Screen
				name='UserArtistsFollowingPage'
				component={UserArtistsFollowingPage}
			/>

			<SearchStack.Screen
				name='UserTagsFollowingPage'
				component={UserTagsFollowingPage}
			/>
		</SearchStack.Navigator>
	);
};

export default SearchTab;
