import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { EventLink } from '@flux/api/event-link/event-link.entity';
import { useNavigation } from '@hooks';
import { MenuListItem } from '@molecules';
import React from 'react';
import usePermissionsToastError from '../hooks/usePermissionsError';

interface EditEventAboutMenuListItemProps {
	event: EventLink;
}

const EditEventAboutMenuListItem: React.FC<EditEventAboutMenuListItemProps> = ({
	event
}) => {
	const { editArtistEventAboutPage } = useNavigation();
	const { isEditable } = useArtistAppContext();
	const { permissionsError } = usePermissionsToastError();
	const onPress = isEditable
		? () => editArtistEventAboutPage(event.event.event_uid)
		: permissionsError;
	return (
		<MenuListItem
			onPress={onPress}
			prefixIconProps={{
				name: 'question',
				size: 'l'
			}}
			titleTextProps={{
				title: event.event.about?.length ? event.event.about : 'What?',
				titleVariant: event.event.about?.length
					? 'paragraph'
					: 'paragraph-medium',
				bottomSubtext: event.event.about?.length
					? 'About your event'
					: 'Tell us about your event',
				bottomSubtextVariant: 'paragraph-small',
				bottomSubtextColor: 'text.q',
				titleProps: {
					numberOfLines: event.event.about?.length ? 0 : 1
				}
			}}
		/>
	);
};

export default EditEventAboutMenuListItem;
