import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { artistEventApiSlice } from '@flux/api/event';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { SheetApi, useNavigation, useToast } from '@hooks';
import { MenuListItem } from '@molecules';
import { BottomSheet } from '@organisms';
import { NanoId } from '@types';
import React from 'react';
import { Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface EditArtistEventPopupMenuBottomSheetProps {
	sheetApi: SheetApi;
	onPressShare: () => void;
	event_uid: NanoId;
}

const EditArtistEventPopupMenuBottomSheet: React.FC<
	EditArtistEventPopupMenuBottomSheetProps
> = ({ sheetApi, event_uid, onPressShare }) => {
	const insets = useSafeAreaInsets();
	const [deleteArtistEventMutation] =
		artistEventApiSlice.useDeleteArtistEventMutation();
	const { artistData } = useArtistAppContext();
	const { toastError } = useToast();
	const { back } = useNavigation();

	const confirmDelete = () => {
		Alert.alert(
			'Delete Event',
			'Are you sure you want to delete this event?',
			[
				{
					text: 'cancel',
					style: 'cancel'
				},
				{
					text: 'delete',
					onPress: onDeleteEvent,
					style: 'destructive'
				}
			],
			{ cancelable: false }
		);
	};

	const onDeleteEvent = async () => {
		try {
			await deleteArtistEventMutation({
				params: {
					artist_uid: artistData.artist_uid,
					event_uid
				}
			});
			sheetApi.close();
			back();
		} catch (error) {
			toastError('Failed to delete event');
		}
	};

	return (
		<BottomSheet sheetRef={sheetApi.sheetRef} enableDynamicSizing>
			<BottomSheetView style={{ flex: 1, paddingBottom: insets.bottom + 25 }}>
				<MenuListItem
					titleTextProps={{
						title: 'Share',
						bottomSubtext: 'iMessage, Instagram, etc.',
						titleVariant: 'paragraph',
						bottomSubtextVariant: 'paragraph-small',
						bottomSubtextColor: 'text.q'
					}}
					icon='share'
					iconProps={{
						size: 'm'
					}}
					onPress={onPressShare}
				/>
				<MenuListItem
					titleTextProps={{
						title: 'Delete Event',
						titleVariant: 'paragraph'
					}}
					icon='trash'
					iconProps={{
						size: 'm',
						color: 'text.color.t.medium'
					}}
					onPress={confirmDelete}
				/>
			</BottomSheetView>
		</BottomSheet>
	);
};

export default EditArtistEventPopupMenuBottomSheet;
