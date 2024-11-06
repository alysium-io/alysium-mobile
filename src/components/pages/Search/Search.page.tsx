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
		recentSearches,
		onPressSearchResult,
		activeSearchTypeSequenceApi,
		searchAnythingApi,
		searchTagsApi,
		searchActiveApi
	} = useSearchPage();

	return (
		<BasePage>
			<SearchPageHeader
				activeSearchTypeSequenceApi={activeSearchTypeSequenceApi}
				searchAnythingApi={searchAnythingApi}
				searchTagsApi={searchTagsApi}
			/>
			<LayoutAnimationConfig skipEntering>
				<Switch>
					<Case condition={searchActiveApi.state}>
						<SearchActivePage
							recentSearches={recentSearches}
							onPressSearchResult={onPressSearchResult}
							activeSearchTypeSequenceApi={activeSearchTypeSequenceApi}
							searchAnythingApi={searchAnythingApi}
							searchTagsApi={searchTagsApi}
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
