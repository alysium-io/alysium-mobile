import { Section, View } from '@atomic';
import { SectionHeader } from '@molecules';
import { BasePage } from '@organisms';
import { useRoute } from '@react-navigation/native';
import { ParallaxPageOutline } from '@templates';
import { EventPageRouteProp } from '@types';
import React from 'react';
import ArtistLineup from './components/ArtistLineup';
import SubHeader from './components/SubHeader';
import useEventPage from './useEventPage';

const EventPage = () => {
	const route = useRoute<EventPageRouteProp>();
	const { eventData } = useEventPage(route.params.eventId);

	if (!eventData) {
		return null;
	}

	return (
		<BasePage>
			<ParallaxPageOutline
				title={eventData.name || ''}
				image={eventData.profile_image?.url || ''}
				textAlignment='center'
			>
				<SubHeader eventData={eventData} />
				<Section marginTop='l'>
					<View marginHorizontal='m'>
						<SectionHeader text='Lineup' />
					</View>
					<ArtistLineup />
				</Section>
			</ParallaxPageOutline>
		</BasePage>
	);
};

export default EventPage;
