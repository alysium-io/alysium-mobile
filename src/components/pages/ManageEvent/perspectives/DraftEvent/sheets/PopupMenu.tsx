import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { QRCode, View } from '@atomic';
import { artistEventApiSlice } from '@flux/api/event';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { SheetApi, useHyperlink, useNavigation, useToast } from '@hooks';
import { MenuListItem } from '@molecules';
import { BottomSheet } from '@organisms';
import { Alert, useGlobalLoader } from '@templates';
import { NanoId } from '@types';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface PopupMenuBotto {
	sheetApi: SheetApi;
	onPressShare: () => void;
	event_uid: NanoId;
}

const PopupMenu: React.FC<PopupMenuBotto> = ({
	sheetApi,
	event_uid,
	onPressShare
}) => {
	const { showLoader, hideLoader } = useGlobalLoader();
	const { eventPageHyperlink } = useHyperlink();
	const insets = useSafeAreaInsets();
	const [deleteArtistEventMutation] =
		artistEventApiSlice.useDeleteArtistEventMutation();
	const { artistData, isEditable } = useArtistAppContext();
	const { toastError } = useToast();
	const { back } = useNavigation();

	const confirmDelete = () => {
		Alert.alert('Delete Event', 'Are you sure you want to delete this event?', [
			{
				text: 'cancel',
				style: 'cancel'
			},
			{
				text: 'delete',
				onPress: onDeleteEvent,
				style: 'destructive'
			}
		]);
	};

	const onDeleteEvent = async () => {
		try {
			showLoader();
			await deleteArtistEventMutation({
				params: {
					artist_uid: artistData.artist_uid,
					event_uid
				}
			}).unwrap();
		} catch (error) {
			toastError('Failed to delete event');
		} finally {
			hideLoader();
			sheetApi.close();
			back();
		}
	};

	return (
		<BottomSheet ref={sheetApi.sheetRef} enableDynamicSizing>
			<BottomSheetView style={{ flex: 1, paddingBottom: insets.bottom + 25 }}>
				<View margin='m' alignItems='center'>
					<QRCode data={eventPageHyperlink(event_uid)} />
				</View>
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
					onPress={onPressShare}
				/>
				{isEditable && (
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
						onPress={confirmDelete}
					/>
				)}
			</BottomSheetView>
		</BottomSheet>
	);
};

export default PopupMenu;
