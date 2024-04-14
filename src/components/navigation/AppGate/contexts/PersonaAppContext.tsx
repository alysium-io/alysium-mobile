import { createUseContextHook } from '@etc';
import { usePersona } from '@hooks';
import { ApiIdentifier, Persona, ProviderProps } from '@types';
import React, { createContext, useState } from 'react';
import usePersistedAppState from 'src/utils/hooks/usePersistedAppState';

export type PersonaAppContextType = {
	personaId: ApiIdentifier | null;
	personaType: Persona;
	changePersona: (newPersonaType: Persona, newPersonaId: ApiIdentifier) => void;
	isLoading: boolean;
};

export const PersonaAppContext = createContext({} as PersonaAppContextType);

export const PersonaAppProvider: React.FC<ProviderProps> = ({ children }) => {
	const { changePersona: setNewPersona } = usePersona();

	const [isLoading, setIsLoading] = useState(false);

	const { personaId, personaType } = usePersistedAppState();

	const changePersona = (
		newPersonaType: Persona,
		newPersonaId: ApiIdentifier
	) => {
		if (newPersonaType !== personaType || newPersonaId !== personaId) {
			setIsLoading(true);
			setNewPersona(newPersonaType, newPersonaId);
			setTimeout(() => {
				setIsLoading(false);
			}, 500);
		}
	};

	return (
		<PersonaAppContext.Provider
			value={{
				personaId,
				personaType,
				changePersona,
				isLoading
			}}
		>
			{children}
		</PersonaAppContext.Provider>
	);
};

export const usePersonaAppContext = createUseContextHook<PersonaAppContextType>(
	PersonaAppContext,
	'PersonaAppContext'
);
