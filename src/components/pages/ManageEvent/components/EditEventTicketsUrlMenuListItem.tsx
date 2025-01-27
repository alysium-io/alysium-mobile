import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { EventLink } from '@flux/api/event-link/event-link.entity';
import { useNavigation } from '@hooks';
import { MenuListItem } from '@molecules';
import React from 'react';
import usePermissionsToastError from '../hooks/usePermissionsError';

interface EditEventTicketsUrlMenuListItemProps {
	event: EventLink;
}

const EditEventTicketsUrlMenuListItem: React.FC<
	EditEventTicketsUrlMenuListItemProps
> = ({ event }) => {
	const { isEditable } = useArtistAppContext();
	const { editArtistEventTicketsUrlPage } = useNavigation();
	const { permissionsError } = usePermissionsToastError();
	const onPress = isEditable
		? () => editArtistEventTicketsUrlPage(event.event.event_uid)
		: permissionsError;
	return (
		<MenuListItem
			onPress={onPress}
			prefixIconProps={{
				name: 'ticket',
				size: 'l'
			}}
			titleTextProps={{
				title: event.event.tickets_url?.length
					? event.event.tickets_url
					: 'Tickets',
				titleVariant: event.event.tickets_url?.length
					? 'paragraph'
					: 'paragraph-medium',
				bottomSubtext: 'Where can fans buy tickets?',
				bottomSubtextVariant: 'paragraph-small',
				bottomSubtextColor: 'text.q',
				titleProps: {
					numberOfLines: event.event.tickets_url?.length ? 0 : 1
				}
			}}
		/>
	);
};

export default EditEventTicketsUrlMenuListItem;
