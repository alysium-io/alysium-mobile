import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { EventLink } from '@flux/api/event-link/event-link.entity';
import { useLocation, useNavigation } from '@hooks';
import { MenuListItem } from '@molecules';
import React from 'react';
import usePermissionsToastError from '../hooks/usePermissionsError';

interface EditEventLocationMenuListItemProps {
	event: EventLink;
}

const EditEventLocationMenuListItem: React.FC<
	EditEventLocationMenuListItemProps
> = ({ event }) => {
	const { isEditable } = useArtistAppContext();
	const locationApi = useLocation(event.event.location);
	const { chooseEventLocationPage } = useNavigation();
	const { title, subtitle } = locationApi.getDisplayParts();
	const { permissionsError } = usePermissionsToastError();
	const onPress = isEditable
		? () => chooseEventLocationPage(event.event.event_uid)
		: permissionsError;

	return (
		<MenuListItem
			onPress={onPress}
			prefixIconProps={{
				name: 'location',
				size: 'l'
			}}
			titleTextProps={{
				title: locationApi.hasLocation ? title : 'Where?',
				titleVariant: 'paragraph-medium',
				bottomSubtext: locationApi.hasLocation ? subtitle : 'Select a location',
				bottomSubtextVariant: 'paragraph-small',
				bottomSubtextColor: 'text.q'
			}}
		/>
	);
};

export default EditEventLocationMenuListItem;
