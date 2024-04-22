import { usePersonaAppContext } from '@arch/Application/contexts/Persona.context';
import { useUserAppContext } from '@arch/Application/contexts/User.context';
import { Section, View } from '@atomic';
import { SectionHeader } from '@molecules';
import { ContentListItem } from '@organisms';
import { Persona } from '@types';
import React from 'react';

const SelectAccountSection = () => {
	const { user } = useUserAppContext();
	const { personaType, personaId, changePersona } = usePersonaAppContext();
	return (
		<Section marginBottom='xl'>
			<View marginHorizontal='m'>
				<SectionHeader text='Select Account' titleVariant='large' />
			</View>
			{user && (
				<ContentListItem
					key={user.user_id}
					title={user.name || 'Unknown'}
					subtitle={'user'}
					onPress={() => changePersona(Persona.user, user.user_id)}
					contentType={Persona.user}
					image={'https://www.w3schools.com/howto/img_avatar.png'}
					border
					markerIcon={
						personaType === Persona.user && personaId === user.user_id
							? 'checkmark'
							: undefined
					}
				/>
			)}
			{user?.artists?.map((artist) => (
				<ContentListItem
					key={artist.artist_id}
					title={artist.name}
					subtitle={'artist'}
					onPress={() => changePersona(Persona.artist, artist.artist_id)}
					contentType={Persona.artist}
					image={
						artist.profile_image?.url ||
						'https://www.w3schools.com/howto/img_avatar.png'
					}
					border
					markerIcon={
						personaType === Persona.artist && personaId === artist.artist_id
							? 'checkmark'
							: undefined
					}
				/>
			))}
			{user?.hosts?.map((host) => (
				<ContentListItem
					key={host.host_id}
					title={host.name}
					subtitle={'host'}
					onPress={() => changePersona(Persona.host, host.host_id)}
					contentType={Persona.host}
					image={
						host.profile_image?.url ||
						'https://www.w3schools.com/howto/img_avatar.png'
					}
					border
					markerIcon={
						personaType === Persona.host && personaId === host.host_id
							? 'checkmark'
							: undefined
					}
				/>
			))}
		</Section>
	);
};

export default SelectAccountSection;
