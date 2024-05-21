import { HeaderSafeArea, ScrollView, Text, View } from '@atomic';
import { BasePage } from '@organisms';
import React, { useCallback } from 'react';
import CreateEventFooter from './components/CreateEventFooter';
import EventsListSection from './components/EventsListSection';
import useEventManager from './useEventManager';

const EventManagerPage = () => {
	const { eventsData, createEventStartSheetApi } = useEventManager();

	const FooterComponent = useCallback(
		() => (
			<CreateEventFooter createEventStartSheetApi={createEventStartSheetApi} />
		),
		[]
	);

	if (!eventsData) {
		return null;
	}

	return (
		<BasePage FooterComponent={FooterComponent}>
			<HeaderSafeArea>
				<ScrollView alwaysBounceVertical>
					<View margin='m'>
						<Text variant='page-header'>Event Manager</Text>
					</View>
					<EventsListSection eventsData={eventsData} />
				</ScrollView>
			</HeaderSafeArea>
		</BasePage>
	);
};

export default EventManagerPage;
