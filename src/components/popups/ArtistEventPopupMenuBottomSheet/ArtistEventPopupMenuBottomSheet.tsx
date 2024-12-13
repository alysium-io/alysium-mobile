import { UNIVERSAL_LINK_PREFIX } from '@arch/Application/tabs/linking';
import { QRCode, View } from '@atomic';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { SheetApi } from '@hooks';
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
	const insets = useSafeAreaInsets();

	return (
		<BottomSheet sheetRef={sheetApi.sheetRef} enableDynamicSizing>
			<BottomSheetView style={{ flex: 1, paddingBottom: insets.bottom + 25 }}>
				<View margin='m' alignItems='center'>
					<QRCode value={UNIVERSAL_LINK_PREFIX + '/event/' + event_uid} />
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
