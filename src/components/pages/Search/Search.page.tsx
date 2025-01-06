import { BasePage } from '@organisms';
import React from 'react';
import { Case, Switch } from 'react-if';
import SearchActivePage from './components/SearchActivePage';
import SearchInactivePage from './components/SearchInactivePage';
import SearchPageHeader from './Search.header';
import useSearchPage from './useSearchPage';

const SearchPage = () => {
	const {
		recentSearches,
		onPressSearchResult,
		searchApi,
		activeSearchType,
		setActiveSearchType
	} = useSearchPage();

	return (
		<BasePage>
			<SearchPageHeader
				searchApi={searchApi}
				activeSearchType={activeSearchType}
				setActiveSearchType={setActiveSearchType}
			/>
			<Switch>
				<Case condition={searchApi.activeToggleApi.state}>
					<SearchActivePage
						recentSearches={recentSearches}
						onPressSearchResult={onPressSearchResult}
						activeSearchType={activeSearchType}
						searchApi={searchApi}
					/>
				</Case>
				<Case condition={!searchApi.activeToggleApi.state}>
					<SearchInactivePage />
				</Case>
			</Switch>
		</BasePage>
	);
};

export default SearchPage;
