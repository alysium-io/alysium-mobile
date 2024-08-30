import { BasePage } from '@organisms';
import React from 'react';
import { Case, Switch } from 'react-if';
import { LayoutAnimationConfig } from 'react-native-reanimated';
import SearchActivePage from './components/SearchActivePage';
import SearchInactivePage from './components/SearchInactivePage';
import SearchPageHeader from './Search.header';
import useSearchPage from './useSearchPage';

const SearchPage = () => {
	const {
		setSearchText,
		clearSearchText,
		isSearchActive,
		setIsSearchActive,
		searchText,
		isLoading,
		recentSearches,
		onPressSearchResult,
		artistSearchResults,
		tagSearchResults,
		activeSearchTypeSequenceApi
	} = useSearchPage();

	return (
		<BasePage>
			<SearchPageHeader
				setSearchText={setSearchText}
				clearSearchText={clearSearchText}
				isSearchActive={isSearchActive}
				setIsSearchActive={setIsSearchActive}
				activeSearchTypeSequenceApi={activeSearchTypeSequenceApi}
			/>
			<LayoutAnimationConfig skipEntering>
				<Switch>
					<Case condition={isSearchActive}>
						<SearchActivePage
							searchText={searchText}
							isLoading={isLoading}
							recentSearches={recentSearches}
							onPressSearchResult={onPressSearchResult}
							artistSearchResults={artistSearchResults}
							tagSearchResults={tagSearchResults}
							activeSearchTypeSequenceApi={activeSearchTypeSequenceApi}
						/>
					</Case>
					<Case condition={!isSearchActive}>
						<SearchInactivePage />
					</Case>
				</Switch>
			</LayoutAnimationConfig>
		</BasePage>
	);
};

export default SearchPage;
