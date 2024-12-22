import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { Section, View } from '@atomic';
import { GalleryRefType } from '@flux/api/gallery/types';
import { useNavigation } from '@hooks';
import { ContentListItem } from '@molecules';
import { BasePage, EditableGallery } from '@organisms';
import FormTextDisplay from '@src/components/molecules/TextInput/FormTextInput/FormTextDisplay';
import React from 'react';
import { ScrollView } from 'react-native';
import ProfileImage from './components/ProfileImage';
import EditArtistPageHeader from './EditArtist.header';

const EditArtistPage = () => {
	const { artistData } = useArtistAppContext();
	const {
		chooseScenePage,
		editContactsPage,
		editExternalLinksPage,
		editArtistNamePage,
		editArtistBioPage
	} = useNavigation();

	return (
		<BasePage>
			<EditArtistPageHeader />
			<ScrollView showsVerticalScrollIndicator={false}>
				<Section>
					<ProfileImage />
					<View margin='m' marginBottom='none'>
						<FormTextDisplay label='Name' onPress={editArtistNamePage}>
							{artistData.name ?? 'Artist name'}
						</FormTextDisplay>
						<FormTextDisplay label='Scene' onPress={chooseScenePage}>
							{artistData.scene?.scene.name ?? 'What city are you based in?'}
						</FormTextDisplay>
						<FormTextDisplay label='Bio' onPress={editArtistBioPage}>
							{artistData.bio?.length
								? artistData.bio
								: 'What can people expect from you?'}
						</FormTextDisplay>
					</View>
					<View marginBottom='m'>
						<ContentListItem
							onPress={editExternalLinksPage}
							profileImageProps={{
								defaultImageProps: {
									icon: 'link'
								},
								containerProps: {
									borderWidth: 1,
									borderRadius: 'round',
									borderColor: 'border.light'
								}
							}}
							titleTextProps={{
								title: 'Links',
								bottomSubtext:
									artistData.external_urls?.length.toLocaleString() ?? '0'
							}}
						/>
						<ContentListItem
							onPress={editContactsPage}
							profileImageProps={{
								defaultImageProps: {
									icon: 'old-phone'
								},
								containerProps: {
									borderWidth: 1,
									borderRadius: 'round',
									borderColor: 'border.light'
								}
							}}
							titleTextProps={{
								title: 'Contacts',
								bottomSubtext:
									artistData.contacts?.length.toLocaleString() ?? '0'
							}}
						/>
					</View>
					<View margin='m'>
						<EditableGallery
							gallery={artistData.gallery}
							galleryRefType={GalleryRefType.artist}
							galleryRefUid={artistData.artist_uid}
						/>
					</View>
				</Section>
			</ScrollView>
		</BasePage>
	);
};

export default EditArtistPage;
