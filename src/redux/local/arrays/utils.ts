import { Draft, PayloadAction, createSlice } from '@reduxjs/toolkit';
import configurePersistor from '../utils/configurePersistor';

export interface PersistedArrayState<T> {
	items: T[];
	limit: number;
}

export type CreatePersistedArrayConfig<T> = {
	name: string;
	limit?: number;
	compareProp?: keyof T;
};

export function createPersistedArray<T>({
	name,
	limit = 50,
	compareProp
}: CreatePersistedArrayConfig<T>) {
	const initialState: PersistedArrayState<T> = {
		items: [],
		limit
	};

	const slice = createSlice({
		name,
		initialState,
		reducers: {
			add: (state, action: PayloadAction<T>) => {
				const existingIndex = state.items.findIndex(
					(item) =>
						item[compareProp as keyof Draft<T>] ===
						action.payload[compareProp as keyof T]
				);

				if (existingIndex !== -1) {
					state.items.splice(existingIndex, 1);
				}

				state.items.unshift(action.payload as Draft<T>);
				state.items = state.items.slice(0, limit);
			},
			remove: (state, action: PayloadAction<T>) => {
				const existingIndex = state.items.findIndex(
					(item) =>
						item[compareProp as keyof Draft<T>] ===
						action.payload[compareProp as keyof T]
				);
				if (existingIndex !== -1) {
					state.items.splice(existingIndex, 1);
				}
			},
			reset: (state) => {
				state.items = [];
			}
		}
	});

	return {
		name: slice.name,
		slice,
		actions: slice.actions,
		reducer: configurePersistor<PersistedArrayState<T>>(
			name,
			['items'],
			slice.reducer
		)
	};
}
