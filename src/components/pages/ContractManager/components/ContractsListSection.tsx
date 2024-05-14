import { Section } from '@atomic';
import { global } from '@etc';
import { ContentListItem } from '@organisms';
import { ContentType } from '@types';
import React from 'react';

const ContractsListSection = () => {
	return (
		<Section>
			{global.sampleData.sampleEvents.map((event) => (
				<ContentListItem
					key={event.id}
					title={event.name}
					subtitle={event.status}
					onPress={() => console.log('Event pressed')}
					contentType={ContentType.event}
					image={event.image}
					borderRadius='sharp'
					border
				/>
			))}
		</Section>
	);
};

export default ContractsListSection;
