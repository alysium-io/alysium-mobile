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

interface ConfirmPublishEventBottomSheetProps extends IChildrenProps {
	sheetApi: SheetApi;
	event_uid: NanoId;
	setDraftToPublished: () => void;
}

const ConfirmPublishEventBottomSheet: React.FC<
	ConfirmPublishEventBottomSheetProps
> = ({ sheetApi, event_uid, setDraftToPublished }) => {
	const { showLoader, hideLoader } = useGlobalLoader();
	const { theme } = useTheme();
	const [patchArtistEventStatusMutation] =
		artistEventApiSlice.usePatchArtistEventStatusMutation();
	const { artistData } = useArtistAppContext();
	const insets = useSafeAreaInsets();

	const publishEvent = async () => {
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
					status: EventStatus.published
				}
			}).unwrap();

			setDraftToPublished();

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
								text: 'Publish',
								color: 'p',
								onPress: publishEvent
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
						Publish Event
					</Text>
					<Text variant='paragraph-small-medium' color='text.t'>
						Currently this event is private. By hitting publish, you agree to
						make this information publicly available to everyone. Are you sure
						you want to publish this event?
					</Text>
				</View>
			</BottomSheetView>
		</BottomSheet>
	);
};

export default ConfirmPublishEventBottomSheet;
