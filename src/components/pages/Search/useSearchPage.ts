import { SearchItem, searchApiSlice } from '@flux/api/search';
import { SearchArtistsResponseDto } from '@flux/api/search/dto/search-artists.dto';
import { SearchTagsResponseDto } from '@flux/api/search/dto/search-tags.dto';
import { SearchType } from '@flux/api/search/search.entity';
import {
	SequenceApi,
	useNavigation,
	usePagination,
	usePersistedSearchState,
	useSequence
} from '@hooks';
import { useState } from 'react';

interface IUseSearchPage {
	searchText: string;
	isLoading: boolean;
	recentSearches: SearchItem[];
	artistSearchResults?: SearchArtistsResponseDto;
	tagSearchResults?: SearchTagsResponseDto;
	setSearchText: (text: string) => void;
	clearSearchText: () => void;
	isSearchActive: boolean;
	setIsSearchActive: (isActive: boolean) => void;
	onPressSearchResult: (item: SearchItem) => void;
	nextArtistSearchPage: () => void;
	activeSearchTypeSequenceApi: SequenceApi;
}

const useSearchPage = (): IUseSearchPage => {
	const activeSearchTypeSequenceApi = useSequence(2);
	const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
	const { artistPage, tagPage } = useNavigation();
	const { addRecentSearch, recentSearches } = usePersistedSearchState();
	const [searchText, setSearchText] = useState<string>('');
	const clearSearchText = () => setSearchText('');

	const onPressSearchResult = (item: SearchItem) => {
		addRecentSearch(item);
		if (item.searchType === SearchType.ARTIST) {
			artistPage(item.uid);
		} else if (item.searchType === SearchType.TAG) {
			tagPage(item.uid);
		}
	};

	const {
		page: artistSearchPage,
		nextPage: nextArtistSearchPage,
		defaultLimit: artistSearchDefaultLimit
	} = usePagination();

	const {
		data: tagSearchResults,
		isLoading: isLoadingTagSearchResults,
		error: tagSearchResultsError
	} = searchApiSlice.useSearchTagsQuery(
		{
			body: { q: searchText },
			query: { page: 1, limit: 4 }
		},
		{ skip: searchText.length === 0 }
	);

	const {
		data: artistSearchResults,
		isLoading: isLoadingArtistSearchResults,
		error: artistSearchResultsError
	} = searchApiSlice.useSearchArtistsQuery(
		{
			body: { q: searchText },
			query: {
				page: artistSearchPage,
				limit: artistSearchDefaultLimit
			}
		},
		{ skip: searchText.length === 0 }
	);

	return {
		searchText,
		isLoading: isLoadingTagSearchResults && isLoadingArtistSearchResults,
		recentSearches,
		artistSearchResults,
		tagSearchResults,
		setSearchText,
		clearSearchText,
		isSearchActive,
		setIsSearchActive,
		onPressSearchResult,
		nextArtistSearchPage,
		activeSearchTypeSequenceApi
	};
};

export default useSearchPage;
