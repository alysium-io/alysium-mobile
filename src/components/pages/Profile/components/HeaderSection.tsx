import { usePersona } from '@hooks';
import { Persona } from '@types';
import React from 'react';
import { Case, Switch } from 'react-if';
import UserHeaderSection from './HeaderSection.user';

const HeaderSection = () => {
	const { personaType } = usePersona();

	return (
		<Switch>
			{/* <Case condition={personaType === Persona.artist}>
				<ArtistHeaderSection />
			</Case> */}
			<Case condition={personaType === Persona.user}>
				<UserHeaderSection />
			</Case>
			{/* <Case condition={personaType === Persona.host}>
				<HostHeaderSection />
			</Case> */}
		</Switch>
	);
};

export default HeaderSection;
