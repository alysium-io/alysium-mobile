import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { artistEventApiSlice } from '@flux/api/event';
import { MenuListItem } from '@molecules';
import { Alert, useGlobalLoader } from '@templates';
import { NanoId } from '@types';
import React from 'react';
import Toast from 'react-native-toast-message';

interface DeleteEventMenuListItemProps {
	event_uid: NanoId;
	onSuccess?: () => void;
}

const DeleteEventMenuListItem: React.FC<DeleteEventMenuListItemProps> = ({
	event_uid,
	onSuccess
}) => {
	const { showLoader, hideLoader } = useGlobalLoader();
	const { artistData } = useArtistAppContext();
	const [deleteArtistEventMutation] =
		artistEventApiSlice.useDeleteArtistEventMutation();

	const onDelete = () => {
		Alert.alert('Delete Event', 'Are you sure you want to delete this event?', [
			{
				text: 'cancel',
				style: 'cancel'
			},
			{
				text: 'delete',
				onPress: async () => {
					try {
						showLoader();
						await deleteArtistEventMutation({
							params: {
								artist_uid: artistData.artist_uid,
								event_uid
							}
						}).unwrap();
						onSuccess?.();
					} catch (error) {
						Toast.show({
							text1: 'Error',
							text2: 'Failed to delete event'
						});
					} finally {
						hideLoader();
					}
				},
				style: 'destructive'
			}
		]);
	};

	return (
		<MenuListItem
			titleTextProps={{
				title: 'Delete Event',
				titleVariant: 'paragraph',
				bottomSubtext: 'Permanent action',
				bottomSubtextVariant: 'paragraph-small',
				bottomSubtextColor: 'text.q'
			}}
			icon='trash'
			iconProps={{ size: 'm' }}
			onPress={onDelete}
		/>
	);
};

export default DeleteEventMenuListItem;
