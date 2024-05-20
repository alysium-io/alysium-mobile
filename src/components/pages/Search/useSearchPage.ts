import { Search, searchApiSlice } from '@flux/api/search';
import { SearchArtistsResponseDto } from '@flux/api/search/dto/search-artists.dto';
import { useNavigation, usePersistedSearchState } from '@hooks';
import { useState } from 'react';

interface IUseSearchPage {
	searchText: string;
	isLoading: boolean;
	recentSearches: Search[];
	searchResults?: SearchArtistsResponseDto;
	setSearchText: (text: string) => void;
	clearSearchText: () => void;
	isSearchActive: boolean;
	setIsSearchActive: (isActive: boolean) => void;
	onPressSearchResult: (item: Search) => void;
}

const useSearchPage = (): IUseSearchPage => {
	const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
	const { artistPage } = useNavigation();
	const { addRecentSearch, recentSearches } = usePersistedSearchState();
	const [searchText, setSearchText] = useState<string>('');
	const clearSearchText = () => setSearchText('');

	const onPressSearchResult = (item: Search) => {
		addRecentSearch(item);
		artistPage(item.id);
	};

	const {
		data: searchResults,
		isLoading,
		error
	} = searchApiSlice.useSearchArtistsQuery(
		{ body: { q: searchText } },
		{ skip: searchText.length === 0 }
	);

	return {
		searchText,
		isLoading,
		recentSearches,
		searchResults,
		setSearchText,
		clearSearchText,
		isSearchActive,
		setIsSearchActive,
		onPressSearchResult
	};
};

export default useSearchPage;
