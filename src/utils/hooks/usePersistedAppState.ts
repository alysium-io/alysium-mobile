import { useDispatch, useSelector } from '@flux';
import { appActions } from '@flux/local/app';
import { AppState } from '@types';

export type IUsePersistedAppState = AppState & {
	setPersistedAppState: (state: Partial<AppState>) => void;
	resetPersistedAppState: () => void;
};

const usePersistedAppState = (): IUsePersistedAppState => {
	const dispatch = useDispatch();
	const persistedApp = useSelector((state) => state.persistedApp);
	const setPersistedAppState = (state: Partial<AppState>) => {
		dispatch(appActions.set(state));
	};
	const resetPersistedAppState = () => {
		dispatch(appActions.reset());
	};

	return {
		personaId: persistedApp.personaId,
		personaType: persistedApp.personaType,
		themeName: persistedApp.themeName,
		mode: persistedApp.mode,
		token: persistedApp.token,
		recentSearches: persistedApp.recentSearches,
		setPersistedAppState,
		resetPersistedAppState
	};
};

export default usePersistedAppState;
