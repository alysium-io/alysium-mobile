import { QRCode, View } from '@atomic';
import { PublicArtist } from '@flux/api/artist';
import { artistEventApiSlice } from '@flux/api/event';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { SheetApi, useClipboard, useHyperlink, useSheet } from '@hooks';
import { MenuListItem } from '@molecules';
import { BottomSheet } from '@organisms';
import ShareArtistPosterSheet from '@src/components/popups/ShareExternalSheet/ShareArtistPosterSheet';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface MenuPopupSheetProps {
	sheetApi: SheetApi;
	artist: PublicArtist;
}

const MenuPopupSheet: React.FC<MenuPopupSheetProps> = ({
	sheetApi,
	artist
}) => {
	const shareArtistPosterSheetApi = useSheet();
	const { artistPageHyperlink } = useHyperlink();
	const insets = useSafeAreaInsets();
	const { copy } = useClipboard();
	const { data: eventsData } =
		artistEventApiSlice.usePublicFindAllArtistEventsQuery({
			params: { artist_uid: artist.artist_uid },
			query: {
				page: 1,
				limit: 20
			}
		});

	return (
		<>
			<BottomSheet ref={sheetApi.sheetRef}>
				<BottomSheetView style={{ paddingBottom: insets.bottom + 25 }}>
					<View margin='m' alignItems='center'>
						<QRCode data={artistPageHyperlink(artist.artist_uid)} />
					</View>
					<MenuListItem
						onPress={shareArtistPosterSheetApi.open}
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
							copy(artistPageHyperlink(artist.artist_uid), {
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
			<ShareArtistPosterSheet
				artist={artist}
				events={eventsData ?? []}
				sheetApi={shareArtistPosterSheetApi}
			/>
		</>
	);
};

export default MenuPopupSheet;
