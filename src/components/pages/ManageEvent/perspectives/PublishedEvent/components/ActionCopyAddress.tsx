import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { artistEventApiSlice } from '@flux/api/event';
import { useClipboard, useLocation } from '@hooks';
import { MenuListItem } from '@molecules';
import { NanoId } from '@types';
import React from 'react';

interface ActionCopyAddressProps {
	event_uid: NanoId;
}

const ActionCopyAddress: React.FC<ActionCopyAddressProps> = ({ event_uid }) => {
	const { artistData } = useArtistAppContext();
	const { copy } = useClipboard();
	const { data: eventData } =
		artistEventApiSlice.usePrivateFindOneArtistEventQuery({
			params: {
				event_uid,
				artist_uid: artistData.artist_uid
			}
		});
	const locationApi = useLocation(eventData?.event.location);

	const onCopyAddress = () => {
		copy(
			locationApi.build([
				{ type: 'street_number' },
				{ type: 'route', nameLength: 'short_name' },
				{ type: 'neighborhood' },
				{ type: 'postal_code' },
				{ type: 'administrative_area_level_1' },
				{ type: 'country', nameLength: 'short_name' }
			]),
			{
				text2: 'You can now share this address'
			}
		);
	};

	return (
		<MenuListItem
			onPress={onCopyAddress}
			prefixIconProps={{
				name: 'link',
				size: 'm'
			}}
			icon='location'
			iconProps={{ size: 'm' }}
			titleTextProps={{
				title: 'Copy Address',
				bottomSubtext: 'Copy the event address to share',
				titleVariant: 'paragraph',
				bottomSubtextColor: 'text.q'
			}}
		/>
	);
};

export default ActionCopyAddress;
