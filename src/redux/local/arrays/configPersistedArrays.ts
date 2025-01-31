import { GoogleMapsAutocompleteResult } from '@flux/api/location/types';
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

const homeMapSearchCitiesPersistedArraySlice =
	createPersistedArray<GoogleMapsAutocompleteResult>({
		name: 'homeMapSearchCities',
		limit: 15,
		compareProp: 'place_id'
	});

export const persistedArrayReducers = {
	homeRecentSearchArtists: homeRecentSearchArtistsPersistedArraySlice.reducer,
	homeRecentSearchScenes: homeRecentSearchScenesPersistedArraySlice.reducer,
	homeMapSearchCities: homeMapSearchCitiesPersistedArraySlice.reducer
};

export const persistedArrayActions = {
	homeRecentSearchArtists: homeRecentSearchArtistsPersistedArraySlice.actions,
	homeRecentSearchScenes: homeRecentSearchScenesPersistedArraySlice.actions,
	homeMapSearchCities: homeMapSearchCitiesPersistedArraySlice.actions
};
