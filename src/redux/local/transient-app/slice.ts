import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TransientAppState } from '@types';

const initialState: TransientAppState = {
	soundEnabled: false
};

const transientAppSlice = createSlice({
	name: 'transientApp',
	initialState,
	reducers: {
		set(state, action: PayloadAction<Partial<TransientAppState>>) {
			Object.entries(action.payload).forEach(([key, value]) => {
				// Here we use a type assertion to tell TypeScript that we know what we're doing.
				// This is safe as long as `TransientAppState` and `action.payload` are kept in sync in terms of types.
				(state as any)[key] = value;
			});
		},
		reset(state) {
			Object.entries(initialState).forEach(([key, value]) => {
				(state as any)[key] = value;
			});
		},
		setWithDefaults(state, action: PayloadAction<Partial<TransientAppState>>) {
			Object.entries(initialState).forEach(([key, value]) => {
				(state as any)[key] = (action.payload as any)[key] ?? value;
			});
		}
	}
});

export default transientAppSlice;
