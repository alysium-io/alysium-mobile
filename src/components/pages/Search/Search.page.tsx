import { ConditionalRenderer, HeaderSafeArea, ScrollView, View } from '@atomic';
import { BasePage, SearchBar } from '@organisms';
import React from 'react';
import { LayoutAnimationConfig } from 'react-native-reanimated';
import { SearchActivePage, SearchInactivePage } from './components';
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
						<ConditionalRenderer
							componentKey={isSearchActive ? 1 : 0}
							componentMap={{
								[1]: () => (
									<SearchActivePage
										key='active'
										searchText={searchText}
										isLoading={isLoading}
										recentSearches={recentSearches}
										searchResults={searchResults}
										onPressSearchResult={onPressSearchResult}
									/>
								),
								[0]: () => <SearchInactivePage key='inactive' />
							}}
						/>
					</LayoutAnimationConfig>
				</ScrollView>
			</HeaderSafeArea>
		</BasePage>
	);
};

export default SearchPage;
