import {
	ArtistEventsInteractiveMapPage,
	ArtistPage,
	ChooseEventLocationPage,
	EditArtistEventAboutPage,
	EditArtistEventTicketsUrlPage,
	EditPublishedEventPage,
	EventManager,
	EventPage,
	ManageEventPage,
	ScenePage,
	ViewGalleryPage
} from '@pages';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EventManagerStackNavigatorParamList } from '@types';
import React from 'react';
import { useTabSettings } from './useTabSettings';

export const EventManagerStack =
	createNativeStackNavigator<EventManagerStackNavigatorParamList>();

const EventManagerTab = () => {
	const { screenOptions } = useTabSettings();

	return (
		<EventManagerStack.Navigator screenOptions={screenOptions}>
			<EventManagerStack.Screen
				name='EventManagerPage'
				component={EventManager}
			/>

			<EventManagerStack.Screen
				name='ManageEventPage'
				component={ManageEventPage}
			/>

			<EventManagerStack.Screen
				name='ChooseEventLocationPage'
				component={ChooseEventLocationPage}
			/>

			<EventManagerStack.Screen
				name='EditArtistEventAboutPage'
				component={EditArtistEventAboutPage}
			/>

			<EventManagerStack.Screen name='EventPage' component={EventPage} />

			<EventManagerStack.Screen
				name='EditPublishedEventPage'
				component={EditPublishedEventPage}
			/>

			<EventManagerStack.Screen
				name='ViewGalleryPage'
				component={ViewGalleryPage}
				options={{
					presentation: 'transparentModal',
					animation: 'fade'
				}}
			/>

			<EventManagerStack.Screen name='ArtistPage' component={ArtistPage} />
			<EventManagerStack.Screen
				name='ArtistEventsInteractiveMapPage'
				component={ArtistEventsInteractiveMapPage}
			/>

			<EventManagerStack.Screen
				name='EditArtistEventTicketsUrlPage'
				component={EditArtistEventTicketsUrlPage}
			/>

			<EventManagerStack.Screen name='ScenePage' component={ScenePage} />
		</EventManagerStack.Navigator>
	);
};

export default EventManagerTab;
