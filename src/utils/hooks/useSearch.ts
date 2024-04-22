import { useSelector } from '@flux';
import { Search } from '@flux/api/search';
import usePersistedAppState from './usePersistedAppState';

interface IUseSearch {
	addRecentSearch: (search: Search) => void;
	clearRecentSearches: () => void;
	recentSearches: Search[];
}

const useSearch = (): IUseSearch => {
	const recentSearches = useSelector(
		(state) => state.persistedApp.recentSearches
	);
	const { setPersistedAppState } = usePersistedAppState();

	const addRecentSearch = (search: Search) => {
		let recentSearchesCopy = [...recentSearches];

		// First remove it if it exists
		recentSearchesCopy = recentSearches.filter((item) => item.id !== search.id);

		// Add it to the beginning
		recentSearchesCopy.unshift(search);

		// Limit the array to n items
		recentSearchesCopy = recentSearchesCopy.slice(0, 50);

		// Set the new persisted app state
		setPersistedAppState({ recentSearches: recentSearchesCopy });
	};

	const clearRecentSearches = () => {
		setPersistedAppState({ recentSearches: [] });
	};

	return {
		addRecentSearch,
		clearRecentSearches,
		recentSearches
	};
};

export default useSearch;
