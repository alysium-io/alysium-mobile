import { ScrollView } from '@atomic';
import { searchApiSlice } from '@flux/api/search';
import { usePersistedArray } from '@flux/local/arrays/usePersistedArray';
import { SearchApi, usePagination } from '@hooks';
import React from 'react';
import { Case, Switch } from 'react-if';
import usePressSearchIteraction from '../usePressSearchIteraction';
import NoRecentSearches from './NoRecentSearches';
import RecentSearches from './RecentSearches';
import SearchResults from './SearchResults';
import LoadingSearchResults from './SearchResultsLoading';

interface SearchArtistsPageProps {
	searchApi: SearchApi;
}

const SearchArtistsPage: React.FC<SearchArtistsPageProps> = ({ searchApi }) => {
	const { onPressArtistSearchItem } = usePressSearchIteraction();
	const { page, defaultLimit } = usePagination();
	const { isEmpty, reset, items } = usePersistedArray(
		'homeRecentSearchArtists'
	);

	const { data, isFetching } = searchApiSlice.useSearchArtistsQuery(
		{
			body: { q: searchApi.searchText },
			query: {
				page,
				limit: defaultLimit
			}
		},
		{ skip: searchApi.searchText.length === 0 }
	);

	return (
		<ScrollView>
			<Switch>
				<Case condition={isFetching}>
					<LoadingSearchResults />
				</Case>
				<Case condition={searchApi.searchText.length === 0 && isEmpty}>
					<NoRecentSearches />
				</Case>
				<Case condition={searchApi.searchText.length === 0}>
					<RecentSearches
						recentSearches={items}
						onPressSearchResult={onPressArtistSearchItem}
						onPressClear={reset}
					/>
				</Case>
				<Case condition={searchApi.searchText.length > 0}>
					<SearchResults
						onPressSearchResult={onPressArtistSearchItem}
						searchResults={data}
					/>
				</Case>
			</Switch>
		</ScrollView>
	);
};

export default SearchArtistsPage;
