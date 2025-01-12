import {
	ArtistSearchItem,
	SceneSearchItem
} from '@flux/api/search/search.entity';

export type SearchState = {
	artistRecentSearches: ArtistSearchItem[];
	sceneRecentSearches: SceneSearchItem[];
};
