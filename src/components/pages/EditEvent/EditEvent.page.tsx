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
import TicketsItem from './components/TicketsItem';
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
		confirmDelete,
		goToEditEventTicketTypesPage
	} = useEditEventPage(route.params.event_uid);

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
					<TicketsItem
						goToEditEventTicketTypesPage={goToEditEventTicketTypesPage}
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
						defaultVenueId={eventData.venue?.venue_uid}
					/>
					<Separator />
					<FeaturesSection formMethods={formMethods} />
					<Separator />
					<SummarySection
						confirmDelete={confirmDelete}
						event_uid={route.params.event_uid}
					/>
					<CreateVenueBottomSheet sheetApi={createVenueSheetApi} />
				</ScrollView>
			</HeaderSafeArea>
		</BasePage>
	);
};

export default EditEventPage;
