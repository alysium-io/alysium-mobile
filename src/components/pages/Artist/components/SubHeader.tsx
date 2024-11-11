import { Section, Text, View } from '@atomic';
import { Formatting } from '@etc';
import { PublicFindOneArtistResponseDto } from '@flux/api/artist/dto/artist-find-one.dto';
import { Stats } from '@organisms';
import React from 'react';
import { TouchableOpacity } from 'react-native';

interface SubHeaderProps {
	artistData: PublicFindOneArtistResponseDto;
}

const SubHeader: React.FC<SubHeaderProps> = ({ artistData }) => {
	return (
		<Section marginBottom='s'>
			<View
				flexDirection='row'
				justifyContent='space-between'
				alignItems='center'
				marginBottom='m'
			>
				<View>
					{artistData?.scene ? (
						<TouchableOpacity>
							<View>
								<Text variant='paragraph-medium' marginBottom='xs'>
									{artistData.scene?.scene.name}
								</Text>
								<Text variant='paragraph-small' color='text.t'>
									{artistData.scene?.scene.country}
								</Text>
							</View>
						</TouchableOpacity>
					) : (
						<Text variant='paragraph-medium' marginBottom='xs'>
							No Location
						</Text>
					)}
				</View>
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
			</View>
			<View width='75%'>
				<Text variant='paragraph-small'>{artistData.bio}</Text>
			</View>
		</Section>
	);
};

export default SubHeader;
