import { BasePage } from '@organisms';
import React from 'react';
import { Case, Switch } from 'react-if';
import { ScrollView } from 'react-native';
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
		discoverTagsData,
		refetchDiscoverTags,
		artistSearchResults,
		tagSearchResults,
		nextArtistSearchPage
	} = useSearchPage();

	return (
		<BasePage>
			<SearchPageHeader
				setSearchText={setSearchText}
				clearSearchText={clearSearchText}
				isSearchActive={isSearchActive}
				setIsSearchActive={setIsSearchActive}
			/>
			<ScrollView style={{ flex: 1, overflow: 'visible' }}>
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
								nextArtistSearchPage={nextArtistSearchPage}
							/>
						</Case>
						<Case condition={!isSearchActive}>
							<SearchInactivePage
								discoverTagsData={discoverTagsData}
								refetchDiscoverTags={refetchDiscoverTags}
							/>
						</Case>
					</Switch>
				</LayoutAnimationConfig>
			</ScrollView>
		</BasePage>
	);
};

export default SearchPage;
