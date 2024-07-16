import { Section, Text } from '@atomic';
import { Search } from '@flux/api/search';
import { ContentListItem } from '@molecules';
import React from 'react';

interface RecentSearchesProps {
	recentSearches?: Search[];
	onPressSearchResult: (result: any) => void;
}

const RecentSearches: React.FC<RecentSearchesProps> = ({
	recentSearches,
	onPressSearchResult
}) => {
	return (
		<Section>
			<Text variant='section-header-2' marginHorizontal='m'>
				Recent Searches
			</Text>
			{recentSearches?.map((result) => (
				<ContentListItem
					key={result.uid}
					onPress={() => onPressSearchResult(result)}
					titleTextProps={{
						title: result.name,
						bottomSubtext: 'artist'
					}}
				/>
			))}
		</Section>
	);
};

export default RecentSearches;
