import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { useNavigation } from '@hooks';
import { MenuListItem } from '@molecules';
import { NanoId } from '@types';
import React from 'react';

interface ActionEditPublishedEventProps {
	event_uid: NanoId;
}

const ActionEditPublishedEvent: React.FC<ActionEditPublishedEventProps> = ({
	event_uid
}) => {
	const { isEditable } = useArtistAppContext();
	const { editPublishedEventPage } = useNavigation();

	if (!isEditable) return null;

	return (
		<MenuListItem
			onPress={() => editPublishedEventPage(event_uid)}
			prefixIconProps={{
				name: 'settings',
				size: 'm'
			}}
			titleTextProps={{
				title: 'Edit Event',
				bottomSubtext: 'Make last minute changes to your event',
				titleVariant: 'paragraph',
				bottomSubtextColor: 'text.q'
			}}
		/>
	);
};

export default ActionEditPublishedEvent;
