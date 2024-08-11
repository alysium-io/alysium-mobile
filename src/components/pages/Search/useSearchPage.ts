import { SearchItem, searchApiSlice } from '@flux/api/search';
import { SearchArtistsResponseDto } from '@flux/api/search/dto/search-artists.dto';
import { SearchTagsResponseDto } from '@flux/api/search/dto/search-tags.dto';
import { SearchType } from '@flux/api/search/search.entity';
import { tagApiSlice } from '@flux/api/tag';
import { DiscoverTagsResponseDto } from '@flux/api/tag/dto/tag-discover.dto';
import { useNavigation, usePagination, usePersistedSearchState } from '@hooks';
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
	discoverTagsData?: DiscoverTagsResponseDto;
	isDiscoverTagsLoading: boolean;
	discoverTagsError: any;
	refetchDiscoverTags: () => void;
	nextArtistSearchPage: () => void;
}

const useSearchPage = (): IUseSearchPage => {
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

	const {
		data: discoverTagsData,
		isLoading: isDiscoverTagsLoading,
		error: discoverTagsError,
		refetch: refetchDiscoverTags
	} = tagApiSlice.useDiscoverQuery(undefined);

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
		discoverTagsData,
		isDiscoverTagsLoading,
		discoverTagsError,
		refetchDiscoverTags,
		nextArtistSearchPage
	};
};

export default useSearchPage;
