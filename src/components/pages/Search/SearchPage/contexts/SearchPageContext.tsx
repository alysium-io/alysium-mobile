import { useNavigation, useSearch } from '@hooks';
import { ProviderProps, SearchItem } from '@types';
import React, { createContext, useState } from 'react';
import { searchApiSlice } from 'src/redux/api';
import { Search } from 'src/redux/api/search/search.entity';

const { useSearchArtistsQuery } = searchApiSlice;

export type SearchPageContextType = {
	searchResults: Search[] | undefined;
	isLoading: boolean;
	error: any;
	searchText: string;
	setSearchText: React.Dispatch<React.SetStateAction<string>>;
	addRecentSearch: (searchText: SearchItem) => void;
	deleteRecentSearch: (id: number) => void;
	recentSearches: SearchItem[];
	clearSearchText: () => void;
	onPressSearchResult: (item: SearchItem) => void;
	isSearchActive: boolean;
	setIsSearchActive: (isSearchActive: boolean) => void;
};

export const SearchPageContext = createContext({} as SearchPageContextType);

export const SearchPageProvider: React.FC<ProviderProps> = ({ children }) => {
	const { artistPage } = useNavigation();
	const [searchText, setSearchText] = useState<string>('');
	const clearSearchText = () => setSearchText('');
	const {
		addRecentSearch,
		recentSearches,
		deleteRecentSearch,
		setIsSearchActive,
		isSearchActive
	} = useSearch();

	const onPressSearchResult = (item: SearchItem) => {
		addRecentSearch(item);
		artistPage(item.id);
	};

	const {
		data: searchResults,
		isLoading,
		error
	} = useSearchArtistsQuery({ query: { q: searchText } });

	return (
		<SearchPageContext.Provider
			value={{
				searchText,
				setSearchText,
				searchResults,
				isLoading,
				error,
				addRecentSearch,
				recentSearches,
				deleteRecentSearch,
				clearSearchText,
				onPressSearchResult,
				isSearchActive,
				setIsSearchActive
			}}
		>
			{children}
		</SearchPageContext.Provider>
	);
};
