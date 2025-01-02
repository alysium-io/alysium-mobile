import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { Avatar, Icon, Section, Text, View } from '@atomic';
import { Stats } from '@organisms';
import { ArtistContactsAndLinks } from '@templates';
import React from 'react';

const HeaderSection = () => {
	const { artistData } = useArtistAppContext();

	return (
		<Section margin='m' marginTop='xl' marginBottom='none'>
			<View
				flexDirection='row'
				alignItems='center'
				justifyContent='space-between'
				marginBottom='m'
			>
				<View height={100} width={100}>
					<Avatar image={artistData.profile_image?.small.key} />
				</View>
				<Stats
					items={[
						{
							title: artistData.num_followers?.toLocaleString() ?? '0',
							subtitle: 'followers'
						},
						{
							title: artistData.num_events?.toLocaleString() ?? '0',
							subtitle: 'events'
						}
					]}
				/>
			</View>
			<View>
				<Text variant='paragraph-large-medium' marginBottom='s'>
					{artistData.name}
				</Text>
				<Text variant='paragraph' color='text.s' marginBottom='s'>
					{artistData.bio}
				</Text>
				<View flexDirection='row' alignItems='center' marginBottom='s'>
					<Icon name='location' size='m' color='text.s' />
					<Text variant='paragraph' marginLeft='s' color='text.s'>
						{artistData.scene?.scene.name ?? 'No Location'}
					</Text>
				</View>
				<ArtistContactsAndLinks artist_uid={artistData.artist_uid} />
			</View>
		</Section>
	);
};

export default HeaderSection;
