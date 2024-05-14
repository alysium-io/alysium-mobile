import { Section, View } from '@atomic';
import { useNavigation } from '@hooks';
import { SectionHeader } from '@molecules';
import { ContentListItem } from '@organisms';
import { ContentType } from '@types';
import React from 'react';
import { useTagPageContext } from '../Tag.context';

const Artists = () => {
	const { tagData } = useTagPageContext();
	const { artistPage } = useNavigation();

	return (
		<Section marginTop='l'>
			<View marginHorizontal='m'>
				<SectionHeader text='Artists' />
			</View>
			{tagData.artists.map((artist, index) => (
				<ContentListItem
					key={index}
					rnk={index + 1}
					title={artist.artist.name || 'Unknown'}
					subtitle={'Los Angeles, CA'}
					onPress={() => artistPage(artist.artist_id)}
					contentType={ContentType.artist}
					image={artist.artist.profile_image?.url || ''}
					size='large'
				/>
			))}
		</Section>
	);
};

export default Artists;
