import { View } from '@atomic';
import { eventApiSlice } from '@flux/api/event';
import { BasePage, Parallax } from '@organisms';
import { useRoute } from '@react-navigation/native';
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
			<Parallax
				bannerTitleProps={{
					title: eventData.event.name,
					titleAlign: 'center'
				}}
				bannerImageProps={{
					image: eventData.event.profile_image?.large.key
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
