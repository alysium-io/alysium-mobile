import { ConditionalRenderer } from '@atomic';
import { withProvider } from '@hooks';
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

	return (
		<ConditionalRenderer
			componentKey={personaType}
			componentMap={{
				[Persona.user]: UserApp,
				[Persona.host]: HostApp,
				[Persona.artist]: ArtistApp
			}}
		/>
	);
};

export default withProvider(Application, [PersonaAppProvider, UserAppProvider]);
