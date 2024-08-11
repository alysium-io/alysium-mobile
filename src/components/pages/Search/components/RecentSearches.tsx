import { Section, Text } from '@atomic';
import { SearchItem } from '@flux/api/search';
import { ContentListItem } from '@molecules';
import React from 'react';

interface RecentSearchesProps {
	recentSearches?: SearchItem[];
	onPressSearchResult: (result: any) => void;
}

const RecentSearches: React.FC<RecentSearchesProps> = ({
	recentSearches,
	onPressSearchResult
}) => {
	return (
		<Section marginTop='xl'>
			<Text variant='section-header-2' marginHorizontal='m' marginBottom='m'>
				Recent Searches
			</Text>
			{recentSearches?.map((result) => (
				<ContentListItem
					key={result.uid}
					onPress={() => onPressSearchResult(result)}
					titleTextProps={{
						title: result.name,
						bottomSubtext: result.searchType
					}}
					profileImageProps={{
						defaultImageProps: {
							icon: result.searchType
						}
					}}
				/>
			))}
		</Section>
	);
};

export default RecentSearches;
