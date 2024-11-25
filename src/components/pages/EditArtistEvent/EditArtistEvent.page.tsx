import { View } from '@atomic';
import { EventStatus } from '@flux/api/event/types';
import { useKeyboard, useSheet } from '@hooks';
import { ActionButtons } from '@molecules';
import { BasePage, ShareExternal } from '@organisms';
import {
	ConfirmPublishEventBottomSheet,
	EditArtistEventPopupMenuBottomSheet
} from '@popups';
import { useRoute } from '@react-navigation/native';
import { EditArtistEventPageRouteProp } from '@types';
import React, { useCallback } from 'react';
import { If, Then } from 'react-if';
import { ScrollView } from 'react-native';
import EditBasicInfo from './components/EditBasicInfo';
import EditEventLocation from './components/EditEventLocation';
import EditEventName from './components/EditEventName';
import EditGallery from './components/EditGallery';
import EditLocation from './components/EditLocation';
import EditProfileImage from './components/EditProfileImage';
import EditArtistEventPageHeader from './EditArtistEvent.header';
import useEditArtistEventPage from './useEditArtistEventPage';

const EditArtistEventPage = () => {
	const route = useRoute<EditArtistEventPageRouteProp>();
	const { dismiss } = useKeyboard();
	const confirmPublishEventSheetApi = useSheet();
	const editArtistEventPopupMenuBottomSheet = useSheet();
	const shareExternalSheetApi = useSheet();
	const {
		eventData,
		isProfileImageLoading,
		updateArtistEventProfileImage,
		updateArtistEventFormApi,
		onBlurEditable
	} = useEditArtistEventPage(route.params.event_uid);

	const FooterComponent = useCallback(
		() => (
			<If condition={eventData?.event.status === EventStatus.draft}>
				<Then>
					<View margin='m'>
						<ActionButtons
							buttonProps={{
								text: 'Publish',
								onPress: confirmPublishEventSheetApi.open,
								color: 'p'
							}}
						/>
						<ConfirmPublishEventBottomSheet
							sheetApi={confirmPublishEventSheetApi}
							event_uid={route.params.event_uid}
						/>
					</View>
				</Then>
			</If>
		),
		[eventData?.event.status]
	);

	if (!eventData) {
		return null;
	}

	return (
		<BasePage FooterComponent={FooterComponent}>
			<EditArtistEventPageHeader
				title={eventData.event.name}
				onPressMenu={editArtistEventPopupMenuBottomSheet.open}
			/>
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
				<EditBasicInfo
					updateArtistEventFormApi={updateArtistEventFormApi}
					onBlurEditable={onBlurEditable}
				/>
				<EditEventLocation eventData={eventData} />
				<EditLocation eventData={eventData} />
				<EditGallery eventData={eventData} />
			</ScrollView>
			<EditArtistEventPopupMenuBottomSheet
				sheetApi={editArtistEventPopupMenuBottomSheet}
				onPressShare={() => {
					editArtistEventPopupMenuBottomSheet.close();
					shareExternalSheetApi.open();
				}}
				event_uid={eventData.event.event_uid}
			/>
			<ShareExternal event={eventData} sheetApi={shareExternalSheetApi} />
		</BasePage>
	);
};

export default EditArtistEventPage;
