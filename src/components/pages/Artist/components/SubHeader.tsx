import { Section, Text, View } from '@atomic';
import { Formatting } from '@etc';
import { PublicFindOneArtistResponseDto } from '@flux/api/artist/dto/artist-find-one.dto';
import { useNavigation } from '@hooks';
import { Stats } from '@organisms';
import { ArtistContactsAndLinks } from '@templates';
import React from 'react';
import { Else, If, Then } from 'react-if';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface SubHeaderProps {
	artistData: PublicFindOneArtistResponseDto;
}

const SubHeader: React.FC<SubHeaderProps> = ({ artistData }) => {
	const { scenePage } = useNavigation();

	const onPressScene = () => {
		if (artistData?.scene) {
			scenePage(artistData.scene.scene.scene_uid, {
				to: 'ScenePage',
				to_uid: artistData.scene.scene.scene_uid,
				from: 'ArtistPage',
				from_uid: artistData.artist_uid,
				using: 'ARTIST_SCENE_LINK'
			});
		}
	};

	return (
		<Section marginBottom='s'>
			<View
				flexDirection='row'
				justifyContent='space-between'
				alignItems='center'
			>
				<View>
					<If condition={!!artistData?.scene}>
						<Then>
							<TouchableOpacity onPress={onPressScene}>
								<View>
									<Text variant='paragraph-medium' marginBottom='xs'>
										{artistData.scene?.scene.name}
									</Text>
									<Text variant='paragraph-small' color='text.t'>
										{artistData.scene?.scene.country}
									</Text>
								</View>
							</TouchableOpacity>
						</Then>
						<Else>
							<Text variant='paragraph-medium' marginBottom='xs'>
								No Location
							</Text>
						</Else>
					</If>
				</View>
				<Stats
					items={[
						{
							title: Formatting.abbreviateNumber(artistData?.num_followers),
							subtitle: Formatting.getNumFollowersSuffix(
								artistData?.num_followers
							)
						},
						{
							title: Formatting.abbreviateNumber(artistData?.num_events),
							subtitle: 'event' + (artistData?.num_events === 1 ? '' : 's')
						}
					]}
				/>
			</View>
			{artistData.bio && (
				<View width='60%' marginTop='s'>
					<Text variant='paragraph-small' color='text.s'>
						{artistData.bio}
					</Text>
				</View>
			)}
			<ArtistContactsAndLinks artist_uid={artistData.artist_uid} />
		</Section>
	);
};

export default SubHeader;
