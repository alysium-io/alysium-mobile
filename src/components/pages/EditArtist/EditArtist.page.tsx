import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { Section, View } from '@atomic';
import { GalleryRefType } from '@flux/api/gallery/types';
import { useArtistTeam, useNavigation } from '@hooks';
import { ContentListItem } from '@molecules';
import { BasePage, EditableGallery } from '@organisms';
import FormTextDisplay from '@src/components/molecules/TextInput/FormTextInput/FormTextDisplay';
import React from 'react';
import { ScrollView } from 'react-native';
import ProfileImage from './components/ProfileImage';
import EditArtistPageHeader from './EditArtist.header';

const EditArtistPage = () => {
	const { artistData } = useArtistAppContext();
	const { numTeamMembers } = useArtistTeam();
	const {
		chooseScenePage,
		editContactsPage,
		editExternalLinksPage,
		editArtistNamePage,
		editArtistBioPage,
		editArtistTeamPage
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
								bottomSubtext: artistData.external_urls?.length
									? artistData.external_urls.length.toLocaleString()
									: 'Instagram, Soundcloud, etc.'
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
								bottomSubtext: artistData.contacts?.length
									? artistData.contacts.length.toLocaleString()
									: 'Manger, booking agent, etc.'
							}}
						/>
						<ContentListItem
							onPress={editArtistTeamPage}
							profileImageProps={{
								defaultImageProps: {
									icon: 'manager'
								},
								containerProps: {
									borderWidth: 1,
									borderRadius: 'round',
									borderColor: 'border.light'
								}
							}}
							titleTextProps={{
								title: 'Team',
								bottomSubtext: numTeamMembers
									? `${numTeamMembers} team member${
											numTeamMembers > 1 ? 's' : ''
									  }`
									: 'To manage/view your account'
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
