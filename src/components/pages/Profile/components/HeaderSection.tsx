import { ConditionalRenderer } from '@atomic';
import { usePersona } from '@hooks';
import { Persona } from '@types';
import React from 'react';
import ArtistHeaderSection from './HeaderSection.artist';
import HostHeaderSection from './HeaderSection.host';
import UserHeaderSection from './HeaderSection.user';

const HeaderSection = () => {
	const { personaType } = usePersona();

	return (
		<ConditionalRenderer
			componentKey={personaType}
			componentMap={{
				[Persona.artist]: ArtistHeaderSection,
				[Persona.user]: UserHeaderSection,
				[Persona.host]: HostHeaderSection
			}}
		/>
	);
};

export default HeaderSection;
