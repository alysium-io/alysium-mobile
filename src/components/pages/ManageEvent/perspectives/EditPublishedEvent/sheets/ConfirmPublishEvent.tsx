import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { Text, View } from '@atomic';
import { wait } from '@etc';
import { artistEventApiSlice } from '@flux/api/event';
import { EventStatus } from '@flux/api/event/types';
import {
	BottomSheetFooter,
	BottomSheetFooterProps,
	BottomSheetView
} from '@gorhom/bottom-sheet';
import { SheetApi, useTheme, useToast } from '@hooks';
import { ActionButtons, useButtonState } from '@molecules';
import { BottomSheet } from '@organisms';
import { useGlobalLoader } from '@templates';
import { IChildrenProps, NanoId } from '@types';
import React, { useCallback } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ConfirmPublishEventBottomSheetProps extends IChildrenProps {
	sheetApi: SheetApi;
	event_uid: NanoId;
	setDraftToPublished: () => void;
}

const ConfirmPublishEventBottomSheet: React.FC<
	ConfirmPublishEventBottomSheetProps
> = ({ sheetApi, event_uid, setDraftToPublished }) => {
	const { showLoader, hideLoader } = useGlobalLoader();
	const { toastError } = useToast();
	const { theme } = useTheme();
	const [patchArtistEventStatusMutation] =
		artistEventApiSlice.usePatchArtistEventStatusMutation();
	const { artistData } = useArtistAppContext();
	const publishButtonState = useButtonState('active');
	const insets = useSafeAreaInsets();

	const publishEvent = async () => {
		try {
			publishButtonState.setButtonState('loading');

			// First patch the event
			await patchArtistEventStatusMutation({
				params: {
					event_uid,
					artist_uid: artistData.artist_uid
				},
				body: {
					status: EventStatus.published
				}
			}).unwrap();

			// Show global loader
			showLoader();

			// Show success animation
			await publishButtonState.buttonSuccess(300);

			await wait(0.5);
			setDraftToPublished();
			await wait(0.5);

			// Finally hide loader
			hideLoader();
		} catch (err: any) {
			console.log(err);
			publishButtonState.reset();
			toastError(err?.data?.message ?? 'Something went wrong.');
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
								buttonState: publishButtonState.buttonState,
								onPress: publishEvent
							}
						]}
					/>
				</View>
			</BottomSheetFooter>
		),
		[publishButtonState.buttonState]
	);

	return (
		<BottomSheet sheetRef={sheetApi.sheetRef} footerComponent={footerComponent}>
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
