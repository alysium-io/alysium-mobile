import { usePersonaAppContext } from '@arch/Application/contexts/Persona.context';
import { useUserAppContext } from '@arch/Application/contexts/User.context';
import { Section, View } from '@atomic';
import { SectionHeader } from '@molecules';
import { ContentListItem } from '@organisms';
import { Persona } from '@types';
import React from 'react';

const SelectAccountSection = () => {
	const { userData, userArtists, userHosts, personaId, personaType } =
		useUserAppContext();
	const { changePersona } = usePersonaAppContext();
	return (
		<Section marginBottom='xl'>
			<View marginHorizontal='m'>
				<SectionHeader text='Select Account' titleVariant='large' />
			</View>
			{userData && (
				<ContentListItem
					key={userData.user_uid}
					title={'@' + userData.handle}
					subtitle={'user'}
					onPress={() => changePersona(Persona.user, userData.user_uid)}
					contentType={Persona.user}
					image={userData.profile_image?.url}
					border
					markerIcon={
						personaType === Persona.user && personaId === userData.user_uid
							? 'checkmark'
							: undefined
					}
				/>
			)}
			{userArtists.map((artist) => (
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
			))}
		</Section>
	);
};

export default SelectAccountSection;
