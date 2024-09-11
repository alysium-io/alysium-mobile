import { Section, Text, View } from '@atomic';
import { PublicFindOneArtistResponseDto } from '@flux/api/artist/dto/artist-find-one.dto';
import { Stats } from '@organisms';
import { formatNumber } from '@src/etc/numeral';
import React from 'react';

interface SubHeaderProps {
	artistData: PublicFindOneArtistResponseDto;
}

const SubHeader: React.FC<SubHeaderProps> = ({ artistData }) => {
	return (
		<Section
			flexDirection='row'
			alignItems='center'
			justifyContent='space-between'
			marginBottom='s'
		>
			<View>
				<Text variant='paragraph-medium'>Amsterdam, NE</Text>
			</View>
			<Stats
				items={[
					{
						title: formatNumber(artistData?.artist_spotify_data.followers || 0),
						subtitle:
							'follower' +
							(artistData?.artist_spotify_data.followers === 1 ? '' : 's'),
						onPress: () => {}
					},
					{
						title: '#' + artistData?.artist_rank.toLocaleString(),
						subtitle: 'rank'
					}
				]}
			/>
		</Section>
	);
};

export default SubHeader;
