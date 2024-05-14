import { Section, View } from '@atomic';
import { withProvider } from '@hooks';
import { SectionHeader } from '@molecules';
import { BasePage } from '@organisms';
import { ParallaxPageOutline } from '@templates';
import React from 'react';
import { EventPageProvider, useEventPageContext } from './Event.context';
import { ArtistLineup, SubHeader } from './components';

const EventPage = () => {
	const { eventData } = useEventPageContext();

	return (
		<BasePage>
			<ParallaxPageOutline
				title={eventData.name || ''}
				image={eventData.profile_image?.url || ''}
				textAlignment='center'
			>
				<SubHeader />
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

export default withProvider(EventPage, EventPageProvider);
