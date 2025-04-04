import { FALLBACK_TAB } from '@arch/Application/apps/useAppSettings';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthStage, PersistedAppState, Persona, ThemeMode } from '@types';

const initialState: PersistedAppState = {
	token: null,
	personaType: Persona.user,
	personaId: null,
	themeName: 'alysium',
	themeMode: ThemeMode.dark,
	colorModeState: 'default',
	authStage: AuthStage.loading,
	tab: FALLBACK_TAB
};

const persistedAppSlice = createSlice({
	name: 'persistedApp',
	initialState,
	reducers: {
		set(state, action: PayloadAction<Partial<PersistedAppState>>) {
			Object.entries(action.payload).forEach(([key, value]) => {
				// Here we use a type assertion to tell TypeScript that we know what we're doing.
				// This is safe as long as `AppState` and `action.payload` are kept in sync in terms of types.
				(state as any)[key] = value;
			});
		},
		reset(state) {
			Object.entries(initialState).forEach(([key, value]) => {
				(state as any)[key] = value;
			});
		},
		setWithDefaults(state, action: PayloadAction<Partial<PersistedAppState>>) {
			Object.entries(initialState).forEach(([key, value]) => {
				(state as any)[key] = (action.payload as any)[key] ?? value;
			});
		}
	}
});

export default persistedAppSlice;
