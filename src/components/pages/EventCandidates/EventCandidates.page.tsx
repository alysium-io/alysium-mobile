import { HeaderSafeArea, ScrollView, View } from '@atomic';
import { BasePage } from '@organisms';
import React from 'react';
import { EventCandidatesPageProvider } from './EventCandidates.context';
import TogglerBodySection from './components/TogglerBodySection';
import TogglerSection from './components/TogglerSection';

const EventCandidatesPage = () => {
	return (
		<BasePage>
			<HeaderSafeArea>
				<ScrollView alwaysBounceVertical>
					<View marginTop='l'>
						<TogglerSection />
						<TogglerBodySection />
					</View>
				</ScrollView>
			</HeaderSafeArea>
		</BasePage>
	);
};

export default () => (
	<EventCandidatesPageProvider>
		<EventCandidatesPage />
	</EventCandidatesPageProvider>
);
