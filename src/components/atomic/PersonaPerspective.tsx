import { useUserAppContext } from '@arch/Application/contexts/User.context';
import { ConditionalRenderer } from '@atomic';
import { Persona } from '@types';
import React from 'react';

interface PersonaPerspectiveProps {
	components: {
		[Persona.host]?: React.FC<any>;
		[Persona.user]?: React.FC<any>;
		[Persona.artist]?: React.FC<any>;
	};
}

const PersonaPerspective: React.FC<PersonaPerspectiveProps> = ({
	components
}) => {
	const { personaType } = useUserAppContext();
	return (
		<ConditionalRenderer componentKey={personaType} componentMap={components} />
	);
};

export default PersonaPerspective;
