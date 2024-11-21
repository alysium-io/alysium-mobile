import { View } from '@atomic';
import { eventApiSlice } from '@flux/api/event';
import { BasePage } from '@organisms';
import { useRoute } from '@react-navigation/native';
import ParallaxScroll from '@src/components/organisms/Parallax/ParallaxScroll';
import { ArtistEventPageRouteProp } from '@types';
import React from 'react';
import ArtistEventPageHeader from './ArtistEvent.header';
import GallerySection from './components/GallerySection';
import LocationSection from './components/LocationSection';
import OrganizerSection from './components/OrganizerSection';
import SubHeader from './components/SubHeader';

const ArtistEvent = () => {
	const { params } = useRoute<ArtistEventPageRouteProp>();
	const { data: eventData } = eventApiSlice.useFindOneEventQuery({
		params: {
			event_uid: params.event_uid
		}
	});

	if (!eventData) {
		return null;
	}

	return (
		<BasePage>
			<ArtistEventPageHeader title={eventData.event.name} />
			<ParallaxScroll
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
			</ParallaxScroll>
		</BasePage>
	);
};

export default ArtistEvent;
