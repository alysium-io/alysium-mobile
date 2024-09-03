import { ActivityIndicator, View } from '@atomic';
import { searchApiSlice, SearchItem } from '@flux/api/search';
import { useKeyboard, usePagination } from '@hooks';
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
	searchAnythingText: string;
	recentSearches: SearchItem[];
	onPressSearchResult: (item: SearchItem) => void;
}

const AnythingSearchActivePage: React.FC<AnythingSearchActivePageProps> = ({
	searchAnythingText,
	recentSearches,
	onPressSearchResult
}) => {
	const { dismiss } = useKeyboard();

	const { page: artistSearchPage, defaultLimit: artistSearchDefaultLimit } =
		usePagination();

	const { data: tagSearchResults, isLoading: isLoadingTagSearchResults } =
		searchApiSlice.useSearchTagsQuery(
			{
				body: { q: searchAnythingText },
				query: { page: 1, limit: 4 }
			},
			{ skip: searchAnythingText.length === 0 }
		);

	const { data: artistSearchResults, isLoading: isLoadingArtistSearchResults } =
		searchApiSlice.useSearchArtistsQuery(
			{
				body: { q: searchAnythingText },
				query: {
					page: artistSearchPage,
					limit: artistSearchDefaultLimit
				}
			},
			{ skip: searchAnythingText.length === 0 }
		);

	return (
		<Animated.ScrollView
			entering={FadeIn.duration(300)}
			exiting={FadeOut.duration(300)}
			style={{ overflow: 'visible' }}
			layout={LinearTransition.duration(300)}
			onScrollBeginDrag={dismiss}
		>
			<Switch>
				<Case
					condition={isLoadingTagSearchResults || isLoadingArtistSearchResults}
				>
					<View marginTop='xl'>
						<ActivityIndicator />
					</View>
				</Case>
				<Case
					condition={
						searchAnythingText.length === 0 && recentSearches.length === 0
					}
				>
					<NoRecentSearches />
				</Case>
				<Case condition={searchAnythingText.length === 0}>
					<RecentSearches
						recentSearches={recentSearches}
						onPressSearchResult={onPressSearchResult}
					/>
				</Case>
				<Case condition={searchAnythingText.length > 0}>
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
