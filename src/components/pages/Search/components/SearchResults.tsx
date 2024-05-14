import { Section, View } from '@atomic';
import { SectionHeader } from '@molecules';
import { ContentListItem } from '@organisms';
import { ContentType } from '@types';
import React from 'react';
import { useSearchPageContext } from '../Search.context';

const SearchResults = () => {
	const { searchResults, onPressSearchResult } = useSearchPageContext();

	return (
		<Section>
			<View marginHorizontal='m'>
				<SectionHeader text='Search Results' titleVariant='large' />
			</View>
			{searchResults?.map((result) => (
				<ContentListItem
					key={result.id}
					title={result.name}
					subtitle='artist'
					onPress={() => onPressSearchResult(result)}
					contentType={ContentType.artist}
					image={'https://via.placeholder.com/150'}
					border
				/>
			))}
		</Section>
	);
};

export default SearchResults;
