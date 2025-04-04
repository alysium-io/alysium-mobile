import { useDispatch, useSelector } from '@flux';
import { persistedAppSlice } from '@flux/local/persisted-app';
import { PersistedAppState } from '@types';

export type IUsePersistedAppState = PersistedAppState & {
	setPersistedAppState: (state: Partial<PersistedAppState>) => void;
	resetPersistedAppState: () => void;
	setPersistedAppStateWithDefaults: (state: Partial<PersistedAppState>) => void;
};

const usePersistedAppState = (): IUsePersistedAppState => {
	const dispatch = useDispatch();
	const persistedApp = useSelector((state) => state.persistedApp);
	const setPersistedAppState = (state: Partial<PersistedAppState>) => {
		dispatch(persistedAppSlice.actions.set(state));
	};
	const resetPersistedAppState = () => {
		dispatch(persistedAppSlice.actions.reset());
	};

	const setPersistedAppStateWithDefaults = (
		state: Partial<PersistedAppState>
	) => {
		dispatch(persistedAppSlice.actions.setWithDefaults(state));
	};

	return {
		personaId: persistedApp.personaId,
		personaType: persistedApp.personaType,
		themeName: persistedApp.themeName,
		themeMode: persistedApp.themeMode,
		colorModeState: persistedApp.colorModeState,
		token: persistedApp.token,
		authStage: persistedApp.authStage,
		tab: persistedApp.tab,
		setPersistedAppState,
		resetPersistedAppState,
		setPersistedAppStateWithDefaults
	};
};

export default usePersistedAppState;
