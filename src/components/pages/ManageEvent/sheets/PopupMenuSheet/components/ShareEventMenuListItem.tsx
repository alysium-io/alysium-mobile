import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { artistEventApiSlice } from '@flux/api/event';
import { useSheet } from '@hooks';
import { MenuListItem } from '@molecules';
import { ShareEventPosterSheet } from '@popups';
import { NanoId } from '@types';
import React from 'react';

interface ShareEventMenuListItemProps {
	event_uid: NanoId;
}

const ShareEventMenuListItem: React.FC<ShareEventMenuListItemProps> = ({
	event_uid
}) => {
	const shareExternalSheetApi = useSheet();
	const { artistData } = useArtistAppContext();
	const { data } = artistEventApiSlice.usePrivateFindOneArtistEventQuery({
		params: {
			artist_uid: artistData.artist_uid,
			event_uid
		}
	});

	return (
		<>
			<MenuListItem
				titleTextProps={{
					title: 'Share',
					bottomSubtext: 'iMessage, Instagram, etc.',
					titleVariant: 'paragraph',
					bottomSubtextVariant: 'paragraph-small',
					bottomSubtextColor: 'text.q'
				}}
				icon='share'
				iconProps={{ size: 'm' }}
				onPress={shareExternalSheetApi.open}
			/>
			{data && (
				<ShareEventPosterSheet event={data} sheetApi={shareExternalSheetApi} />
			)}
		</>
	);
};

export default ShareEventMenuListItem;
