import { Section, Text } from '@atomic';
import { SheetApi } from '@hooks';
import { MenuListItem } from '@molecules';
import React from 'react';

interface MenuSectionProps {
	termsOfServiceSheetApi: SheetApi;
	privacyPolicySheetApi: SheetApi;
	aboutAlysiumSheetApi: SheetApi;
}

const MenuSection: React.FC<MenuSectionProps> = ({
	termsOfServiceSheetApi,
	privacyPolicySheetApi,
	aboutAlysiumSheetApi
}) => {
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
		</Section>
	);
};

export default MenuSection;
