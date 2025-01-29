import { Icon, Text, View } from '@atomic';
import { artistApiSlice } from '@flux/api/artist';
import { useSheet } from '@hooks';
import ContactsSheet from '@src/components/pages/Artist/sheets/ContactsSheet';
import ExternalUrlsSheet from '@src/components/pages/Artist/sheets/ExternalUrlsSheet';
import { NanoId } from '@types';
import React from 'react';
import { TouchableOpacity } from 'react-native';

interface ArtistContactsAndLinksProps {
	artist_uid: NanoId;
}

const ArtistContactsAndLinks: React.FC<ArtistContactsAndLinksProps> = ({
	artist_uid
}) => {
	const { data: artistData } = artistApiSlice.usePublicFindOneArtistQuery({
		params: { artist_uid }
	});

	const externalUrlsSheetApi = useSheet();
	const contactsSheetApi = useSheet();

	if (!artistData) return null;

	return (
		<>
			<View width='75%'>
				<View marginTop='m' flexDirection='row' alignItems='center'>
					<TouchableOpacity hitSlop={20} onPress={contactsSheetApi.open}>
						<View flexDirection='row' alignItems='center'>
							<Icon name='old-phone' size='s' />
							<Text variant='paragraph-small-medium' marginLeft='xs'>
								Contacts
							</Text>
						</View>
					</TouchableOpacity>
					<View
						marginHorizontal='s'
						backgroundColor='text.q'
						borderRadius='round'
						style={{
							height: 4,
							width: 4
						}}
					/>
					<TouchableOpacity hitSlop={20} onPress={externalUrlsSheetApi.open}>
						<View flexDirection='row' alignItems='center'>
							<Icon name='link' size='s' />
							<Text variant='paragraph-small-medium' marginLeft='xs'>
								Links
							</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>
			<ExternalUrlsSheet
				sheetApi={externalUrlsSheetApi}
				externalUrls={artistData.external_urls}
			/>
			<ContactsSheet
				sheetApi={contactsSheetApi}
				contacts={artistData.contacts}
			/>
		</>
	);
};

export default ArtistContactsAndLinks;
