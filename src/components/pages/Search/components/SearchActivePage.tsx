import { View } from '@atomic';
import { Search } from '@flux/api/search';
import { SearchArtistsResponseDto } from '@flux/api/search/dto/search-artists.dto';
import React from 'react';
import { FadeInUp, FadeOutDown } from 'react-native-reanimated';
import NoRecentSearches from './NoRecentSearches';
import RecentSearches from './RecentSearches';
import SearchResults from './SearchResults';
import SearchResultsLoading from './SearchResultsLoading';

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
	const Body = () => {
		if (isLoading) {
			return <SearchResultsLoading />;
		} else {
			if (searchText.length === 0) {
				if (recentSearches.length === 0) {
					return <NoRecentSearches />;
				} else {
					return (
						<RecentSearches
							recentSearches={recentSearches}
							onPressSearchResult={onPressSearchResult}
						/>
					);
				}
			} else {
				return (
					<SearchResults
						searchResults={searchResults}
						onPressSearchResult={onPressSearchResult}
					/>
				);
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
			<Body />
		</View>
	);
};

export default SearchActivePage;
