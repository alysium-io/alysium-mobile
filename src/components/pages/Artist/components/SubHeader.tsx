import { Section } from '@atomic';
import { Formatting } from '@etc';
import { PublicFindOneArtistResponseDto } from '@flux/api/artist/dto/artist-find-one.dto';
import { Stats } from '@organisms';
import React from 'react';

interface SubHeaderProps {
	artistData: PublicFindOneArtistResponseDto;
}

const SubHeader: React.FC<SubHeaderProps> = ({ artistData }) => {
	return (
		<Section flexDirection='row' alignItems='center' marginBottom='s'>
			<Stats
				items={[
					{
						title: Formatting.abbreviateNumber(
							artistData?.artist_spotify_data?.followers
						),
						subtitle: Formatting.getNumFollowersSuffix(
							artistData?.artist_spotify_data?.followers
						)
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
