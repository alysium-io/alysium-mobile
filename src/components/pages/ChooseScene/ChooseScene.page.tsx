import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { Text, View } from '@atomic';
import { locationApiSlice } from '@flux/api/location';
import { GoogleMapsAutocompleteResult } from '@flux/api/location/types';
import { sceneApiSlice } from '@flux/api/scene';
import { useKeyboard, useNavigation, useSearch, useSheet } from '@hooks';
import { MenuListItem } from '@molecules';
import { BasePage, SearchBar } from '@organisms';
import { captureException } from '@sentry/react-native';
import React, { useEffect, useState } from 'react';
import { Else, If, Then } from 'react-if';
import { ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';
import ChooseScenePageHeader from './ChooseScene.header';

const ChooseScene = () => {
	const { artistData } = useArtistAppContext();
	const { back } = useNavigation();
	const joinScenePreviewSheetApi = useSheet();
	const searchApi = useSearch();
	const { dismiss } = useKeyboard();
	const [artistJoinSceneMutation] = sceneApiSlice.useArtistJoinSceneMutation();
	const [googleMapsAutocompleteResult, setGoogleMapsAutocompleteResult] =
		useState<GoogleMapsAutocompleteResult | null>(null);

	useEffect(() => {
		setTimeout(() => {
			searchApi.textInputApi.focus();
		}, 500);
	}, []);

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
		artistJoinSceneMutation({
			body: {
				place_id: googleMapsAutocompleteResult.place_id,
				artist_uid: artistData.artist_uid
			}
		})
			.unwrap()
			.catch((error) => {
				captureException(error);
				Toast.show({
					text1: 'Error joining scene',
					text2: 'Please try again later'
				});
			});
		back();
	};

	return (
		<BasePage>
			<ChooseScenePageHeader />
			<ScrollView
				alwaysBounceVertical
				onScrollBeginDrag={dismiss}
				keyboardShouldPersistTaps='always'
			>
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
		</BasePage>
	);
};

export default ChooseScene;
