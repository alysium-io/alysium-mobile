import { usePersona } from '@hooks';
import { Persona } from '@types';
import React from 'react';
import ArtistApp from './apps/ArtistApp';
import HostApp from './apps/HostApp';
import UserApp from './apps/UserApp';
import { UserAppProvider } from './contexts';

const Applications = () => {
	const { personaType } = usePersona();

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

	return <UserAppProvider>{getApplication()}</UserAppProvider>;
};

export default Applications;
