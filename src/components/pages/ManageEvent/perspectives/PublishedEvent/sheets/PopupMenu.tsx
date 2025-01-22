import { BottomSheetView } from '@gorhom/bottom-sheet';
import { SheetApi, useNavigation } from '@hooks';
import { MenuListItem } from '@molecules';
import { BottomSheet } from '@organisms';
import { NanoId } from '@types';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CancelButton from '../components/CancelButton';

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
	const insets = useSafeAreaInsets();
	const { back } = useNavigation();

	const onCancelSuccess = () => {
		sheetApi.close();
		back();
	};

	const onCancelError = () => {
		sheetApi.close();
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
				<CancelButton
					event_uid={event_uid}
					onSuccess={onCancelSuccess}
					onError={onCancelError}
				/>
			</BottomSheetView>
		</BottomSheet>
	);
};

export default PopupMenu;
