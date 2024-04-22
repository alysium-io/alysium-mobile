import { Section, View } from '@atomic';
import { global } from '@etc';
import { SectionHeader } from '@molecules';
import { ContentListItemToggler } from '@organisms';
import React from 'react';

const SelectEventSection = () => {
	return (
		<Section>
			<View margin='m'>
				<SectionHeader text='Select Event' titleVariant='large' />
			</View>
			<ContentListItemToggler
				defaultId={1}
				subtitleFirst={true}
				items={[
					{
						id: 1,
						image: global.sampleData.venueImages[0],
						title: 'EDX Tuesdays',
						subtitle: 'Tuesday Jan. 23rd',
						onPress: () => console.log('Pressed')
					},
					{
						id: 2,
						image: global.sampleData.venueImages[1],
						title: 'Sub Sessions',
						subtitle: 'Thursday October 12th',
						onPress: () => console.log('Pressed')
					},
					{
						id: 3,
						image: global.sampleData.venueImages[2],
						title: 'EDX Thursdays',
						subtitle: 'Friday November 3rd',
						onPress: () => console.log('Pressed')
					}
				]}
			/>
		</Section>
	);
};

export default SelectEventSection;
