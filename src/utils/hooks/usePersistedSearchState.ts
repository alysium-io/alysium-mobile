import { useDispatch, useSelector } from '@flux';
import {
	ArtistSearchItem,
	SceneSearchItem
} from '@flux/api/search/search.entity';
import { searchActions } from '@flux/local/search';
import { SearchState } from '@flux/local/search/types';

export type IUsePersistedSearchState = SearchState & {
	addArtistRecentSearch: (search: ArtistSearchItem) => void;
	resetArtistRecentSearches: () => void;
	addSceneRecentSearch: (search: SceneSearchItem) => void;
	resetSceneRecentSearches: () => void;
	isArtistRecentSearchesEmpty: boolean;
	isSceneRecentSearchesEmpty: boolean;
};

const usePersistedSearchState = (): IUsePersistedSearchState => {
	const dispatch = useDispatch();
	const persistedSearch = useSelector((state) => state.persistedSearch);

	const addArtistRecentSearch = (search: ArtistSearchItem) => {
		dispatch(searchActions.addArtistRecentSearch(search));
	};

	const resetArtistRecentSearches = () => {
		dispatch(searchActions.resetArtistRecentSearches());
	};

	const addSceneRecentSearch = (search: SceneSearchItem) => {
		dispatch(searchActions.addSceneRecentSearch(search));
	};

	const resetSceneRecentSearches = () => {
		dispatch(searchActions.resetSceneRecentSearches());
	};

	return {
		artistRecentSearches: persistedSearch.artistRecentSearches,
		sceneRecentSearches: persistedSearch.sceneRecentSearches,
		addArtistRecentSearch,
		resetArtistRecentSearches,
		addSceneRecentSearch,
		resetSceneRecentSearches,
		isArtistRecentSearchesEmpty:
			persistedSearch.artistRecentSearches.length === 0,
		isSceneRecentSearchesEmpty: persistedSearch.sceneRecentSearches.length === 0
	};
};

export default usePersistedSearchState;
