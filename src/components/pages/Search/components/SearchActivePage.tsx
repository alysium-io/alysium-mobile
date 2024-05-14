import { View } from '@atomic';
import React from 'react';
import { FadeInUp, FadeOutDown } from 'react-native-reanimated';
import { useSearchPageContext } from '../Search.context';
import NoRecentSearches from './NoRecentSearches';
import RecentSearches from './RecentSearches';
import SearchResults from './SearchResults';
import SearchResultsLoading from './SearchResultsLoading';

const SearchActivePage = () => {
	const { searchText, isLoading, recentSearches } = useSearchPageContext();

	const render = () => {
		if (isLoading) {
			return <SearchResultsLoading />;
		} else {
			if (searchText.length === 0) {
				if (recentSearches.length === 0) {
					return <NoRecentSearches />;
				} else {
					return <RecentSearches />;
				}
			} else {
				return <SearchResults />;
			}
		}
	};

	return (
		<View
			marginTop='m'
			animated
			entering={FadeInUp.duration(250)}
			exiting={FadeOutDown.duration(250)}
		>
			{render()}
		</View>
	);
};

export default SearchActivePage;
