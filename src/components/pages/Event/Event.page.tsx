import { View } from '@atomic';
import { eventApiSlice } from '@flux/api/event';
import { ActionButtons } from '@molecules';
import { BasePage, Parallax } from '@organisms';
import { useRoute } from '@react-navigation/native';
import { PageError, ParallaxLoading } from '@templates';
import { EventPageRouteProp } from '@types';
import React, { useCallback } from 'react';
import { Linking } from 'react-native';
import GallerySection from './components/GallerySection';
import LocationSection from './components/LocationSection';
import OrganizerSection from './components/OrganizerSection';
import SubHeader from './components/SubHeader';
import EventPageHeader from './Event.header';

const ArtistEvent = () => {
	const { params } = useRoute<EventPageRouteProp>();
	const { data: eventData, error } = eventApiSlice.useFindOneEventQuery({
		params: {
			event_uid: params.event_uid
		}
	});

	const FooterComponent = useCallback(() => {
		if (!eventData?.event.tickets_url?.length) return undefined;
		return (
			<View flex={1} margin='m'>
				<ActionButtons
					buttonProps={{
						text: 'Get Tickets',
						onPress: () =>
							eventData?.event.tickets_url &&
							Linking.openURL(eventData.event.tickets_url),
						color: 'p'
					}}
				/>
			</View>
		);
	}, [eventData]);

	if (error) {
		return <PageError error={error} />;
	}

	if (!eventData) {
		return <ParallaxLoading />;
	}

	return (
		<BasePage FooterComponent={FooterComponent}>
			<EventPageHeader event={eventData} />
			<Parallax
				title={eventData.event.name}
				image={eventData.event.profile_image?.large.key}
				titleTextProps={{
					textAlign: 'center'
				}}
			>
				<View margin='m'>
					<SubHeader eventData={eventData} />
				</View>
				<OrganizerSection eventData={eventData} />
				<LocationSection eventData={eventData} />
				<GallerySection eventData={eventData} />
			</Parallax>
		</BasePage>
	);
};

export default ArtistEvent;
