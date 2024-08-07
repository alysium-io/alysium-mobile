import { usePersonaAppContext } from '@arch/Application/contexts/Persona.context';
import { useUserAppContext } from '@arch/Application/contexts/User.context';
import { Section, Text } from '@atomic';
import { ActiveListItem } from '@molecules';
import { Persona } from '@types';
import React from 'react';

const SelectAccountSection = () => {
	const { userData, personaId, personaType } = useUserAppContext();
	const { changePersona } = usePersonaAppContext();
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
			{/* {userArtists.map((artist) => (
				<ContentListItem
					key={artist.artist_uid}
					title={artist.name}
					subtitle={'artist'}
					onPress={() => changePersona(Persona.artist, artist.artist_uid)}
					contentType={Persona.artist}
					image={artist.profile_image?.url}
					border
					markerIcon={
						personaType === Persona.artist && personaId === artist.artist_uid
							? 'checkmark'
							: undefined
					}
				/>
			))}
			{userHosts.map((host) => (
				<ContentListItem
					key={host.host_uid}
					title={host.name}
					subtitle={'host'}
					onPress={() => changePersona(Persona.host, host.host_uid)}
					contentType={Persona.host}
					image={host.profile_image?.url}
					border
					markerIcon={
						personaType === Persona.host && personaId === host.host_uid
							? 'checkmark'
							: undefined
					}
				/>
			))} */}
		</Section>
	);
};

export default SelectAccountSection;
