import { Persona } from '@types';
import React from 'react';
import ArtistApp from './apps/ArtistApp';
import HostApp from './apps/HostApp';
import UserApp from './apps/UserApp';
import { UserAppProvider, usePersonaAppContext } from './contexts';
import { PersonaAppProvider } from './contexts/PersonaAppContext';

const Applications = () => {
	const { personaType, isLoading } = usePersonaAppContext();

	const getApplication = () => {
		switch (personaType) {
			case Persona.artist:
				return <ArtistApp />;
			case Persona.host:
				return <HostApp />;
			case Persona.user:
				return <UserApp />;
			default:
				return <></>;
		}
	};

	if (isLoading) {
		return <></>;
	}

	return <UserAppProvider>{getApplication()}</UserAppProvider>;
};

export default () => (
	<PersonaAppProvider>
		<Applications />
	</PersonaAppProvider>
);
