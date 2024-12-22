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
import { EditEventPageRouteProp } from '@types';
import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { If, Then } from 'react-if';
import { ScrollView } from 'react-native';
import AboutSection from './components/AboutSection';
import AssetsSection from './components/AssetsSection';
import DateSection from './components/DateSection';
import HeaderSection from './components/HeaderSection';
import LocationSection from './components/LocationSection';
import EditEventPageHeader from './EditArtistEvent.header';
import { Loading } from './Loading';

const EditEventPage = () => {
	const route = useRoute<EditEventPageRouteProp>();
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
		handleSubmit,
		reset
	} = useForm<UpdateArtistEventBodyDto>({
		defaultValues: {
			name: eventData?.event.name,
			about: eventData?.event.about
		}
	});

	useEffect(() => {
		reset({
			name: eventData?.event.name,
			about: eventData?.event.about
		});
	}, [eventData]);

	const onBlurEditable = () => {
		if (isDirty) {
			handleSubmit(onSubmit)();
		}
	};

	const onSubmit = async (data: UpdateArtistEventBodyDto) => {
		updateArtistEventMutation({
			params: {
				artist_uid: artistData.artist_uid,
				event_uid: route.params.event_uid
			},
			body: data
		});
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
		return <Loading />;
	}

	return (
		<BasePage FooterComponent={FooterComponent}>
			<EditEventPageHeader
				titleProps={{
					title: eventData.event.status,
					titleProps: { color: 'text.q', variant: 'paragraph-small' }
				}}
				onPressMenu={editArtistEventPopupMenuBottomSheet.open}
			/>
			<ScrollView onScrollBeginDrag={dismiss}>
				<HeaderSection
					control={control}
					eventData={eventData}
					onBlurEditable={onBlurEditable}
				/>
				<DateSection
					event_uid={eventData.event.event_uid}
					startTime={eventData.event.start_time}
					endTime={eventData.event.end_time}
				/>
				<LocationSection eventData={eventData} />
				<AboutSection eventData={eventData} />
				<AssetsSection eventData={eventData} />
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

export default EditEventPage;
