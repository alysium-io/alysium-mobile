import { Section, Text } from '@atomic';
import { useSheet } from '@hooks';
import { MenuListItem } from '@molecules';
import {
	AboutAlysiumBottomSheet,
	PrivacyPolicyBottomSheet,
	TermsOfServiceBottomSheet
} from '@popups';
import React from 'react';

interface MenuSectionProps {}

const MenuSection: React.FC<MenuSectionProps> = () => {
	const termsOfServiceSheetApi = useSheet();
	const privacyPolicySheetApi = useSheet();
	const aboutAlysiumSheetApi = useSheet();

	return (
		<Section>
			<Text variant='section-header-2' marginHorizontal='m' marginBottom='m'>
				Menu
			</Text>
			<MenuListItem
				titleTextProps={{
					title: 'Alysium',
					topSubtext: 'Learn more about Alysium'
				}}
				onPress={aboutAlysiumSheetApi.open}
			/>
			<MenuListItem
				titleTextProps={{
					title: 'Terms of Service',
					topSubtext: 'Read our terms of service'
				}}
				onPress={termsOfServiceSheetApi.open}
			/>
			<MenuListItem
				titleTextProps={{
					title: 'Privacy Policy',
					topSubtext: 'Read our privacy policy'
				}}
				onPress={privacyPolicySheetApi.open}
			/>
			<PrivacyPolicyBottomSheet sheetApi={privacyPolicySheetApi} />
			<TermsOfServiceBottomSheet sheetApi={termsOfServiceSheetApi} />
			<AboutAlysiumBottomSheet sheetApi={aboutAlysiumSheetApi} />
		</Section>
	);
};

export default MenuSection;
