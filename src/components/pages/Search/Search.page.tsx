import { HeaderSafeArea, ScrollView, View } from '@atomic';
import { BasePage, SearchBar } from '@organisms';
import React from 'react';
import { Case, Switch } from 'react-if';
import { LayoutAnimationConfig } from 'react-native-reanimated';
import SearchActivePage from './components/SearchActivePage';
import SearchInactivePage from './components/SearchInactivePage';
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
		searchResults,
		onPressSearchResult
	} = useSearchPage();

	return (
		<BasePage>
			<HeaderSafeArea>
				<ScrollView
					alwaysBounceVertical
					contentContainerStyle={{ minHeight: '100%' }}
				>
					<View margin='m'>
						<SearchBar
							onChangeText={setSearchText}
							onPressClearText={clearSearchText}
							isActive={isSearchActive}
							setIsActive={setIsSearchActive}
						/>
					</View>
					<LayoutAnimationConfig skipEntering>
						<Switch>
							<Case condition={isSearchActive}>
								<SearchActivePage
									searchText={searchText}
									isLoading={isLoading}
									recentSearches={recentSearches}
									searchResults={searchResults}
									onPressSearchResult={onPressSearchResult}
								/>
							</Case>
							<Case condition={!isSearchActive}>
								<SearchInactivePage />
							</Case>
						</Switch>
					</LayoutAnimationConfig>
				</ScrollView>
			</HeaderSafeArea>
		</BasePage>
	);
};

export default SearchPage;
