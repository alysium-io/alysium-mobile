import { QRCode, View } from '@atomic';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { SheetApi, useHyperlink } from '@hooks';
import { MenuListItem } from '@molecules';
import { BottomSheet } from '@organisms';
import { NanoId } from '@types';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ArtistEventPopupMenuBottomSheetProps {
	sheetApi: SheetApi;
	event_uid: NanoId;
}

const ArtistEventPopupMenuBottomSheet: React.FC<
	ArtistEventPopupMenuBottomSheetProps
> = ({ sheetApi, event_uid }) => {
	const { eventPageHyperlink } = useHyperlink();
	const insets = useSafeAreaInsets();

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
					iconProps={{
						size: 'm'
					}}
				/>
			</BottomSheetView>
		</BottomSheet>
	);
};

export default ArtistEventPopupMenuBottomSheet;
