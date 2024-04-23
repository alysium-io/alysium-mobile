import { searchApiSlice } from '@flux/api/search';
import { Search } from '@flux/api/search/search.entity';
import { createUseContextHook, useNavigation } from '@hooks';
import { ProviderProps } from '@types';
import React, { createContext, useState } from 'react';
import useSearch from 'src/utils/hooks/useSearch';

export type SearchPageContextType = {
	searchText: string;
	setSearchText: (text: string) => void;
	searchResults: Search[] | undefined;
	isLoading: boolean;
	error: any;
	addRecentSearch: (search: Search) => void;
	clearSearchText: () => void;
	onPressSearchResult: (item: Search) => void;
	isSearchActive: boolean;
	setIsSearchActive: (isActive: boolean) => void;
	recentSearches: Search[];
};

export const SearchPageContext = createContext({} as SearchPageContextType);

export const SearchPageProvider: React.FC<ProviderProps> = ({ children }) => {
	const [isSearchActive, setIsSearchActive] = useState<boolean>(false);

	const { artistPage } = useNavigation();
	const [searchText, setSearchText] = useState<string>('');
	const clearSearchText = () => setSearchText('');

	const { addRecentSearch, recentSearches } = useSearch();

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

	return (
		<SearchPageContext.Provider
			value={{
				searchText,
				setSearchText,
				searchResults: searchResults?.hits,
				isLoading,
				error,
				addRecentSearch,
				clearSearchText,
				onPressSearchResult,
				isSearchActive,
				setIsSearchActive,
				recentSearches
			}}
		>
			{children}
		</SearchPageContext.Provider>
	);
};

export const useSearchPageContext = createUseContextHook<SearchPageContextType>(
	SearchPageContext,
	'useSearchPageContext'
);
