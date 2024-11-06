import { View } from '@atomic';
import { locationApiSlice } from '@flux/api/location';
import { useSearch } from '@hooks';
import { MenuListItem } from '@molecules';
import { SearchBar } from '@organisms';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const GoogleMapsAutocomplete = () => {
	const searchApi = useSearch();

	const { data } = locationApiSlice.useAutocompleteSceneQuery(
		{
			body: {
				searchText: searchApi.searchText
			}
		},
		{
			skip: !searchApi.searchText
		}
	);

	console.log(searchApi.searchText);

	return (
		<SafeAreaView>
			<View margin='m'>
				<SearchBar searchApi={searchApi} placeholder='Search a Scene (City)' />
			</View>
			{data?.map((item) => (
				<MenuListItem
					key={item.place_id}
					titleTextProps={{
						title: item.main_text,
						bottomSubtext: item.secondary_text,
						bottomSubtextColor: 'text.q'
					}}
					containerProps={{
						paddingLeft: 's'
					}}
					onPress={() => console.log(item)}
				/>
			))}
		</SafeAreaView>
	);
};

export default GoogleMapsAutocomplete;
