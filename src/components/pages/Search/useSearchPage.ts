import { SearchHit, searchApiSlice } from '@flux/api/search';
import { SearchArtistsResponseDto } from '@flux/api/search/dto/search-artists.dto';
import { SearchType } from '@flux/api/search/search.entity';
import { tagApiSlice } from '@flux/api/tag';
import { DiscoverTagsResponseDto } from '@flux/api/tag/dto/tag-discover.dto';
import { useNavigation, usePersistedSearchState } from '@hooks';
import { useState } from 'react';

interface IUseSearchPage {
	searchText: string;
	isLoading: boolean;
	recentSearches: SearchHit[];
	searchResults?: SearchArtistsResponseDto;
	setSearchText: (text: string) => void;
	clearSearchText: () => void;
	isSearchActive: boolean;
	setIsSearchActive: (isActive: boolean) => void;
	onPressSearchResult: (item: SearchHit) => void;
	discoverTagsData?: DiscoverTagsResponseDto;
	isDiscoverTagsLoading: boolean;
	discoverTagsError: any;
	refetchDiscoverTags: () => void;
}

const useSearchPage = (): IUseSearchPage => {
	const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
	const { artistPage, tagPage } = useNavigation();
	const { addRecentSearch, recentSearches } = usePersistedSearchState();
	const [searchText, setSearchText] = useState<string>('');
	const clearSearchText = () => setSearchText('');

	const onPressSearchResult = (item: SearchHit) => {
		addRecentSearch(item);
		if (item.searchType === SearchType.ARTIST) {
			artistPage(item.uid);
		} else if (item.searchType === SearchType.TAG) {
			tagPage(item.uid);
		}
	};

	const {
		data: searchResults,
		isLoading,
		error
	} = searchApiSlice.useSearchTagsQuery(
		{ body: { q: searchText } },
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
		isLoading,
		recentSearches,
		searchResults,
		setSearchText,
		clearSearchText,
		isSearchActive,
		setIsSearchActive,
		onPressSearchResult,
		discoverTagsData,
		isDiscoverTagsLoading,
		discoverTagsError,
		refetchDiscoverTags
	};
};

export default useSearchPage;
