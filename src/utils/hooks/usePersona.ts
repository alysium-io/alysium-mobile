import { ApiIdentifier, Persona } from '@types';
import usePersistedAppState from './usePersistedAppState';

interface IUsePersona {
	personaType: Persona;
	personaId: ApiIdentifier | null;
	changePersona: (newPersonaType: Persona, newPersonaId: ApiIdentifier) => void;
	initializePersona: (user_id: ApiIdentifier) => void;
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
			personaId: newPersonaId
		});
	};

	const initializePersona = (user_id: ApiIdentifier) => {
		/**
		 * The purpose of this is to set the persona for the first
		 * time the user opens the app. Which we are only going to
		 * do if the personaId is null. This is to prevent the persona
		 * from being reset every time the user opens the app.
		 */
		if (personaId === null) {
			setPersistedAppState({
				personaType: Persona.user,
				personaId: user_id
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
