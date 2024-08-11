import { ActivityIndicator, View } from '@atomic';
import { SearchItem } from '@flux/api/search';
import { SearchArtistsResponseDto } from '@flux/api/search/dto/search-artists.dto';
import { SearchTagsResponseDto } from '@flux/api/search/dto/search-tags.dto';
import React from 'react';
import { Case, Switch } from 'react-if';
import { FadeInUp, FadeOutDown } from 'react-native-reanimated';
import NoRecentSearches from './NoRecentSearches';
import RecentSearches from './RecentSearches';
import SearchResults from './SearchResults';

interface SearchActivePageProps {
	searchText: string;
	isLoading: boolean;
	recentSearches: SearchItem[];
	artistSearchResults?: SearchArtistsResponseDto;
	tagSearchResults?: SearchTagsResponseDto;
	onPressSearchResult: (item: SearchItem) => void;
	nextArtistSearchPage: () => void;
}

const SearchActivePage: React.FC<SearchActivePageProps> = ({
	searchText,
	isLoading,
	recentSearches,
	onPressSearchResult,
	artistSearchResults,
	tagSearchResults,
	nextArtistSearchPage
}) => {
	return (
		<View
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
						onPressSearchResult={onPressSearchResult}
						artistSearchResults={artistSearchResults}
						tagSearchResults={tagSearchResults}
						nextArtistSearchPage={nextArtistSearchPage}
					/>
				</Case>
			</Switch>
		</View>
	);
};

export default SearchActivePage;
