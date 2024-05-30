import { withProvider } from '@hooks';
import { Persona } from '@types';
import React from 'react';
import { Case, Switch } from 'react-if';
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
		<Switch>
			<Case condition={personaType === Persona.user}>
				<UserApp />
			</Case>
			<Case condition={personaType === Persona.host}>
				<HostApp key={Persona.host} />
			</Case>
			<Case condition={personaType === Persona.artist}>
				<ArtistApp key={Persona.artist} />
			</Case>
		</Switch>
	);
};

export default withProvider(Application, [PersonaAppProvider, UserAppProvider]);
