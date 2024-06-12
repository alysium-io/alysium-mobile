import { ApiIdentifier, Persona, ThemeMode } from '@types';
import usePersistedAppState from './usePersistedAppState';

const appThemeModeMap = {
	[Persona.user]: ThemeMode.dark,
	[Persona.artist]: ThemeMode.light,
	[Persona.host]: ThemeMode.light
};

interface IUsePersona {
	personaType: Persona;
	personaId: ApiIdentifier | null;
	changePersona: (newPersonaType: Persona, newPersonaId: ApiIdentifier) => void;
	initializePersona: (user_uid: ApiIdentifier) => void;
}

const usePersona = (): IUsePersona => {
	const { personaType, personaId, setPersistedAppState } =
		usePersistedAppState();

	const changePersona = (
		newPersonaType: Persona,
		newPersonaId: ApiIdentifier
	) => {
		setPersistedAppState({
			personaType: newPersonaType,
			personaId: newPersonaId,
			mode: appThemeModeMap[newPersonaType]
		});
	};

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

	return {
		personaType,
		personaId,
		changePersona,
		initializePersona
	};
};

export default usePersona;
