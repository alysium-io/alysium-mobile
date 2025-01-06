import { Section, Text, View } from '@atomic';
import { SearchItem, SearchType } from '@flux/api/search/search.entity';
import { usePersistedSearchState } from '@hooks';
import { Button, ContentListItem } from '@molecules';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface RecentSearchesProps {
	recentSearches?: SearchItem[];
	onPressSearchResult: (result: SearchItem) => void;
}

const RecentSearches: React.FC<RecentSearchesProps> = ({
	recentSearches,
	onPressSearchResult
}) => {
	const { resetRecentSearches } = usePersistedSearchState();
	return (
		<Section marginTop='xl'>
			<View
				flexDirection='row'
				justifyContent='space-between'
				alignItems='center'
				marginHorizontal='m'
				marginBottom='m'
			>
				<Text variant='section-header-2'>Recent Searches</Text>
				<TouchableOpacity>
					<Button
						onPress={resetRecentSearches}
						text='Clear'
						containerProps={{ paddingVertical: 's' }}
					/>
				</TouchableOpacity>
			</View>
			{recentSearches?.map((result) => (
				<ContentListItem
					key={result.uid}
					onPress={() => onPressSearchResult(result)}
					titleTextProps={{
						title: result.name,
						bottomSubtext: result.searchType
					}}
					profileImageProps={{
						image: result.profile_image?.small.key,
						defaultImageProps: {
							icon:
								result.searchType === SearchType.scene
									? 'location'
									: result.searchType
						}
					}}
				/>
			))}
		</Section>
	);
};

export default RecentSearches;
