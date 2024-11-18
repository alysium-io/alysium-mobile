import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { View } from '@atomic';
import { locationApiSlice } from '@flux/api/location';
import { GoogleMapsAutocompleteResult } from '@flux/api/location/types';
import { sceneApiSlice } from '@flux/api/scene';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { SheetApi, useNavigation } from '@hooks';
import { ActionButtons, useButtonState } from '@molecules';
import { BottomSheet } from '@organisms';
import LocationMapView from '@src/components/molecules/Maps/LocationMapView';
import React from 'react';
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
	const { back } = useNavigation();
	const { artistData } = useArtistAppContext();
	const [artistJoinSceneMutation] = sceneApiSlice.useArtistJoinSceneMutation();

	const { data: locationData } =
		locationApiSlice.useFindGoogleLocationDetailsByPlaceIdQuery(
			{
				body: {
					place_id: googleMapsAutocompleteResult?.place_id || ''
				}
			},
			{
				skip: !googleMapsAutocompleteResult?.place_id
			}
		);

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
		<BottomSheet
			sheetRef={sheetApi.sheetRef}
			snapPoints={['75%']}
			handleComponent={null}
		>
			<BottomSheetView
				style={{
					flex: 1,
					marginBottom: insets.bottom
				}}
			>
				<Header googleMapsAutocompleteResult={googleMapsAutocompleteResult} />
				<View height={400} width='100%'>
					{locationData && <LocationMapView location={locationData} />}
				</View>
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
