import { createUseContextHook } from '@hooks';
import { ApiIdentifier, Persona, ProviderProps, ThemeMode } from '@types';
import React, { createContext, useState } from 'react';
import usePersistedAppState from 'src/utils/hooks/usePersistedAppState';

const appThemeModeMap = {
	[Persona.user]: ThemeMode.dark,
	[Persona.artist]: ThemeMode.light,
	[Persona.host]: ThemeMode.light
};

export type PersonaAppContextType = {
	personaId: ApiIdentifier | null;
	personaType: Persona;
	changePersona: (newPersonaType: Persona, newPersonaId: ApiIdentifier) => void;
	initializePersona: (user_uid: ApiIdentifier) => void;
	isPersonaLoading: boolean;
	setIsPersonaLoading: (isLoading: boolean) => void;
};

export const PersonaAppContext = createContext({} as PersonaAppContextType);

export const PersonaAppProvider: React.FC<ProviderProps> = ({ children }) => {
	const [isPersonaLoading, setIsPersonaLoading] = useState(false);
	const { personaId, personaType, setPersistedAppState } =
		usePersistedAppState();

	const initializePersona = (user_uid: ApiIdentifier) => {
		/**
		 * The purpose of this is to set the persona for the first
		 * time the user opens the app. Which we are only going to
		 * do if the personaId is null. This is to prevent the persona
		 * from being reset every time the user opens the app.
		 */
		if (personaId === null) {
			setPersistedAppState({
				personaType: Persona.user,
				personaId: user_uid
			});
		}
	};

	const changePersona = (
		newPersonaType: Persona,
		newPersonaId: ApiIdentifier
	) => {
		if (newPersonaType !== personaType || newPersonaId !== personaId) {
			setIsPersonaLoading(true);
			setPersistedAppState({
				personaType: newPersonaType,
				personaId: newPersonaId,
				themeMode: appThemeModeMap[newPersonaType]
			});
			setTimeout(() => {
				setIsPersonaLoading(false);
			}, 300);
		}
	};

	return (
		<PersonaAppContext.Provider
			value={{
				personaId,
				personaType,
				changePersona,
				initializePersona,
				isPersonaLoading,
				setIsPersonaLoading
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
