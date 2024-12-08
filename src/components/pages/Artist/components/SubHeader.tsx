import { Icon, Section, Text, View } from '@atomic';
import { Formatting } from '@etc';
import { PublicFindOneArtistResponseDto } from '@flux/api/artist/dto/artist-find-one.dto';
import { useNavigation, useSheet } from '@hooks';
import { Stats } from '@organisms';
import React from 'react';
import { Else, If, Then } from 'react-if';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ContactsSheet from '../sheets/ContactsSheet';
import ExternalUrlsSheet from '../sheets/ExternalUrlsSheet';

interface SubHeaderProps {
	artistData: PublicFindOneArtistResponseDto;
}

const SubHeader: React.FC<SubHeaderProps> = ({ artistData }) => {
	const { scenePage } = useNavigation();
	const externalUrlsSheetApi = useSheet();
	const contactsSheetApi = useSheet();

	const onPressScene = () => {
		if (artistData?.scene) {
			scenePage(artistData.scene.scene.scene_uid, {
				to: 'ScenePage',
				to_uid: artistData.scene.scene.scene_uid,
				from: 'ArtistPage',
				from_uid: artistData.artist_uid,
				using: 'ARTIST_SCENE_LINK'
			});
		}
	};

	return (
		<Section marginBottom='s'>
			<View
				flexDirection='row'
				justifyContent='space-between'
				alignItems='center'
				marginBottom='m'
			>
				<View>
					<If condition={!!artistData?.scene}>
						<Then>
							<TouchableOpacity onPress={onPressScene}>
								<View>
									<Text variant='paragraph-medium' marginBottom='xs'>
										{artistData.scene?.scene.name}
									</Text>
									<Text variant='paragraph-small' color='text.t'>
										{artistData.scene?.scene.country}
									</Text>
								</View>
							</TouchableOpacity>
						</Then>
						<Else>
							<Text variant='paragraph-medium' marginBottom='xs'>
								No Location
							</Text>
						</Else>
					</If>
				</View>
				<Stats
					items={[
						{
							title: Formatting.abbreviateNumber(artistData?.num_followers),
							subtitle: Formatting.getNumFollowersSuffix(
								artistData?.artist_spotify_data?.followers
							)
						},
						{
							title: Formatting.abbreviateNumber(artistData?.num_events),
							subtitle: 'events'
						}
					]}
				/>
			</View>
			<View width='75%'>
				<Text variant='paragraph-small'>{artistData.bio}</Text>
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
		</Section>
	);
};

export default SubHeader;
