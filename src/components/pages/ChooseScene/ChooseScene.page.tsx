import { Text, View } from '@atomic';
import { locationApiSlice } from '@flux/api/location';
import { GoogleMapsAutocompleteResult } from '@flux/api/location/types';
import { useKeyboard, useSearch, useSheet } from '@hooks';
import { MenuListItem } from '@molecules';
import { BasePage, SearchBar } from '@organisms';
import { JoinScenePreviewBottomSheet } from '@popups';
import React, { useState } from 'react';
import { Else, If, Then } from 'react-if';
import { ScrollView } from 'react-native';
import ChooseScenePageHeader from './ChooseScene.header';

const ChooseScene = () => {
	const joinScenePreviewSheetApi = useSheet();
	const searchApi = useSearch();
	const { dismiss } = useKeyboard();
	const [googleMapsAutocompleteResult, setGoogleMapsAutocompleteResult] =
		useState<GoogleMapsAutocompleteResult | null>(null);

	const { data } = locationApiSlice.useAutocompleteSceneQuery(
		{
			body: {
				searchText: searchApi.searchText
			}
		},
		{ skip: !searchApi.searchText }
	);

	const onPressScene = (
		googleMapsAutocompleteResult: GoogleMapsAutocompleteResult
	) => {
		setGoogleMapsAutocompleteResult(googleMapsAutocompleteResult);
		joinScenePreviewSheetApi.open();
	};

	return (
		<BasePage>
			<ChooseScenePageHeader />
			<ScrollView alwaysBounceVertical onScrollBeginDrag={dismiss}>
				<View margin='m'>
					<SearchBar searchApi={searchApi} placeholder='Search for Cities' />
				</View>
				<If condition={searchApi.searchText.length === 0}>
					<Then>
						<View margin='m'>
							<Text variant='page-header' marginBottom='m'>
								Choose a Scene
							</Text>
							<Text variant='paragraph' color='text.s'>
								Find the city that you want to be a part of and join the
								community. This helps hosts find you, and fans to follow your
								journey.
							</Text>
						</View>
					</Then>
					<Else>
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
								onPress={() => onPressScene(item)}
							/>
						))}
					</Else>
				</If>
			</ScrollView>
			<JoinScenePreviewBottomSheet
				sheetApi={joinScenePreviewSheetApi}
				googleMapsAutocompleteResult={googleMapsAutocompleteResult}
			/>
		</BasePage>
	);
};

export default ChooseScene;
