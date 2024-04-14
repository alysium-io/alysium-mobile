import { useDispatch, useSelector } from '@redux';
import { AppState } from '@types';
import { appActions } from 'src/redux/local/app';

export type IUsePersistedAppState = AppState & {
	set: (state: Partial<AppState>) => void;
	reset: () => void;
};

const usePersistedAppState = (): IUsePersistedAppState => {
	const dispatch = useDispatch();
	const persistedApp = useSelector((state) => state.persistedApp);
	const set = (state: Partial<AppState>) => {
		dispatch(appActions.set(state));
	};
	const reset = () => {
		dispatch(appActions.reset());
	};
	return {
		...persistedApp,
		reset,
		set
	};
};

export default usePersistedAppState;
