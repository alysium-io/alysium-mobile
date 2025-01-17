import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { artistEventApiSlice } from '@flux/api/event';
import { EventStatus } from '@flux/api/event/types';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { SheetApi, useNavigation, useToast } from '@hooks';
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
	const insets = useSafeAreaInsets();
	const [patchArtistEventStatusMutation] =
		artistEventApiSlice.usePatchArtistEventStatusMutation();
	const { artistData, isEditable } = useArtistAppContext();
	const { toastError } = useToast();
	const { back } = useNavigation();

	const confirmDelete = () => {
		Alert.alert('Cancel Event', 'You cannot undo this operation.', [
			{
				text: 'Do not cancel',
				style: 'accent'
			},
			{
				text: 'Cancel Event',
				onPress: onCancelEvent,
				style: 'destructive'
			}
		]);
	};

	const onCancelEvent = async () => {
		try {
			showLoader();
			await patchArtistEventStatusMutation({
				params: {
					artist_uid: artistData.artist_uid,
					event_uid
				},
				body: {
					status: EventStatus.canceled
				}
			}).unwrap();
		} catch (error) {
			toastError('Failed to cancel event');
		} finally {
			hideLoader();
			sheetApi.close();
			back();
		}
	};

	return (
		<BottomSheet ref={sheetApi.sheetRef} enableDynamicSizing>
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
					iconProps={{ size: 'm' }}
					onPress={onPressShare}
				/>
				{isEditable && (
					<MenuListItem
						titleTextProps={{
							title: 'Cancel Event',
							titleVariant: 'paragraph',
							bottomSubtext: 'You cannot undo this action',
							bottomSubtextVariant: 'paragraph-small',
							bottomSubtextColor: 'text.q'
						}}
						icon='cancel'
						iconProps={{ size: 'm' }}
						onPress={confirmDelete}
					/>
				)}
			</BottomSheetView>
		</BottomSheet>
	);
};

export default PopupMenu;
