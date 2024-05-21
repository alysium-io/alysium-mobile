import { HeaderSafeArea, KeyboardAvoidingView, ScrollView } from '@atomic';
import { BasePage } from '@organisms';
import { useRoute } from '@react-navigation/native';
import { EditVenuePageRouteProp } from '@types';
import React, { useCallback, useEffect } from 'react';
import AssetsSection from './components/AssetsSection';
import BasicInfoSection from './components/BasicInfoSection';
import ButtonsSection from './components/ButtonsSection';
import EditVenuePageFooter from './components/EditVenuePageFooter';
import HeaderSection from './components/HeaderSection';
import LinksSection from './components/LinksSection';
import VenueTypeSection from './components/VenueTypeSection';
import useEditVenuePage from './useEditVenuePage';

const EditVenuePage = () => {
	const route = useRoute<EditVenuePageRouteProp>();
	const {
		formMethods,
		venueData,
		loadForm,
		descriptionTextInputApi,
		streetAddressTextInputApi,
		phoneNumberTextInputApi,
		capacityTextInputApi,
		setVenueProfileImage,
		onChangeVenueType,
		createLinkSheetApi,
		confirmDelete,
		onSubmit
	} = useEditVenuePage(route.params.venueId);

	useEffect(() => {
		loadForm();
	}, [venueData]);

	const FooterComponent = useCallback(
		() => <EditVenuePageFooter onSubmit={onSubmit} />,
		[onSubmit]
	);

	if (!venueData) {
		return null;
	}

	return (
		<BasePage FooterComponent={FooterComponent}>
			<HeaderSafeArea>
				<KeyboardAvoidingView>
					<ScrollView alwaysBounceVertical>
						<HeaderSection
							formMethods={formMethods}
							venueData={venueData}
							setVenueProfileImage={setVenueProfileImage}
						/>
						<BasicInfoSection
							formMethods={formMethods}
							streetAddressTextInputApi={streetAddressTextInputApi}
							phoneNumberTextInputApi={phoneNumberTextInputApi}
							capacityTextInputApi={capacityTextInputApi}
						/>
						<VenueTypeSection
							onChangeVenueType={onChangeVenueType}
							venueData={venueData}
						/>
						<LinksSection createLinkSheetApi={createLinkSheetApi} />
						<AssetsSection
							formMethods={formMethods}
							descriptionTextInputApi={descriptionTextInputApi}
						/>
						<ButtonsSection confirmDelete={confirmDelete} />
					</ScrollView>
				</KeyboardAvoidingView>
			</HeaderSafeArea>
		</BasePage>
	);
};

export default EditVenuePage;
