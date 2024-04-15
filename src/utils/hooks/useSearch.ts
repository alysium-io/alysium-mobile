import { useSelector } from '@redux';
import { SearchItem } from '@types';
import usePersistedAppState from './usePersistedAppState';

interface IUseSearch {
	addRecentSearch: (search: SearchItem) => void;
	clearRecentSearches: () => void;
	recentSearches: SearchItem[];
}

const useSearch = (): IUseSearch => {
	const recentSearches = useSelector(
		(state) => state.persistedApp.recentSearches
	);
	const { setPersistedAppState } = usePersistedAppState();

	const addRecentSearch = (search: SearchItem) => {
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
