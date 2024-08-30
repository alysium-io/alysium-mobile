import { ActivityIndicator, View } from '@atomic';
import { SearchItem } from '@flux/api/search';
import { SearchArtistsResponseDto } from '@flux/api/search/dto/search-artists.dto';
import { SearchTagsResponseDto } from '@flux/api/search/dto/search-tags.dto';
import React from 'react';
import { Case, Switch } from 'react-if';
import Animated, {
	FadeIn,
	FadeOut,
	LinearTransition
} from 'react-native-reanimated';
import NoRecentSearches from './NoRecentSearches';
import RecentSearches from './RecentSearches';
import SearchResults from './SearchResults';

interface AnythingSearchActivePageProps {
	searchText: string;
	isLoading: boolean;
	recentSearches: SearchItem[];
	artistSearchResults?: SearchArtistsResponseDto;
	tagSearchResults?: SearchTagsResponseDto;
	onPressSearchResult: (item: SearchItem) => void;
}

const AnythingSearchActivePage: React.FC<AnythingSearchActivePageProps> = ({
	searchText,
	isLoading,
	recentSearches,
	onPressSearchResult,
	artistSearchResults,
	tagSearchResults
}) => {
	return (
		<Animated.ScrollView
			entering={FadeIn.duration(300)}
			exiting={FadeOut.duration(300)}
			style={{ overflow: 'visible' }}
			layout={LinearTransition.duration(300)}
		>
			<Switch>
				<Case condition={isLoading}>
					<View marginTop='xl'>
						<ActivityIndicator />
					</View>
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
					/>
				</Case>
			</Switch>
		</Animated.ScrollView>
	);
};

export default AnythingSearchActivePage;
