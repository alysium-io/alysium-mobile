import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { View } from '@atomic';
import { FindOneArtistEventResponseDto } from '@flux/api/event/dto/artist-event-find-one.dto';
import { useLocation, useNavigation } from '@hooks';
import { MenuListItem } from '@molecules';
import React from 'react';
import usePermissionsToastError from './usePermissionsError';

interface LocationSectionProps {
	eventData: FindOneArtistEventResponseDto;
}

const LocationSection: React.FC<LocationSectionProps> = ({ eventData }) => {
	const { isEditable } = useArtistAppContext();
	const locationApi = useLocation(eventData.event.location);
	const { chooseEventLocationPage } = useNavigation();
	const { title, subtitle } = locationApi.getDisplayParts();
	const { permissionsError } = usePermissionsToastError();
	const onPress = isEditable
		? () => chooseEventLocationPage(eventData.event.event_uid)
		: permissionsError;

	return (
		<View>
			<MenuListItem
				onPress={onPress}
				prefixIconProps={{
					name: 'location',
					size: 'l'
				}}
				titleTextProps={{
					title: locationApi.hasLocation ? title : 'Where?',
					titleVariant: 'paragraph-medium',
					bottomSubtext: locationApi.hasLocation
						? subtitle
						: 'Select a location',
					bottomSubtextVariant: 'paragraph-small',
					bottomSubtextColor: 'text.q'
				}}
			/>
		</View>
	);
};

export default LocationSection;
