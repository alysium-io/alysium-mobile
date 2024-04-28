import { useDispatch, useSelector } from '@flux';
import { Search } from '@flux/api/search';
import { searchActions } from '@flux/local/search';
import { SearchState } from '@flux/local/search/types';

export type IUsePersistedSearchState = SearchState & {
	addRecentSearch: (search: Search) => void;
	resetRecentSearches: () => void;
};

const usePersistedSearchState = (): IUsePersistedSearchState => {
	const dispatch = useDispatch();
	const persistedSearch = useSelector((state) => state.persistedSearch);

	const addRecentSearch = (search: Search) => {
		dispatch(searchActions.addRecentSearch(search));
	};

	const resetRecentSearches = () => {
		dispatch(searchActions.resetRecentSearches());
	};

	return {
		recentSearches: persistedSearch.recentSearches,
		addRecentSearch,
		resetRecentSearches
	};
};

export default usePersistedSearchState;
