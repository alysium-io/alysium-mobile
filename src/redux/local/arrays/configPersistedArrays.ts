import {
	ArtistSearchItem,
	SceneSearchItem
} from '@flux/api/search/search.entity';
import { createPersistedArray } from './utils';

export const homeRecentSearchArtistsPersistedArraySlice =
	createPersistedArray<ArtistSearchItem>({
		name: 'homeRecentSearchArtists',
		limit: 50,
		compareProp: 'uid'
	});

const homeRecentSearchScenesPersistedArraySlice =
	createPersistedArray<SceneSearchItem>({
		name: 'homeRecentSearchScenes',
		limit: 50,
		compareProp: 'uid'
	});

export const persistedArrayReducers = {
	homeRecentSearchArtists: homeRecentSearchArtistsPersistedArraySlice.reducer,
	homeRecentSearchScenes: homeRecentSearchScenesPersistedArraySlice.reducer
};

export const persistedArrayActions = {
	homeRecentSearchArtists: homeRecentSearchArtistsPersistedArraySlice.actions,
	homeRecentSearchScenes: homeRecentSearchScenesPersistedArraySlice.actions
};
