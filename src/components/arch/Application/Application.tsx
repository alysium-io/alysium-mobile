import { Persona } from '@types';
import React from 'react';
import ArtistApp from './apps/Artist.app';
import HostApp from './apps/Host.app';
import UserApp from './apps/User.app';
import {
	PersonaAppProvider,
	usePersonaAppContext
} from './contexts/Persona.context';
import { UserAppProvider } from './contexts/User.context';

const Application = () => {
	const { personaType, isLoading } = usePersonaAppContext();

	if (isLoading) {
		return <></>;
	}

	if (personaType === Persona.user) {
		return <UserApp />;
	}

	if (personaType === Persona.host) {
		return <HostApp />;
	}

	if (personaType === Persona.artist) {
		return <ArtistApp />;
	}

	return <></>;
};

export default () => (
	<PersonaAppProvider>
		<UserAppProvider>
			<Application />
		</UserAppProvider>
	</PersonaAppProvider>
);
