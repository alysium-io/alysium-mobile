import { Section } from '@atomic';
import { SheetApi } from '@hooks';
import { SectionHeader } from '@molecules';
import { MenuListItem } from '@organisms';
import React from 'react';
import CreateLinkBottomSheet from './CreateLinkBottomSheet';

interface LinksSectionProps {
	createLinkSheetApi: SheetApi;
}

const LinksSection: React.FC<LinksSectionProps> = ({ createLinkSheetApi }) => {
	return (
		<>
			<Section>
				<SectionHeader margin='m' text='Links' />
				<MenuListItem
					title='Create'
					secondaryText='www.example.com'
					onPress={() => createLinkSheetApi.open()}
					secondaryTextProps={{ color: 't3' }}
					icon='plus'
					border
				/>
				<MenuListItem
					title='Google'
					secondaryText='https://www.google.com'
					onPress={() => console.log('Share')}
					border
				/>
				<MenuListItem
					title='Facebook Something super long'
					secondaryText='https://www.facebook.comfjdsklfjdslkfjkdsjfjslkd'
					onPress={() => console.log('Share')}
					border
				/>
			</Section>
			<CreateLinkBottomSheet sheetApi={createLinkSheetApi} />
		</>
	);
};

export default LinksSection;
