import { useDispatch, useSelector } from '@flux';
import { transientAppSlice } from '@flux/local/transient-app';
import { TransientAppState } from '@types';

export type IUseTransientAppState = TransientAppState & {
	setTransientAppState: (state: Partial<TransientAppState>) => void;
	resetTransientAppState: () => void;
	setTransientAppStateWithDefaults: (state: Partial<TransientAppState>) => void;
	toggleSoundEnabled: () => void;
};

const useTransientAppState = (): IUseTransientAppState => {
	const dispatch = useDispatch();
	const transientApp = useSelector((state) => state.transientApp);

	const setTransientAppState = (state: Partial<TransientAppState>) => {
		dispatch(transientAppSlice.actions.set(state));
	};

	const resetTransientAppState = () => {
		dispatch(transientAppSlice.actions.reset());
	};

	const setTransientAppStateWithDefaults = (
		state: Partial<TransientAppState>
	) => {
		dispatch(transientAppSlice.actions.setWithDefaults(state));
	};

	const toggleSoundEnabled = () => {
		setTransientAppState({ soundEnabled: !transientApp.soundEnabled });
	};

	return {
		soundEnabled: transientApp.soundEnabled,
		setTransientAppState,
		resetTransientAppState,
		setTransientAppStateWithDefaults,
		toggleSoundEnabled
	};
};

export default useTransientAppState;
