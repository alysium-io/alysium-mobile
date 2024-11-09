import { useKeyboard } from '@hooks';
import { BasePage } from '@organisms';
import { useRoute } from '@react-navigation/native';
import { EditArtistEventPageRouteProp } from '@types';
import React from 'react';
import { ScrollView } from 'react-native';
import EditDatetimes from './components/EditDatetimes';
import EditEventLocation from './components/EditEventLocation';
import EditEventName from './components/EditEventName';
import EditGallery from './components/EditGallery';
import EditLocation from './components/EditLocation';
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
	const { dismiss } = useKeyboard();

	if (!eventData) {
		return null;
	}

	return (
		<BasePage>
			<EditArtistEventPageHeader title={eventData.event.name} />
			<ScrollView onScrollBeginDrag={dismiss}>
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
				<EditEventLocation eventData={eventData} />
				<EditDatetimes
					updateArtistEventFormApi={updateArtistEventFormApi}
					onBlurEditable={onBlurEditable}
				/>
				<EditLocation eventData={eventData} />
				<EditGallery eventData={eventData} />
			</ScrollView>
		</BasePage>
	);
};

export default EditArtistEventPage;
