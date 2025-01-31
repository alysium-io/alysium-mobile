import { useDispatch, useSelector } from '@flux';
import { homeMapActions } from '@flux/local/home-map';
import { HomeMapState } from '@flux/local/home-map/types';

export type IUsePersistedHomeMapState = HomeMapState & {
	setPersistedHomeMapState: (state: Partial<HomeMapState>) => void;
	resetPersistedHomeMapState: () => void;
	setPersistedHomeMapStateWithDefaults: (state: Partial<HomeMapState>) => void;
};

const usePersistedHomeMapState = (): IUsePersistedHomeMapState => {
	const dispatch = useDispatch();
	const persistedHomeMap = useSelector((state) => state.persistedHomeMap);
	const setPersistedHomeMapState = (state: Partial<HomeMapState>) => {
		dispatch(homeMapActions.set(state));
	};
	const resetPersistedHomeMapState = () => {
		dispatch(homeMapActions.reset());
	};
	const setPersistedHomeMapStateWithDefaults = (
		state: Partial<HomeMapState>
	) => {
		dispatch(homeMapActions.setWithDefaults(state));
	};

	return {
		region: persistedHomeMap.region,
		city: persistedHomeMap.city,
		defaultRegion: persistedHomeMap.defaultRegion,
		radius: persistedHomeMap.radius,
		setPersistedHomeMapState,
		resetPersistedHomeMapState,
		setPersistedHomeMapStateWithDefaults
	};
};

export default usePersistedHomeMapState;
