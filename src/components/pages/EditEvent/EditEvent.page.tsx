import { HeaderSafeArea, ScrollView, Separator } from '@atomic';
import { BasePage } from '@organisms';
import React from 'react';
import {
	EditEventPageProvider,
	useEditEventPageContext
} from './EditEvent.context';
import {
	CandidatesItem,
	CreateVenueBottomSheet,
	EditEventPageFooter,
	EventDateSection,
	EventName,
	FeaturesSection,
	PrimaryImage,
	SelectVenueSection,
	SummarySection
} from './components';

const EditEventPage = () => {
	const { eventData, loadForm, createVenueSheetApi } =
		useEditEventPageContext();

	return (
		<BasePage FooterComponent={EditEventPageFooter}>
			<HeaderSafeArea>
				<ScrollView>
					<PrimaryImage />
					<EventName />
					<CandidatesItem />
					<Separator size='large' marginTop='none' />
					<EventDateSection />
					<Separator size='large' />
					<SelectVenueSection />
					<Separator />
					<FeaturesSection />
					<Separator />
					<SummarySection />
					<CreateVenueBottomSheet sheetApi={createVenueSheetApi} />
				</ScrollView>
			</HeaderSafeArea>
		</BasePage>
	);
};

export default () => (
	<EditEventPageProvider>
		<EditEventPage />
	</EditEventPageProvider>
);
