import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { Text, View } from '@atomic';
import { artistEventApiSlice } from '@flux/api/event';
import { EventStatus } from '@flux/api/event/types';
import {
	BottomSheetFooter,
	BottomSheetFooterProps,
	BottomSheetView
} from '@gorhom/bottom-sheet';
import { SheetApi, useTheme } from '@hooks';
import { ActionButtons } from '@molecules';
import { BottomSheet } from '@organisms';
import { useGlobalLoader } from '@templates';
import { IChildrenProps, NanoId } from '@types';
import React, { useCallback } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

interface ConfirmAddToEpkSheetProps extends IChildrenProps {
	sheetApi: SheetApi;
	event_uid: NanoId;
	setPublishedToCompleted: () => void;
}

const ConfirmAddToEpkSheet: React.FC<ConfirmAddToEpkSheetProps> = ({
	sheetApi,
	event_uid,
	setPublishedToCompleted
}) => {
	const { showLoader, hideLoader } = useGlobalLoader();
	const { theme } = useTheme();
	const [patchArtistEventStatusMutation] =
		artistEventApiSlice.usePatchArtistEventStatusMutation();
	const { artistData } = useArtistAppContext();
	const insets = useSafeAreaInsets();

	const addToEpk = async () => {
		try {
			sheetApi.close();

			// Show global loader
			showLoader();

			// // First patch the event
			await patchArtistEventStatusMutation({
				params: {
					event_uid,
					artist_uid: artistData.artist_uid
				},
				body: {
					status: EventStatus.completed
				}
			}).unwrap();

			setPublishedToCompleted();

			// Finally hide loader
			hideLoader();
		} catch (err: any) {
			console.log(err);
			hideLoader();
			Toast.show({
				text1: 'Error',
				text2: err?.data?.message ?? 'Something went wrong.'
			});
		}
	};

	const footerComponent = useCallback(
		(props: BottomSheetFooterProps) => (
			<BottomSheetFooter {...props}>
				<View
					flex={1}
					padding='m'
					paddingBottom='none'
					style={{ marginBottom: insets.bottom }}
					borderTopWidth={theme.borderWidth.normal}
					borderTopColor='border.light'
				>
					<ActionButtons
						buttonProps={[
							{
								text: 'cancel',
								variant: 'outlined',
								onPress: sheetApi.close
							},
							{
								text: 'Confirm',
								color: 'p',
								onPress: addToEpk
							}
						]}
					/>
				</View>
			</BottomSheetFooter>
		),
		[]
	);

	return (
		<BottomSheet ref={sheetApi.sheetRef} footerComponent={footerComponent}>
			<BottomSheetView style={{ paddingBottom: theme.spacing.m }}>
				<View margin='m'>
					<Text variant='section-header-1' marginBottom='m'>
						Add to your EPK
					</Text>
					<Text variant='paragraph-medium' color='text.t' marginBottom='s'>
						This event is (and will remain) publicly available. If you add this
						event to your EPK, then it will be featured on your artist profile
						so that people can see a glimps of what you have done in the past.
					</Text>
					<Text variant='paragraph-medium' color='text.t'>
						We recommend adding{' '}
						<Text variant='paragraph-medium' color='text.p'>
							all
						</Text>{' '}
						your events to your EPK to increase your credibility.
					</Text>
				</View>
			</BottomSheetView>
		</BottomSheet>
	);
};

export default ConfirmAddToEpkSheet;
