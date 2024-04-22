import { HeaderSafeArea, ScrollView, Text, View } from '@atomic';
import { BasePage } from '@organisms';
import React from 'react';
import { EventManagerPageProvider } from './EventManager.context';
import { CreateEventFooter, EventsListSection } from './components';

const EventManagerPage = () => {
	return (
		<BasePage FooterComponent={CreateEventFooter}>
			<HeaderSafeArea>
				<ScrollView alwaysBounceVertical>
					<View margin='m'>
						<Text variant='page-header'>Event Manager</Text>
					</View>
					<EventsListSection />
				</ScrollView>
			</HeaderSafeArea>
		</BasePage>
	);
};

export default () => (
	<EventManagerPageProvider>
		<EventManagerPage />
	</EventManagerPageProvider>
);
