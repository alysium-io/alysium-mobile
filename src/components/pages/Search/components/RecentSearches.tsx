import { Section, Text, View } from '@atomic';
import {
	ArtistSearchItem,
	SceneSearchItem,
	SearchType
} from '@flux/api/search/search.entity';
import { Button, ContentListItem } from '@molecules';
import React from 'react';

interface RecentSearchesProps {
	recentSearches: ArtistSearchItem[] | SceneSearchItem[];
	onPressSearchResult: (result: ArtistSearchItem | SceneSearchItem) => void;
	onPressClear: () => void;
}

const RecentSearches: React.FC<RecentSearchesProps> = ({
	recentSearches,
	onPressSearchResult,
	onPressClear
}) => {
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
				<Button
					onPress={onPressClear}
					text='Clear'
					containerProps={{ paddingVertical: 's' }}
				/>
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
