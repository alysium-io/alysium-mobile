import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { Text, View } from '@atomic';
import { artistEventApiSlice } from '@flux/api/event';
import { locationApiSlice } from '@flux/api/location';
import { GoogleMapsAutocompleteResult } from '@flux/api/location/types';
import { useKeyboard, useSearch, useSheet } from '@hooks';
import { MenuListItem } from '@molecules';
import { BasePage, SearchBar } from '@organisms';
import { ConfirmEventLocationChoiceBottomSheet } from '@popups';
import { useRoute } from '@react-navigation/native';
import { ChooseEventLocationRouteProp } from '@types';
import React, { useState } from 'react';
import { Else, If, Then } from 'react-if';
import { ScrollView } from 'react-native';
import ChooseEventLocationPageHeader from './ChooseEventLocation.header';

const ChooseEventLocation = () => {
	const route = useRoute<ChooseEventLocationRouteProp>();
	const searchApi = useSearch();
	const { dismiss } = useKeyboard();
	const confirmEventLocationChoiceSheetApi = useSheet();
	const [googleMapsAutocompleteResult, setGoogleMapsAutocompleteResult] =
		useState<GoogleMapsAutocompleteResult | null>(null);
	const { artistData } = useArtistAppContext();

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
		setGoogleMapsAutocompleteResult(item);
		confirmEventLocationChoiceSheetApi.open();
	};

	return (
		<BasePage>
			<ChooseEventLocationPageHeader />
			<ScrollView alwaysBounceVertical onScrollBeginDrag={dismiss}>
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
			<ConfirmEventLocationChoiceBottomSheet
				sheetApi={confirmEventLocationChoiceSheetApi}
				googleMapsAutocompleteResult={googleMapsAutocompleteResult}
				eventData={eventData}
			/>
		</BasePage>
	);
};

export default ChooseEventLocation;
