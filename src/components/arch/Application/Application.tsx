import { ConditionalRenderer } from '@atomic';
import { withProvider } from '@hooks';
import { Persona } from '@types';
import React from 'react';
import ArtistApp from './apps/Artist.app';
import HostApp from './apps/Host.app';
import UserApp from './apps/User.app';
import { ArtistAppProvider } from './contexts/Artist.context';
import { HostAppProvider } from './contexts/Host.context';
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
				[Persona.host]: () => (
					<HostAppProvider>
						<HostApp />
					</HostAppProvider>
				),
				[Persona.artist]: () => (
					<ArtistAppProvider>
						<ArtistApp />
					</ArtistAppProvider>
				)
			}}
		/>
	);
};

export default withProvider(Application, [PersonaAppProvider, UserAppProvider]);
