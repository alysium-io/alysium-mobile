import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HomeMapState } from './types';

// Default location for Los Angeles
const DEFAULT_LATITUDE = 34.052235;
const DEFAULT_LONGITUDE = -118.243683;

// Default latitude and longitude delta
const DEFAULT_LAT_LNG_DELTA = 0.35;

const defaultRegion = {
	latitude: DEFAULT_LATITUDE,
	longitude: DEFAULT_LONGITUDE,
	latitudeDelta: DEFAULT_LAT_LNG_DELTA,
	longitudeDelta: DEFAULT_LAT_LNG_DELTA
};

const initialState: HomeMapState = {
	radius: 0,
	defaultRegion,
	region: defaultRegion,
	city: null
};

const homeMapSlice = createSlice({
	name: 'homeMap',
	initialState,
	reducers: {
		set(state, action: PayloadAction<Partial<HomeMapState>>) {
			Object.entries(action.payload).forEach(([key, value]) => {
				// Here we use a type assertion to tell TypeScript that we know what we're doing.
				// This is safe as long as `HomeMapState` and `action.payload` are kept in sync in terms of types.
				(state as any)[key] = value;
			});
		},
		reset(state) {
			Object.entries(initialState).forEach(([key, value]) => {
				(state as any)[key] = value;
			});
		},
		setWithDefaults(state, action: PayloadAction<Partial<HomeMapState>>) {
			Object.entries(initialState).forEach(([key, value]) => {
				(state as any)[key] = (action.payload as any)[key] ?? value;
			});
		}
	}
});

export const homeMapActions = homeMapSlice.actions;
export const homeMapReducer = homeMapSlice.reducer;
