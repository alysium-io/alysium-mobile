import {
	ArtistPage,
	EditContractPage,
	EditEventPage,
	EditEventTicketTypesPage,
	EditTicketTypePage,
	EditVenuePage,
	EventCandidatesPage,
	EventManagerPage,
	EventPage
} from '@pages';
import { createStackNavigator } from '@react-navigation/stack';
import { EventManagerStackNavigatorParamList } from '@types';
import React from 'react';
import { useTabSettings } from './settings';

export const EventManagerStack =
	createStackNavigator<EventManagerStackNavigatorParamList>();

const EventManagerTab = () => {
	const { screenOptions } = useTabSettings();

	return (
		<EventManagerStack.Navigator screenOptions={screenOptions}>
			<EventManagerStack.Screen
				name='EventManagerPage'
				component={EventManagerPage}
			/>
			<EventManagerStack.Screen
				name='EditEventPage'
				component={EditEventPage}
			/>

			<EventManagerStack.Screen name='EventPage' component={EventPage} />

			<EventManagerStack.Screen
				name='EditVenuePage'
				component={EditVenuePage}
			/>

			<EventManagerStack.Screen
				name='EventCandidatesPage'
				component={EventCandidatesPage}
			/>

			<EventManagerStack.Screen
				name='EditEventTicketTypesPage'
				component={EditEventTicketTypesPage}
			/>

			<EventManagerStack.Screen
				name='EditTicketTypePage'
				component={EditTicketTypePage}
			/>

			<EventManagerStack.Screen
				name='EditContractPage'
				component={EditContractPage}
			/>

			<EventManagerStack.Screen name='ArtistPage' component={ArtistPage} />
		</EventManagerStack.Navigator>
	);
};

export default EventManagerTab;
