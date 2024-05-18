import { HeaderSafeArea, ScrollView, Separator } from '@atomic';
import { BasePage } from '@organisms';
import { CreateVenueBottomSheet } from '@popups';
import { useRoute } from '@react-navigation/native';
import { EditEventPageRouteProp } from '@types';
import React, { useCallback, useEffect } from 'react';
import CandidatesItem from './components/CandidatesItem';
import EditEventPageFooter from './components/EditEventPageFooter';
import EventDateSection from './components/EventDateSection';
import EventName from './components/EventName';
import FeaturesSection from './components/FeaturesSection';
import PrimaryImage from './components/PrimaryImage';
import SelectVenueSection from './components/SelectVenueSection';
import SummarySection from './components/SummarySection';
import useEditEventPage from './useEditEventPage';

const EditEventPage = () => {
	const route = useRoute<EditEventPageRouteProp>();
	const {
		eventData,
		venuesData,
		formMethods,
		createVenueSheetApi,
		onSubmit,
		loadForm,
		setEventProfileImage,
		onChangeVenue,
		onChangeStartTime,
		onChangeEndTime,
		onChangeDoorsOpenTime,
		goToEventCandidatesPage,
		confirmDelete
	} = useEditEventPage(route.params.eventId);

	useEffect(() => {
		loadForm();
	}, [eventData]);

	const FooterComponent = useCallback(
		() => <EditEventPageFooter onSubmit={onSubmit} />,
		[]
	);

	if (!eventData || !venuesData) {
		return null;
	}

	return (
		<BasePage FooterComponent={FooterComponent}>
			<HeaderSafeArea>
				<ScrollView>
					<PrimaryImage
						imageUrl={eventData.profile_image?.url}
						setEventProfileImage={setEventProfileImage}
					/>
					<EventName formMethods={formMethods} />
					<CandidatesItem
						goToEventCandidatesPage={goToEventCandidatesPage}
						eventData={eventData}
					/>
					<Separator size='large' marginTop='none' />
					<EventDateSection
						formMethods={formMethods}
						onChangeStartTime={onChangeStartTime}
						onChangeDoorsOpenTime={onChangeDoorsOpenTime}
						onChangeEndTime={onChangeEndTime}
					/>
					<Separator size='large' />
					<SelectVenueSection
						createVenueSheetApi={createVenueSheetApi}
						venuesData={venuesData}
						onChangeVenue={onChangeVenue}
						defaultVenueId={eventData.venue?.venue_id}
					/>
					<Separator />
					<FeaturesSection formMethods={formMethods} />
					<Separator />
					<SummarySection
						confirmDelete={confirmDelete}
						eventId={route.params.eventId}
					/>
					<CreateVenueBottomSheet sheetApi={createVenueSheetApi} />
				</ScrollView>
			</HeaderSafeArea>
		</BasePage>
	);
};

export default EditEventPage;
