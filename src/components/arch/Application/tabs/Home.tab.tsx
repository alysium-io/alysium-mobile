import {
	ArtistPage,
	EventPage,
	HomePage,
	ScenePage,
	ViewGalleryPage
} from '@pages';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeStackNavigatorParamList } from '@types';
import React from 'react';
import { useTabSettings } from './useTabSettings';

export const HomeStack =
	createNativeStackNavigator<HomeStackNavigatorParamList>();

const HomeTab = () => {
	const { screenOptions } = useTabSettings();

	return (
		<HomeStack.Navigator screenOptions={screenOptions}>
			<HomeStack.Screen name='HomePage' component={HomePage} />
			<HomeStack.Screen name='ArtistPage' component={ArtistPage} />
			<HomeStack.Screen name='ScenePage' component={ScenePage} />
			<HomeStack.Screen name='EventPage' component={EventPage} />
			<HomeStack.Screen
				name='ViewGalleryPage'
				component={ViewGalleryPage}
				options={{
					presentation: 'transparentModal',
					animation: 'fade'
				}}
			/>
		</HomeStack.Navigator>
	);
};

export default HomeTab;
