import { HeaderSafeArea, KeyboardAvoidingView, ScrollView } from '@atomic';
import { withProvider } from '@hooks';
import { BasePage } from '@organisms';
import React, { useEffect } from 'react';
import {
	EditVenuePageProvider,
	useEditVenuePageContext
} from './EditVenue.context';
import {
	AssetsSection,
	BasicInfoSection,
	ButtonsSection,
	EditVenuePageFooter,
	HeaderSection,
	LinksSection,
	VenueTypeSection
} from './components';

const EditVenuePage = () => {
	const { venueData, loadForm } = useEditVenuePageContext();

	useEffect(() => {
		loadForm();
	}, [venueData]);

	return (
		<BasePage FooterComponent={EditVenuePageFooter}>
			<HeaderSafeArea>
				<KeyboardAvoidingView>
					<ScrollView alwaysBounceVertical>
						<HeaderSection />
						<BasicInfoSection />
						<VenueTypeSection />
						<LinksSection />
						<AssetsSection />
						<ButtonsSection />
					</ScrollView>
				</KeyboardAvoidingView>
			</HeaderSafeArea>
		</BasePage>
	);
};

export default withProvider(EditVenuePage, EditVenuePageProvider);
