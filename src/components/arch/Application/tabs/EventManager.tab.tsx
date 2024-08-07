import {
	ArtistPage,
	ArtistPageHeader,
	EditContractPage,
	EditContractPageHeader,
	EditEventPage,
	EditEventPageHeader,
	EditEventTicketTypesPage,
	EditEventTicketTypesPageHeader,
	EditTicketTypePage,
	EditTicketTypePageHeader,
	EditVenuePage,
	EditVenuePageHeader,
	EventCandidatesPage,
	EventCandidatesPageHeader,
	EventManagerPage,
	EventManagerPageHeader,
	EventPage,
	EventPageHeader
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
				options={{ header: EventManagerPageHeader }}
			/>
			<EventManagerStack.Screen
				name='EditEventPage'
				component={EditEventPage}
				options={{ header: EditEventPageHeader }}
			/>

			<EventManagerStack.Screen
				name='EventPage'
				component={EventPage}
				options={{ header: EventPageHeader }}
			/>

			<EventManagerStack.Screen
				name='EditVenuePage'
				component={EditVenuePage}
				options={{ header: EditVenuePageHeader }}
			/>

			<EventManagerStack.Screen
				name='EventCandidatesPage'
				component={EventCandidatesPage}
				options={{ header: EventCandidatesPageHeader }}
			/>

			<EventManagerStack.Screen
				name='EditEventTicketTypesPage'
				component={EditEventTicketTypesPage}
				options={{ header: EditEventTicketTypesPageHeader }}
			/>

			<EventManagerStack.Screen
				name='EditTicketTypePage'
				component={EditTicketTypePage}
				options={{ header: EditTicketTypePageHeader }}
			/>

			<EventManagerStack.Screen
				name='EditContractPage'
				component={EditContractPage}
				options={{ header: EditContractPageHeader }}
			/>

			<EventManagerStack.Screen
				name='ArtistPage'
				component={ArtistPage}
				options={{ header: ArtistPageHeader }}
			/>
		</EventManagerStack.Navigator>
	);
};

export default EventManagerTab;
