import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { Icon, Text, View } from '@atomic';
import { artistEventApiSlice } from '@flux/api/event';
import { FindOneArtistEventResponseDto } from '@flux/api/event/dto/artist-event-find-one.dto';
import { GoogleMapsAutocompleteResult } from '@flux/api/location/types';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { SheetApi, useNavigation, useTheme } from '@hooks';
import { ActionButtons, useButtonState } from '@molecules';
import { BottomSheet } from '@organisms';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ConfirmEventLocationChoiceBottomSheetProps {
	sheetApi: SheetApi;
	googleMapsAutocompleteResult: GoogleMapsAutocompleteResult | null;
	eventData?: FindOneArtistEventResponseDto;
}

const ConfirmEventLocationChoiceBottomSheet: React.FC<
	ConfirmEventLocationChoiceBottomSheetProps
> = ({ sheetApi, googleMapsAutocompleteResult, eventData }) => {
	const { theme } = useTheme();
	const joinButtonStateApi = useButtonState();
	const insets = useSafeAreaInsets();
	const { back } = useNavigation();
	const { artistData } = useArtistAppContext();
	const [updateArtistEventLocationMutation] =
		artistEventApiSlice.useUpdateArtistEventLocationMutation();

	const onPressJoinScene = async () => {
		try {
			joinButtonStateApi.setButtonState('loading');
			const place_id = googleMapsAutocompleteResult?.place_id;
			if (place_id && eventData) {
				await updateArtistEventLocationMutation({
					params: {
						artist_uid: artistData.artist_uid,
						event_uid: eventData.event.event_uid
					},
					body: {
						place_id
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
		<BottomSheet sheetRef={sheetApi.sheetRef} snapPoints={['50%']}>
			<BottomSheetView
				style={{
					flex: 1,
					marginBottom: insets.bottom
				}}
			>
				<View
					flex={1}
					padding='m'
					alignItems='center'
					borderBottomColor='border.light'
					borderBottomWidth={theme.borderWidth.normal}
				>
					<View margin='l'>
						<Icon name='location' size='l' />
					</View>
					<Text variant='page-header' marginBottom='s' textAlign='center'>
						{googleMapsAutocompleteResult?.main_text}
					</Text>
					<Text variant='paragraph' color='text.q' textAlign='center'>
						{googleMapsAutocompleteResult?.secondary_text}
					</Text>
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
								text: 'Select',
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

export default ConfirmEventLocationChoiceBottomSheet;
