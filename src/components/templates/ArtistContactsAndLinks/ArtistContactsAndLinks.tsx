import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { Icon, Text, View } from '@atomic';
import { useSheet } from '@hooks';
import ContactsSheet from '@src/components/pages/Artist/sheets/ContactsSheet';
import ExternalUrlsSheet from '@src/components/pages/Artist/sheets/ExternalUrlsSheet';
import React from 'react';
import { TouchableOpacity } from 'react-native';

const ArtistContactsAndLinks = () => {
	const { artistData } = useArtistAppContext();
	const externalUrlsSheetApi = useSheet();
	const contactsSheetApi = useSheet();
	return (
		<>
			<View width='75%'>
				{artistData.contacts?.length > 0 &&
					artistData.external_urls?.length > 0 && (
						<View marginTop='m' flexDirection='row' alignItems='center'>
							{artistData.contacts?.length > 0 && (
								<TouchableOpacity hitSlop={20} onPress={contactsSheetApi.open}>
									<View flexDirection='row' alignItems='center'>
										<Icon name='old-phone' size='s' />
										<Text variant='paragraph-small-medium' marginLeft='xs'>
											Contacts
										</Text>
									</View>
								</TouchableOpacity>
							)}
							{artistData.external_urls?.length > 0 && (
								<>
									<View
										marginHorizontal='s'
										backgroundColor='text.q'
										borderRadius='round'
										style={{
											height: 4,
											width: 4
										}}
									/>
									<TouchableOpacity
										hitSlop={20}
										onPress={externalUrlsSheetApi.open}
									>
										<View flexDirection='row' alignItems='center'>
											<Icon name='link' size='s' />
											<Text variant='paragraph-small-medium' marginLeft='xs'>
												Links
											</Text>
										</View>
									</TouchableOpacity>
								</>
							)}
						</View>
					)}
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
