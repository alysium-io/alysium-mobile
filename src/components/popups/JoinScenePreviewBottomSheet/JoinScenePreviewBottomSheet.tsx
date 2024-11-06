import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { Loading, Text, View } from '@atomic';
import { GoogleMapsAutocompleteResult } from '@flux/api/location/types';
import { sceneApiSlice } from '@flux/api/scene';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { SheetApi, useNavigation } from '@hooks';
import { ActionButtons, ContentListItem, useButtonState } from '@molecules';
import { BottomSheet } from '@organisms';
import React from 'react';
import { Case, Default, Switch } from 'react-if';
import { ScrollView, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from './components/Header';

interface JoinScenePreviewBottomSheetProps {
	sheetApi: SheetApi;
	googleMapsAutocompleteResult: GoogleMapsAutocompleteResult | null;
}

const JoinScenePreviewBottomSheet: React.FC<
	JoinScenePreviewBottomSheetProps
> = ({ sheetApi, googleMapsAutocompleteResult }) => {
	const joinButtonStateApi = useButtonState();
	const insets = useSafeAreaInsets();
	const { height } = useWindowDimensions();
	const { artistPage, back } = useNavigation();
	const { artistData } = useArtistAppContext();

	const [artistJoinSceneMutation] = sceneApiSlice.useArtistJoinSceneMutation();
	const { data, isLoading } = sceneApiSlice.useFindOneSceneQuery(
		{
			params: {
				place_id: googleMapsAutocompleteResult?.place_id || ''
			}
		},
		{
			skip: !googleMapsAutocompleteResult?.place_id
		}
	);

	const onPressArtistPreview = (artist_uid: string) => {
		sheetApi.close();
		artistPage(artist_uid, {
			to: 'ArtistPage',
			to_uid: artist_uid,
			from: 'ChooseScenePage',
			from_uid: googleMapsAutocompleteResult?.place_id,
			using: 'SCENE_PREVIEW_BOTTOM_SHEET'
		});
	};

	const onPressJoinScene = async () => {
		try {
			joinButtonStateApi.setButtonState('loading');
			const place_id = googleMapsAutocompleteResult?.place_id;
			if (place_id) {
				await artistJoinSceneMutation({
					body: {
						place_id,
						artist_uid: artistData.artist_uid
					}
				});
				sheetApi.close();
				back();
			}
		} finally {
			joinButtonStateApi.reset();
		}
	};

	return (
		<BottomSheet sheetRef={sheetApi.sheetRef} snapPoints={['75%']}>
			<BottomSheetView
				style={{
					flex: 1,
					marginBottom: insets.bottom
				}}
			>
				<Header googleMapsAutocompleteResult={googleMapsAutocompleteResult} />
				<ScrollView style={{ maxHeight: height / 2 }}>
					<Switch>
						<Case
							condition={
								isLoading ||
								data?.location?.google_place_id !==
									googleMapsAutocompleteResult?.place_id
							}
						>
							<View margin='xxl'>
								<Loading />
							</View>
						</Case>
						<Case condition={!data?.artists?.length}>
							<View margin='m'>
								<Text variant='paragraph' marginBottom='m' color='text.t'>
									Create this scene and be the first to join.
								</Text>
							</View>
						</Case>
						<Default>
							{data?.artists?.map((artist) => (
								<ContentListItem
									key={artist.artist.artist_uid}
									onPress={() => onPressArtistPreview(artist.artist.artist_uid)}
									titleTextProps={{
										title: artist.artist.name
									}}
									profileImageProps={{
										image: artist.artist.profile_image?.small.key,
										defaultImageProps: {
											icon: 'artist'
										}
									}}
								/>
							))}
						</Default>
					</Switch>
				</ScrollView>
				<View margin='m'>
					<ActionButtons
						buttonProps={[
							{
								text: 'cancel',
								variant: 'outlined',
								onPress: sheetApi.close
							},
							{
								text: 'Join',
								color: 'p',
								onPress: onPressJoinScene,
								buttonState: joinButtonStateApi.buttonState
							}
						]}
					/>
				</View>
			</BottomSheetView>
		</BottomSheet>
	);
};

export default JoinScenePreviewBottomSheet;
