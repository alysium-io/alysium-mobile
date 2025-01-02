import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { View } from '@atomic';
import { artistEventApiSlice } from '@flux/api/event';
import { UpdateArtistEventBodyDto } from '@flux/api/event/dto/artist-event-update.dto';
import { EventStatus } from '@flux/api/event/types';
import { useKeyboard, useSheet } from '@hooks';
import { ActionButtons } from '@molecules';
import { BasePage, ShareExternal } from '@organisms';
import { NanoId } from '@types';
import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { If, Then } from 'react-if';
import { ScrollView } from 'react-native';
import Loading from '../../Loading';
import AboutSection from './components/AboutSection';
import AssetsSection from './components/AssetsSection';
import DateSection from './components/DateSection';
import HeaderSection from './components/HeaderSection';
import LocationSection from './components/LocationSection';
import DraftEventPageHeader from './DraftEvent.header';
import ConfirmPublishEvent from './sheets/ConfirmPublishEvent';
import PopupMenu from './sheets/PopupMenu';

interface DraftEventPageProps {
	event_uid: NanoId;
	setDraftToPublished: () => void;
}

const DraftEventPage: React.FC<DraftEventPageProps> = ({
	event_uid,
	setDraftToPublished
}) => {
	const { dismiss } = useKeyboard();
	const { artistData } = useArtistAppContext();
	const confirmPublishEventSheetApi = useSheet();
	const draftEventPopupMenuBottomSheet = useSheet();
	const shareExternalSheetApi = useSheet();
	const [updateArtistEventMutation] =
		artistEventApiSlice.useUpdateArtistEventMutation();

	const { data: eventData } =
		artistEventApiSlice.usePrivateFindOneArtistEventQuery({
			params: {
				event_uid,
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
				event_uid
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
						<ConfirmPublishEvent
							sheetApi={confirmPublishEventSheetApi}
							event_uid={event_uid}
							setDraftToPublished={setDraftToPublished}
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
			<DraftEventPageHeader
				titleProps={{
					title: eventData.event.status,
					titleProps: { color: 'text.q', variant: 'paragraph-small' }
				}}
				onPressMenu={draftEventPopupMenuBottomSheet.open}
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
			<PopupMenu
				sheetApi={draftEventPopupMenuBottomSheet}
				onPressShare={() => {
					draftEventPopupMenuBottomSheet.close();
					shareExternalSheetApi.open();
				}}
				event_uid={eventData.event.event_uid}
			/>
			<ShareExternal event={eventData} sheetApi={shareExternalSheetApi} />
		</BasePage>
	);
};

export default DraftEventPage;
