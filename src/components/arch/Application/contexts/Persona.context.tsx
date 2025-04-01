import { createUseContextHook } from '@hooks';
import { NanoId, Persona, ProviderProps } from '@types';
import React, { createContext, useState } from 'react';
import usePersistedAppState from 'src/utils/hooks/usePersistedAppState';

// This is also part of the app color theme state context, but we're
// not using it here because we're not using the app theme mode.
// const appThemeModeMap = {
// 	[Persona.user]: ThemeMode.dark,
// 	[Persona.artist]: ThemeMode.light
// };

export type PersonaAppContextType = {
	personaId: NanoId | null;
	personaType: Persona;
	changePersona: (newPersonaType: Persona, newPersonaId: NanoId) => void;
	initializePersona: (user_uid: NanoId) => void;
	isPersonaLoading: boolean;
	setIsPersonaLoading: (isLoading: boolean) => void;
};

export const PersonaAppContext = createContext({} as PersonaAppContextType);

export const PersonaAppProvider: React.FC<ProviderProps> = ({ children }) => {
	const [isPersonaLoading, setIsPersonaLoading] = useState(false);
	const { personaId, personaType, setPersistedAppState } =
		usePersistedAppState();

	const initializePersona = (user_uid: NanoId) => {
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

	const changePersona = (newPersonaType: Persona, newPersonaId: NanoId) => {
		if (newPersonaType !== personaType || newPersonaId !== personaId) {
			setIsPersonaLoading(true);
			setPersistedAppState({
				personaType: newPersonaType,
				personaId: newPersonaId
				// Removing this for now, this is how we would change the theme mode
				// depending on whether we were in the fan or artist apps. This is
				// confusing i guess, so we're gunna go without it for now, but we'll
				// leave it in here just in case.
				// themeMode: appThemeModeMap[newPersonaType]
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
