import { useKeyboard, useLocation } from '@hooks';
import { Location } from '@molecules';
import { BasePage } from '@organisms';
import { useRoute } from '@react-navigation/native';
import { EditArtistEventPageRouteProp } from '@types';
import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import EditEventLocation from './components/EditEventLocation';
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
	const { dismiss } = useKeyboard();

	const { openMap } = useLocation();

	const onPressLocation = () => {
		if (eventData?.event.location) {
			openMap(
				eventData.event.location.latitude,
				eventData.event.location.longitude,
				eventData.event.name
			);
		}
	};

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
				{eventData.event.location && (
					<TouchableOpacity onPress={onPressLocation} activeOpacity={0.9}>
						<Location
							location={eventData.event.location}
							containerProps={{
								height: 300,
								margin: 'm',
								style: { borderRadius: 25 }
							}}
						/>
					</TouchableOpacity>
				)}
				<EditGallery eventData={eventData} />
			</ScrollView>
		</BasePage>
	);
};

export default EditArtistEventPage;
