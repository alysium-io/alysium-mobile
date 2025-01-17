import { Text, View } from '@atomic';
import { searchApiSlice } from '@flux/api/search';
import {
	ArtistSearchItem,
	SceneSearchItem
} from '@flux/api/search/search.entity';
import { usePersistedArray } from '@flux/local/arrays/usePersistedArray';
import { useSearch } from '@hooks';
import { Button, ContentListItem } from '@molecules';
import { SearchBar } from '@organisms';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const PersistedSearchTest = () => {
	const insets = useSafeAreaInsets();
	const searchApi = useSearch();
	const { data } = searchApiSlice.useSearchArtistsQuery(
		{
			query: {
				page: 1,
				limit: 10
			},
			body: {
				q: searchApi.searchText
			}
		},
		{ skip: searchApi.isEmpty }
	);

	const artistSearchCache = usePersistedArray<ArtistSearchItem>(
		'homeRecentSearchArtists'
	);
	const sceneSearchCache = usePersistedArray<SceneSearchItem>(
		'homeRecentSearchScenes'
	);
	const onPressSearchItem = (searchItem: ArtistSearchItem) => {
		artistSearchCache.add(searchItem);
	};

	const onPressReset = () => {
		artistSearchCache.reset();
	};

	return (
		<View style={{ paddingTop: insets.top }}>
			<Text margin='m' variant='section-header-2' textAlign='center'>
				Persisted Search Test
			</Text>
			<View>
				<View gap='s'>
					<Text variant='paragraph' textAlign='center'>
						Num in Cache
					</Text>
					<Text variant='paragraph-medium' textAlign='center'>
						{artistSearchCache.items.length}
					</Text>
				</View>
			</View>
			<View margin='m'>
				<SearchBar searchApi={searchApi} />
			</View>
			<Button
				text='Reset Persisted Search'
				containerProps={{
					margin: 'm'
				}}
				onPress={onPressReset}
			/>
			<Button
				text='Artist Search Cache'
				containerProps={{
					margin: 'm'
				}}
				onPress={() => console.log(artistSearchCache.items)}
			/>
			<Button
				text='Scene Search Cache'
				containerProps={{
					margin: 'm'
				}}
				onPress={() => console.log(sceneSearchCache.items)}
			/>
			{data?.hits.map((artist) => (
				<ContentListItem
					key={artist.uid}
					titleTextProps={{
						title: artist.name
					}}
					profileImageProps={{
						image: artist.profile_image?.small.key
					}}
					onPress={() => onPressSearchItem(artist)}
				/>
			))}
		</View>
	);
};

export default PersistedSearchTest;
