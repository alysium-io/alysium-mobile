import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { QRCode, View } from '@atomic';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { SheetApi, useHyperlink } from '@hooks';
import { MenuListItem } from '@molecules';
import { BottomSheet } from '@organisms';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface PopupMenuSheetProps {
	sheetApi: SheetApi;
}

const PopupMenuSheet: React.FC<PopupMenuSheetProps> = ({ sheetApi }) => {
	const { artistPageHyperlink } = useHyperlink();
	const insets = useSafeAreaInsets();
	const { artistData } = useArtistAppContext();

	return (
		<BottomSheet sheetRef={sheetApi.sheetRef} enableDynamicSizing>
			<BottomSheetView style={{ flex: 1, paddingBottom: insets.bottom + 25 }}>
				<View margin='m' alignItems='center'>
					<QRCode data={artistPageHyperlink(artistData.artist_uid)} />
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

export default PopupMenuSheet;
