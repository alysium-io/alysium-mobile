import { BottomSheetView } from '@gorhom/bottom-sheet';
import { SheetApi } from '@hooks';
import { MenuListItem } from '@molecules';
import { BottomSheet } from '@organisms';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface PopupMenuSheetProps {
	sheetApi: SheetApi;
}

const PopupMenuSheet: React.FC<PopupMenuSheetProps> = ({ sheetApi }) => {
	const insets = useSafeAreaInsets();
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
					icon='share-filled'
					iconProps={{
						size: 'm'
					}}
				/>
			</BottomSheetView>
		</BottomSheet>
	);
};

export default PopupMenuSheet;
