import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { eventMediaApiSlice } from '@flux/api/event-media';
import { EventMedia } from '@flux/api/event-media/event-media.entity';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { SheetApi } from '@hooks';
import { MenuListItem } from '@molecules';
import { BottomSheet } from '@organisms';
import { captureException } from '@sentry/react-native';
import { Alert } from '@templates';
import { NanoId } from '@types';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

interface ListItemMenuSheetProps {
	sheetApi: SheetApi;
	event_uid: NanoId;
	eventMedia: EventMedia | null;
}

const ListItemMenuSheet: React.FC<ListItemMenuSheetProps> = ({
	sheetApi,
	event_uid,
	eventMedia
}) => {
	const { artist_uid } = useArtistAppContext();
	const insets = useSafeAreaInsets();
	const [deleteEventMedia] = eventMediaApiSlice.useDeleteEventMediaMutation();

	const onDeleteEventMedia = async () => {
		try {
			const eventMediaUid = eventMedia?.event_media_uid;
			if (eventMediaUid) {
				await deleteEventMedia({
					params: {
						artist_uid,
						event_uid,
						event_media_uid: eventMedia?.event_media_uid
					}
				});
				sheetApi.close();
			}
		} catch (error) {
			captureException(error);
			Toast.show({
				text1: `Error deleting ${eventMedia?.multimedia.media_type}`,
				text2: 'Please try again later'
			});
		}
	};

	const onPressDeleteEventMedia = async () => {
		Alert.alert(
			`Delete ${eventMedia?.multimedia.media_type}`,
			`Are you sure you want to delete this ${eventMedia?.multimedia.media_type}?`,
			[
				{
					text: 'Cancel',
					style: 'cancel'
				},
				{
					text: 'Delete',
					onPress: onDeleteEventMedia,
					style: 'destructive'
				}
			]
		);
	};

	return (
		<BottomSheet ref={sheetApi.sheetRef}>
			<BottomSheetView style={{ flex: 1, paddingBottom: insets.bottom + 25 }}>
				<MenuListItem
					titleTextProps={{
						title: `Delete ${eventMedia?.multimedia.media_type}`,
						titleVariant: 'paragraph',
						bottomSubtext: `Permanently delete this ${eventMedia?.multimedia.media_type}`,
						bottomSubtextVariant: 'paragraph-small',
						bottomSubtextColor: 'text.q'
					}}
					icon='trash'
					iconProps={{ size: 'm' }}
					onPress={onPressDeleteEventMedia}
				/>
			</BottomSheetView>
		</BottomSheet>
	);
};

export default ListItemMenuSheet;
