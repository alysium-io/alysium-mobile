import { ApiIdentifier, Persona } from '@types';
import usePersistedAppState from './usePersistedAppState';

interface IUsePersona {
	personaType: Persona;
	personaId: ApiIdentifier | null;
	changePersona: (newPersonaType: Persona, newPersonaId: ApiIdentifier) => void;
}

const usePersona = (): IUsePersona => {
	const {
		personaType,
		personaId,
		set: setPersistedAppState
	} = usePersistedAppState();

	const changePersona = (
		newPersonaType: Persona,
		newPersonaId: ApiIdentifier
	) => {
		if (newPersonaType !== personaType || newPersonaId !== personaId) {
			setPersistedAppState({
				personaType,
				personaId
			});
		}
	};

	return {
		personaType,
		personaId,
		changePersona
	};
};

export default usePersona;
