import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SearchItem, SearchState } from '@types';

const initialState: SearchState = {
	error: null,
	recentSearches: [],
	searchResults: [],
	searchText: '',
	isSearchActive: false
};

const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		setSearchText: (state, action: PayloadAction<string>) => {
			state.searchText = action.payload;
		},
		clearSearchText: (state) => {
			state.searchText = '';
		},
		clearRecentSearches: (state) => {
			state.recentSearches = [];
		},
		setSearchResults: (state, action) => {
			state.searchResults = action.payload;
		},
		addRecentSearch: (state, action: PayloadAction<SearchItem>) => {
			// First remove it if it exists
			state.recentSearches = state.recentSearches.filter(
				(item) => item.id !== action.payload.id
			);

			// Add it to the beginning
			state.recentSearches.unshift(action.payload);

			// Limit the array to 10 items
			if (state.recentSearches.length > 50) {
				state.recentSearches.pop();
			}
		},
		deleteRecentSearch: (state, action: PayloadAction<number>) => {
			state.recentSearches = state.recentSearches.filter(
				(item) => item.id !== action.payload
			);
		},
		setIsSearchActive: (state, action: PayloadAction<boolean>) => {
			state.isSearchActive = action.payload;
		}
	}
});

export const searchReducer = searchSlice.reducer;

export const {
	clearRecentSearches,
	setSearchResults,
	addRecentSearch,
	deleteRecentSearch,
	setSearchText,
	clearSearchText,
	setIsSearchActive
} = searchSlice.actions;
