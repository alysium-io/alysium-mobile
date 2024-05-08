import { useUserAppContext } from '@arch/Application/contexts/User.context';
import { Icon, Text, View } from '@atomic';
import { Persona } from '@types';
import React from 'react';

const UsernameDisplay = () => {
	const { userData, personaType } = useUserAppContext();

	if (personaType === Persona.user) {
		return (
			<View flexDirection='row' alignItems='center'>
				<Icon name='at' size='small' color='t1' />
				<Text variant='paragraph-medium' marginLeft='xs'>
					{userData.handle}
				</Text>
			</View>
		);
	}

	return null;
};

export default UsernameDisplay;
