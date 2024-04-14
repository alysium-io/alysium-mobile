import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiIdentifier, Persona, PersonaState } from '@types';

const initialState: PersonaState = {
	activePersonaType: Persona.user,
	activePersonaId: null,
	isLoading: true
};

const personaSlice = createSlice({
	name: 'persona',
	initialState,
	reducers: {
		setPersona: (
			state,
			action: PayloadAction<{
				personaId: ApiIdentifier;
				personaType: Persona;
			}>
		) => {
			state.activePersonaType = action.payload.personaType;
			state.activePersonaId = action.payload.personaId;
		},
		setIsLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload;
		},
		resetPersona: (state) => {
			state = initialState;
		}
	}
});

export const personaReducer = personaSlice.reducer;
export const personaActions = personaSlice.actions;
