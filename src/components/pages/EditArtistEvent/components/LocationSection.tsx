import { Section, Text } from '@atomic';
import { FindOneArtistEventResponseDto } from '@flux/api/event/dto/artist-event-find-one.dto';
import { useLocation, useNavigation } from '@hooks';
import { Location, MenuListItem } from '@molecules';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Separator from '../../EditArtist/components/Separator';

interface LocationSectionProps {
	eventData: FindOneArtistEventResponseDto;
}

const LocationSection: React.FC<LocationSectionProps> = ({ eventData }) => {
	const locationApi = useLocation(eventData.event.location);
	const { chooseEventLocationPage } = useNavigation();

	const title = locationApi.build([
		{ type: 'street_number' },
		{ type: 'route' }
	]);

	const subtitle = locationApi.build([
		{ type: 'locality' },
		{ type: 'administrative_area_level_1', nameLength: 'short_name' },
		{ type: 'postal_code' }
	]);

	const onPressLocation = () => {
		if (eventData?.event.location) {
			locationApi.openMap(eventData.event.name);
		} else {
			chooseEventLocationPage(eventData.event.event_uid);
		}
	};

	if (!locationApi.hasLocation) {
		return null;
	}

	return (
		<Section>
			<Text variant='section-header-2' marginHorizontal='m'>
				Location
			</Text>
			<MenuListItem
				onPress={() => chooseEventLocationPage(eventData.event.event_uid)}
				titleTextProps={{
					title: locationApi.hasLocation ? title : 'Select a Location',
					titleVariant: 'paragraph-medium',
					bottomSubtext: locationApi.hasLocation
						? subtitle
						: 'Where is your event?',
					bottomSubtextVariant: 'paragraph-small',
					bottomSubtextColor: 'text.q'
				}}
			/>
			<TouchableOpacity onPress={onPressLocation} activeOpacity={0.9}>
				<Location
					markers={{
						location: eventData.event.location,
						label: eventData.event.name
					}}
					containerProps={{
						height: 300,
						margin: 'm',
						style: { borderRadius: 25 }
					}}
				/>
			</TouchableOpacity>
			<Separator marginTop='m' />
		</Section>
	);
};

export default LocationSection;
