import { useUserAppContext } from '@arch/Application/contexts/User.context';
import { Icon, Text, View } from '@atomic';
import { usePersona } from '@hooks';
import { Persona } from '@types';
import React from 'react';


const UsernameDisplay = () => {
	const { personaType } = usePersona();
	const { user } = useUserAppContext();

	if (personaType === Persona.user) {
		return (
			<View flexDirection='row' alignItems='center'>
				<Icon name='at' size='small' color='t1' />
				<Text variant='paragraph-large-medium' marginLeft='xs'>
					{user?.email}
				</Text>
			</View>
		);
	}
	return <></>;
	// if (personaType === Persona.artist) {
	// 	return (
	// 		<View flexDirection='row' alignItems='center'>
	// 			<Text variant='paragraph-large-medium' marginLeft='xs'>
	// 				{artist.artist?.attributes.name}
	// 			</Text>
	// 		</View>
	// 	);
	// }

	// if (personaType === Persona.host) {
	// 	return (
	// 		<View flexDirection='row' alignItems='center'>
	// 			<Text variant='paragraph-large-medium' marginLeft='xs'>
	// 				{host.host?.attributes.name}
	// 			</Text>
	// 		</View>
	// 	);
	// }
};

export default UsernameDisplay;
