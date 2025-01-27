import { useClipboard, useHyperlink } from '@hooks';
import { MenuListItem } from '@molecules';
import { NanoId } from '@types';
import React from 'react';

interface ActionCopyEventLinkProps {
	event_uid: NanoId;
}

const ActionCopyEventLink: React.FC<ActionCopyEventLinkProps> = ({
	event_uid
}) => {
	const { copy } = useClipboard();
	const { eventPageHyperlink } = useHyperlink();

	const onCopyEventLink = () => {
		copy(eventPageHyperlink(event_uid), {
			text2: 'You can now share this event'
		});
	};

	return (
		<MenuListItem
			onPress={onCopyEventLink}
			prefixIconProps={{
				name: 'link',
				size: 'm'
			}}
			icon='event'
			iconProps={{ size: 'm' }}
			titleTextProps={{
				title: 'Copy Event Link',
				bottomSubtext: 'Copy shareable link to your event',
				titleVariant: 'paragraph',
				bottomSubtextColor: 'text.q'
			}}
		/>
	);
};

export default ActionCopyEventLink;
