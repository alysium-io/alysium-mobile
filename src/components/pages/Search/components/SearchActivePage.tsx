import { ActivityIndicator, View } from '@atomic';
import { Search } from '@flux/api/search';
import { SearchArtistsResponseDto } from '@flux/api/search/dto/search-artists.dto';
import React from 'react';
import { Case, Switch } from 'react-if';
import { FadeInUp, FadeOutDown } from 'react-native-reanimated';
import NoRecentSearches from './NoRecentSearches';
import RecentSearches from './RecentSearches';
import SearchResults from './SearchResults';

interface SearchActivePageProps {
	searchText: string;
	isLoading: boolean;
	recentSearches: Search[];
	searchResults?: SearchArtistsResponseDto;
	onPressSearchResult: (item: Search) => void;
}

const SearchActivePage: React.FC<SearchActivePageProps> = ({
	searchText,
	isLoading,
	recentSearches,
	searchResults,
	onPressSearchResult
}) => {
	return (
		<View
			marginTop='m'
			animated
			entering={FadeInUp.duration(250)}
			exiting={FadeOutDown.duration(250)}
		>
			<Switch>
				<Case condition={isLoading}>
					<ActivityIndicator />
				</Case>
				<Case
					condition={searchText.length === 0 && recentSearches.length === 0}
				>
					<NoRecentSearches />
				</Case>
				<Case condition={searchText.length === 0}>
					<RecentSearches
						recentSearches={recentSearches}
						onPressSearchResult={onPressSearchResult}
					/>
				</Case>
				<Case condition={searchText.length > 0}>
					<SearchResults
						searchResults={searchResults}
						onPressSearchResult={onPressSearchResult}
					/>
				</Case>
			</Switch>
		</View>
	);
};

export default SearchActivePage;
