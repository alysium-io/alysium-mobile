import { Section } from '@atomic';
import { Formatting } from '@etc';
import {
	ArtistSearchItem,
	SceneSearchItem,
	SearchResponseDto,
	SearchType
} from '@flux/api/search/search.entity';
import { ContentListItem } from '@molecules';
import React from 'react';

interface SearchResultsProps {
	searchResults?: SearchResponseDto<ArtistSearchItem | SceneSearchItem>;
	onPressSearchResult: (result: ArtistSearchItem | SceneSearchItem) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
	searchResults,
	onPressSearchResult
}) => {
	return (
		<Section>
			{searchResults && searchResults.hits.length > 0 && (
				<Section>
					{searchResults.hits.map((result) => {
						return (
							<ContentListItem
								key={result.uid}
								onPress={() => onPressSearchResult(result)}
								titleTextProps={{
									title: result.name,
									bottomSubtext: Formatting.formatNumFollowers(result.followers)
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
						);
					})}
				</Section>
			)}
		</Section>
	);
};

export default SearchResults;
