import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { UNIVERSAL_LINK_PREFIX } from '@arch/Application/tabs/linking';
import { QRCode, View } from '@atomic';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { SheetApi } from '@hooks';
import { MenuListItem } from '@molecules';
import { BottomSheet } from '@organisms';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface EditArtistPopupMenuBottomSheetProps {
	sheetApi: SheetApi;
}

const EditArtistPopupMenuBottomSheet: React.FC<
	EditArtistPopupMenuBottomSheetProps
> = ({ sheetApi }) => {
	const insets = useSafeAreaInsets();
	const { artistData } = useArtistAppContext();

	return (
		<BottomSheet sheetRef={sheetApi.sheetRef} enableDynamicSizing>
			<BottomSheetView style={{ flex: 1, paddingBottom: insets.bottom + 25 }}>
				<View margin='m' alignItems='center'>
					<QRCode
						value={UNIVERSAL_LINK_PREFIX + '/artist/' + artistData.artist_uid}
					/>
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

export default EditArtistPopupMenuBottomSheet;
