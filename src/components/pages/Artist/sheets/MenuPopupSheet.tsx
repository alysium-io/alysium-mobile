import { QRCode, View } from '@atomic';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { SheetApi, useClipboard, useHyperlink } from '@hooks';
import { MenuListItem } from '@molecules';
import { BottomSheet } from '@organisms';
import { NanoId } from '@types';
import React from 'react';
import { Share as RNShare } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface MenuPopupSheetProps {
	sheetApi: SheetApi;
	artist_uid: NanoId;
}

const MenuPopupSheet: React.FC<MenuPopupSheetProps> = ({
	sheetApi,
	artist_uid
}) => {
	const { artistPageHyperlink } = useHyperlink();
	const insets = useSafeAreaInsets();
	const { copy } = useClipboard();

	return (
		<BottomSheet ref={sheetApi.sheetRef}>
			<BottomSheetView style={{ paddingBottom: insets.bottom + 25 }}>
				<View margin='m' alignItems='center'>
					<QRCode data={artistPageHyperlink(artist_uid)} />
				</View>
				<MenuListItem
					onPress={() =>
						RNShare.share({
							title: 'Share Via',
							message: '',
							url: artistPageHyperlink(artist_uid)
						})
					}
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
				<MenuListItem
					onPress={() =>
						copy(artistPageHyperlink(artist_uid), {
							text2: 'You can now share this artist'
						})
					}
					icon='link'
					iconProps={{ size: 'm' }}
					titleTextProps={{
						title: 'Copy Link to Artist',
						bottomSubtext: 'Copy shareable link to this artist',
						titleVariant: 'paragraph',
						bottomSubtextColor: 'text.q'
					}}
				/>
			</BottomSheetView>
		</BottomSheet>
	);
};

export default MenuPopupSheet;
