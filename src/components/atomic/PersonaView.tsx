import { useUserAppContext } from '@arch/Application/contexts/User.context';
import { Persona } from '@types';
import React from 'react';

interface PersonaViewProps {
	children?: React.ReactNode;
	personaType: Persona | Persona[];
}

const PersonaView: React.FC<PersonaViewProps> = ({ children, personaType }) => {
	const { personaType: currentPersonaType } = useUserAppContext();

	if (Array.isArray(personaType)) {
		if (personaType.includes(currentPersonaType)) {
			return <>{children}</>;
		}
	} else if (personaType === currentPersonaType) {
		return <>{children}</>;
	}

	return null;
};

export default PersonaView;
