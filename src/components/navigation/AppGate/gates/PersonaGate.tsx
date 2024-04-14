import { usePersona } from '@hooks';
import React, { useEffect } from 'react';

interface PersonaGateProps {
	children?: React.ReactNode;
}

const PersonaGate: React.FC<PersonaGateProps> = ({ children }) => {
	const { persona, loadPersona } = usePersona();

	useEffect(() => {
		loadPersona();
	}, [persona.activePersonaId, persona.activePersonaType]);

	if (persona.isLoading) return <></>;

	return children;
};

export default PersonaGate;
