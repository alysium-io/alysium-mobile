import { usePersonaAppContext } from '@arch/Application/contexts/Persona.context';
import { useUserAppContext } from '@arch/Application/contexts/User.context';
import { Section, Text } from '@atomic';
import { ActiveListItem } from '@molecules';
import { Persona } from '@types';
import React from 'react';

const SelectAccountSection = () => {
	const { changePersona } = usePersonaAppContext();
	const { userData, personaId, personaType, userArtistsData } =
		useUserAppContext();

	return (
		<Section>
			<Text variant='section-header-2' marginHorizontal='m' marginBottom='m'>
				Account
			</Text>
			{userData && (
				<ActiveListItem
					key={userData.user_uid}
					onPress={() => changePersona(Persona.user, userData.user_uid)}
					titleTextProps={{
						title: '@' + userData.handle,
						titleVariant: 'paragraph',
						bottomSubtext: 'user'
					}}
					profileImageProps={{
						image: userData.profile_image?.small.key,
						defaultImageProps: {
							icon: 'user'
						}
					}}
					active={
						personaType === Persona.user && personaId === userData.user_uid
					}
				/>
			)}
			{userArtistsData.map((artist) => (
				<ActiveListItem
					key={artist.artist_uid}
					onPress={() => changePersona(Persona.artist, artist.artist_uid)}
					titleTextProps={{
						title: artist.name,
						titleVariant: 'paragraph',
						bottomSubtext: 'artist'
					}}
					profileImageProps={{
						image: artist.profile_image?.small.key,
						defaultImageProps: {
							icon: 'user'
						}
					}}
					active={
						personaType === Persona.artist && personaId === artist.artist_uid
					}
				/>
			))}
		</Section>
	);
};

export default SelectAccountSection;
