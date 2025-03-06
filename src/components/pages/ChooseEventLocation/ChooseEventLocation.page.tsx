import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { Text, View } from '@atomic';
import { artistEventApiSlice } from '@flux/api/event';
import { locationApiSlice } from '@flux/api/location';
import { GoogleMapsAutocompleteResult } from '@flux/api/location/types';
import { useKeyboard, useNavigation, useSearch } from '@hooks';
import { MenuListItem } from '@molecules';
import { BasePage, SearchBar } from '@organisms';
import { useRoute } from '@react-navigation/native';
import { captureException } from '@sentry/react-native';
import { ChooseEventLocationRouteProp } from '@types';
import React, { useEffect } from 'react';
import { Else, If, Then } from 'react-if';
import { ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';
import ChooseEventLocationPageHeader from './ChooseEventLocation.header';

const ChooseEventLocation = () => {
	const route = useRoute<ChooseEventLocationRouteProp>();
	const searchApi = useSearch();
	const { dismiss } = useKeyboard();
	const { back } = useNavigation();
	const { artistData } = useArtistAppContext();
	const [patchArtistEventLocationMutation] =
		artistEventApiSlice.usePatchArtistEventLocationMutation();

	useEffect(() => {
		setTimeout(() => {
			searchApi.textInputApi.focus();
		}, 500);
	}, []);

	const { data: autocompleteAddressData } =
		locationApiSlice.useAutocompleteAddressQuery(
			{
				body: {
					searchText: searchApi.searchText
				}
			},
			{ skip: !searchApi.searchText }
		);

	const { data: eventData } =
		artistEventApiSlice.usePrivateFindOneArtistEventQuery({
			params: {
				artist_uid: artistData.artist_uid,
				event_uid: route.params.event_uid
			}
		});

	const onPressSearchResult = (item: GoogleMapsAutocompleteResult) => {
		if (eventData) {
			patchArtistEventLocationMutation({
				params: {
					artist_uid: artistData.artist_uid,
					event_uid: eventData.event.event_uid
				},
				body: {
					place_id: item.place_id
				}
			})
				.unwrap()
				.catch((error) => {
					captureException(error);
					Toast.show({
						text1: 'Error updating event location',
						text2: 'Please try again later'
					});
				});
			back();
		}
	};

	return (
		<BasePage>
			<ChooseEventLocationPageHeader />
			<ScrollView
				alwaysBounceVertical
				onScrollBeginDrag={dismiss}
				keyboardShouldPersistTaps='always'
			>
				<View margin='m'>
					<SearchBar searchApi={searchApi} placeholder='Search for Location' />
				</View>
				<If condition={searchApi.searchText.length === 0}>
					<Then>
						<View margin='m'>
							<Text variant='page-header' marginBottom='m'>
								Choose a Location
							</Text>
							<Text variant='paragraph' color='text.s'>
								This will help people find your event. We will provide them with
								a map to your location, and instructions on how to get there.
							</Text>
						</View>
					</Then>
					<Else>
						{autocompleteAddressData?.map((item) => (
							<MenuListItem
								key={item.place_id}
								onPress={() => onPressSearchResult(item)}
								titleTextProps={{
									title: item.main_text,
									bottomSubtext: item.secondary_text,
									bottomSubtextColor: 'text.q'
								}}
								containerProps={{
									paddingLeft: 's'
								}}
							/>
						))}
					</Else>
				</If>
			</ScrollView>
		</BasePage>
	);
};

export default ChooseEventLocation;
