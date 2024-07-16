import { Section, Text } from '@atomic';
import { MenuListItem } from '@molecules';
import React from 'react';

const MenuSection = () => {
	return (
		<Section>
			<Text variant='section-header-2' marginHorizontal='m' marginBottom='m'>
				Menu
			</Text>
			<MenuListItem
				titleTextProps={{
					title: 'Settings',
					topSubtext: 'Update your profile information'
				}}
				onPress={() => console.log('Settings')}
			/>
			<MenuListItem
				titleTextProps={{
					title: 'Alysium',
					topSubtext: 'Learn more about Alysium'
				}}
				onPress={() => console.log('Settings')}
			/>
			<MenuListItem
				titleTextProps={{
					title: 'Terms of Service',
					topSubtext: 'Read our terms of service'
				}}
				onPress={() => console.log('Settings')}
			/>
		</Section>
	);
};

export default MenuSection;
