import { View } from '@atomic';
import { BasePage } from '@organisms';
import { useRoute } from '@react-navigation/native';
import { EditArtistEventPageRouteProp } from '@types';
import React from 'react';
import { ScrollView } from 'react-native';
import EditEventName from './components/EditEventName';
import EditGallery from './components/EditGallery';
import EditProfileImage from './components/EditProfileImage';
import EditArtistEventPageHeader from './EditArtistEvent.header';
import useEditArtistEventPage from './useEditArtistEventPage';

const EditArtistEventPage = () => {
	const route = useRoute<EditArtistEventPageRouteProp>();
	const {
		eventData,
		isProfileImageLoading,
		updateArtistEventProfileImage,
		updateArtistEventFormApi,
		onBlurEditable
	} = useEditArtistEventPage(route.params.event_uid);

	if (!eventData) {
		return null;
	}

	return (
		<BasePage>
			<EditArtistEventPageHeader title={eventData.event.name} />
			<ScrollView>
				<View margin='m'>
					<EditProfileImage
						eventData={eventData}
						isProfileImageLoading={isProfileImageLoading}
						updateArtistEventProfileImage={updateArtistEventProfileImage}
					/>
					<EditEventName
						eventData={eventData}
						updateArtistEventFormApi={updateArtistEventFormApi}
						onBlurEditable={onBlurEditable}
					/>
				</View>
				<EditGallery eventData={eventData} />
			</ScrollView>
		</BasePage>
	);
};

export default EditArtistEventPage;
