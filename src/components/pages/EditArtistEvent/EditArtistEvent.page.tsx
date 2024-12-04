import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { View } from '@atomic';
import { artistEventApiSlice } from '@flux/api/event';
import { UpdateArtistEventBodyDto } from '@flux/api/event/dto/artist-event-update.dto';
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
import { useForm } from 'react-hook-form';
import { If, Then } from 'react-if';
import { ScrollView } from 'react-native';
import EditBasicInfo from './components/EditBasicInfo';
import EditEventLocation from './components/EditEventLocation';
import EditEventName from './components/EditEventName';
import EditGallery from './components/EditGallery';
import EditLocation from './components/EditLocation';
import EditProfileImage from './components/EditProfileImage';
import EditArtistEventPageHeader from './EditArtistEvent.header';

const EditArtistEventPage = () => {
	const route = useRoute<EditArtistEventPageRouteProp>();
	const { dismiss } = useKeyboard();
	const { artistData } = useArtistAppContext();
	const confirmPublishEventSheetApi = useSheet();
	const editArtistEventPopupMenuBottomSheet = useSheet();
	const shareExternalSheetApi = useSheet();
	const [updateArtistEventMutation] =
		artistEventApiSlice.useUpdateArtistEventMutation();

	const { data: eventData } =
		artistEventApiSlice.usePrivateFindOneArtistEventQuery({
			params: {
				event_uid: route.params.event_uid,
				artist_uid: artistData.artist_uid
			}
		});

	const {
		formState: { isDirty },
		control,
		handleSubmit
	} = useForm<UpdateArtistEventBodyDto>({
		defaultValues: {
			name: eventData?.event.name,
			about: eventData?.event.about,
			start_time: eventData?.event.start_time,
			end_time: eventData?.event.end_time,
			status: eventData?.event.status
		}
	});

	const onSubmit = (data: UpdateArtistEventBodyDto) => {
		if (eventData) {
			updateArtistEventMutation({
				params: {
					artist_uid: artistData.artist_uid,
					event_uid: eventData.event.event_uid
				},
				body: data
			});
		}
	};

	const onBlurEditable = () => {
		if (isDirty) {
			handleSubmit(onSubmit)();
		}
	};

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

	console.log(eventData.event.location);

	return (
		<BasePage FooterComponent={FooterComponent}>
			<EditArtistEventPageHeader
				title={eventData.event.name}
				onPressMenu={editArtistEventPopupMenuBottomSheet.open}
			/>
			<ScrollView onScrollBeginDrag={dismiss}>
				<EditProfileImage eventData={eventData} />
				<EditEventName
					control={control}
					eventData={eventData}
					onBlurEditable={onBlurEditable}
				/>
				<EditBasicInfo
					event_uid={eventData.event.event_uid}
					startTime={eventData.event.start_time}
					endTime={eventData.event.end_time}
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
