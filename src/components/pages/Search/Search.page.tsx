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
		searchAnythingText,
		searchTagsText,
		setSearchAnythingText,
		searchActiveApi,
		recentSearches,
		onPressSearchResult,
		activeSearchTypeSequenceApi,
		setSearchTagsText,
		clearTagTextInput,
		tagTextInputApi
	} = useSearchPage();

	return (
		<BasePage>
			<SearchPageHeader
				setSearchAnythingText={setSearchAnythingText}
				setSearchTagsText={setSearchTagsText}
				searchActiveApi={searchActiveApi}
				activeSearchTypeSequenceApi={activeSearchTypeSequenceApi}
				clearTagTextInput={clearTagTextInput}
				tagTextInputApi={tagTextInputApi}
			/>
			<LayoutAnimationConfig skipEntering>
				<Switch>
					<Case condition={searchActiveApi.state}>
						<SearchActivePage
							clearTagTextInput={clearTagTextInput}
							searchAnythingText={searchAnythingText}
							searchTagsText={searchTagsText}
							recentSearches={recentSearches}
							onPressSearchResult={onPressSearchResult}
							activeSearchTypeSequenceApi={activeSearchTypeSequenceApi}
						/>
					</Case>
					<Case condition={!searchActiveApi.state}>
						<SearchInactivePage />
					</Case>
				</Switch>
			</LayoutAnimationConfig>
		</BasePage>
	);
};

export default SearchPage;
