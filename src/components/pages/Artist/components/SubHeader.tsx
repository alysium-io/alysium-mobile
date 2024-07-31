import { Section, Text, View } from '@atomic';
import { PublicFindOneArtistResponseDto } from '@flux/api/artist/dto/artist-find-one.dto';
import { Stats } from '@organisms';
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
		>
			<View>
				<Text variant='paragraph-medium'>Amsterdam, NE</Text>
			</View>
			<Stats
				items={[
					{
						title: artistData?.num_followers.toLocaleString() || '0',
						subtitle: 'follower' + (artistData?.num_followers === 1 ? '' : 's'),
						onPress: () => {}
					}
				]}
			/>
		</Section>
	);
};

export default SubHeader;
