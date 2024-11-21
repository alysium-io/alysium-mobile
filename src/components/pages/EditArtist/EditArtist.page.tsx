import { View } from '@atomic';
import { SelfAwareScrollView, useSelfAwareScrollView } from '@molecules';
import { BasePage } from '@organisms';
import React from 'react';
import EditArtistName from './components/EditArtistName';
import EditBasicInfoSection from './components/EditBasicInfoSection';
import EditEvents from './components/EditEvents';
import EditExternalUrlsSection from './components/EditExternalUrlsSection';
import EditProfileImage from './components/EditProfileImage';
import GallerySection from './components/GallerySection';
import EditArtistPageHeader from './EditArtist.header';
import useEditArtistPage from './useEditArtistPage';

const EditArtistPage = () => {
	const selfAwareScrollViewApi = useSelfAwareScrollView();
	const {
		editArtistFormApi,
		onBlurEditable,
		updateArtistProfileImage,
		isProfileImageLoading
	} = useEditArtistPage();

	return (
		<BasePage>
			<EditArtistPageHeader />
			<SelfAwareScrollView
				selfAwareScrollViewApi={selfAwareScrollViewApi}
				showsVerticalScrollIndicator={false}
			>
				<View margin='m'>
					<EditProfileImage
						updateArtistProfileImage={updateArtistProfileImage}
						isProfileImageLoading={isProfileImageLoading}
					/>
				</View>
				<EditArtistName
					editArtistFormApi={editArtistFormApi}
					onBlurEditable={onBlurEditable}
				/>
				<EditEvents />
				<EditBasicInfoSection
					editArtistFormApi={editArtistFormApi}
					onBlurEditable={onBlurEditable}
				/>
				<EditExternalUrlsSection />
				<GallerySection />
			</SelfAwareScrollView>
		</BasePage>
	);
};

export default EditArtistPage;
