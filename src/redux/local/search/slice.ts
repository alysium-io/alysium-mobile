import {
	ArtistSearchItem,
	SceneSearchItem
} from '@flux/api/search/search.entity';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SearchState } from './types';

const initialState: SearchState = {
	artistRecentSearches: [],
	sceneRecentSearches: []
};

// Helper function to handle adding recent searches
const addRecentSearch = <T extends { uid: string }>(
	existingSearches: T[],
	newItem: T
): T[] => {
	let recentSearchesCopy = [...existingSearches];

	// First remove it if it exists
	recentSearchesCopy = recentSearchesCopy.filter(
		(item) => item.uid !== newItem.uid
	);

	// Add it to the beginning
	recentSearchesCopy.unshift(newItem);

	// Limit the array to n items
	return recentSearchesCopy.slice(0, 50);
};

const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		addArtistRecentSearch(state, action: PayloadAction<ArtistSearchItem>) {
			state.artistRecentSearches = addRecentSearch(
				state.artistRecentSearches,
				action.payload
			);
		},
		resetArtistRecentSearches(state) {
			state.artistRecentSearches = [];
		},
		addSceneRecentSearch(state, action: PayloadAction<SceneSearchItem>) {
			state.sceneRecentSearches = addRecentSearch(
				state.sceneRecentSearches,
				action.payload
			);
		},
		resetSceneRecentSearches(state) {
			state.sceneRecentSearches = [];
		}
	}
});

export const searchActions = searchSlice.actions;
export const searchReducer = searchSlice.reducer;
