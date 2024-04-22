import { Section } from '@atomic';
import { global } from '@etc';
import { ContentListItem } from '@organisms';
import { ContentType } from '@types';
import React from 'react';

const PartiesInvolvedSection = () => {
	return (
		<Section>
			<ContentListItem
				title='EDX Nightclub'
				subtitle='Host'
				onPress={() => console.log('Pressed')}
				contentType={ContentType.host}
				image={global.sampleData.images.host}
				size='medium'
				onPressMenu={() => console.log('Pressed')}
				subtitleFirst={true}
			/>
			<ContentListItem
				title='Seth Hills'
				subtitle='Artist'
				onPress={() => console.log('Pressed')}
				contentType={ContentType.artist}
				image={global.sampleData.artistImages['seth hills']}
				size='medium'
				onPressMenu={() => console.log('Pressed')}
				subtitleFirst={true}
			/>
		</Section>
	);
};

export default PartiesInvolvedSection;
