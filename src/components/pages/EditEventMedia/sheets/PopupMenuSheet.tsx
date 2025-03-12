import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { eventMediaApiSlice } from '@flux/api/event-media';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { SheetApi, useNavigation } from '@hooks';
import { MenuListItem } from '@molecules';
import { BottomSheet } from '@organisms';
import { captureException } from '@sentry/react-native';
import { Alert } from '@templates';
import { NanoId } from '@types';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

interface PopupMenuSheetProps {
	sheetApi: SheetApi;
	event_uid: NanoId;
}

const PopupMenuSheet: React.FC<PopupMenuSheetProps> = ({
	sheetApi,
	event_uid
}) => {
	const { artist_uid } = useArtistAppContext();
	const insets = useSafeAreaInsets();
	const { back } = useNavigation();
	const [deleteAllEventMedia] =
		eventMediaApiSlice.useDeleteAllEventMediaMutation();

	const onDeleteAllEventMedia = async () => {
		try {
			await deleteAllEventMedia({
				params: {
					artist_uid,
					event_uid
				}
			});
			sheetApi.close();
			setTimeout(() => {
				back();
			}, 350);
		} catch (error) {
			captureException(error);
			Toast.show({
				text1: 'Error deleting all media',
				text2: 'Please try again later'
			});
		}
	};

	const onPressDeleteAllEventMedia = async () => {
		Alert.alert(
			'Delete All Media',
			'Are you sure you want to delete all media?',
			[
				{
					text: 'Cancel',
					style: 'cancel'
				},
				{
					text: 'Delete All',
					onPress: onDeleteAllEventMedia,
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
						title: 'Delete All Media',
						titleVariant: 'paragraph',
						bottomSubtext: 'Permanently delete all media',
						bottomSubtextVariant: 'paragraph-small',
						bottomSubtextColor: 'text.q'
					}}
					icon='trash'
					iconProps={{ size: 'm' }}
					onPress={onPressDeleteAllEventMedia}
				/>
			</BottomSheetView>
		</BottomSheet>
	);
};

export default PopupMenuSheet;
