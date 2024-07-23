import { SearchHit } from '@flux/api/search';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SearchState } from './types';

const initialState: SearchState = {
	recentSearches: []
};

const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		addRecentSearch(state, action: PayloadAction<SearchHit>) {
			let recentSearchesCopy = [...state.recentSearches];

			// First remove it if it exists
			recentSearchesCopy = recentSearchesCopy.filter(
				(item) => item.uid !== action.payload.uid
			);

			// Add it to the beginning
			recentSearchesCopy.unshift(action.payload);

			// Limit the array to n items
			recentSearchesCopy = recentSearchesCopy.slice(0, 50);

			state.recentSearches = recentSearchesCopy;
		},
		resetRecentSearches(state) {
			state.recentSearches = [];
		}
	}
});

export const searchActions = searchSlice.actions;
export const searchReducer = searchSlice.reducer;
