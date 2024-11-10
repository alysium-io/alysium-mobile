import { useArtistAppContext } from '@arch/Application/contexts/Artist.context';
import { Text, View } from '@atomic';
import { artistEventApiSlice } from '@flux/api/event';
import { EventStatus } from '@flux/api/event/types';
import { BottomSheetFooterProps } from '@gorhom/bottom-sheet';
import { SheetApi } from '@hooks';
import { ActionButtons, useButtonState } from '@molecules';
import { FullScreenSheet, FullScreenSheetStandardHeader } from '@organisms';
import FullScreenSheetFooter from '@src/components/organisms/BottomSheet/sheets/FullScreenSheetFooter';
import { IChildrenProps, NanoId } from '@types';
import React, { useCallback } from 'react';

interface ConfirmPublishEventBottomSheetProps extends IChildrenProps {
	sheetApi: SheetApi;
	event_uid: NanoId;
}

const ConfirmPublishEventBottomSheet: React.FC<
	ConfirmPublishEventBottomSheetProps
> = ({ sheetApi, event_uid }) => {
	const [updateArtistEventMutation] =
		artistEventApiSlice.useUpdateArtistEventMutation();
	const { artistData } = useArtistAppContext();
	const publishButtonState = useButtonState('active');

	const publishEvent = async () => {
		try {
			console.log('Publishing event');
			publishButtonState.setButtonState('loading');
			await updateArtistEventMutation({
				params: {
					event_uid,
					artist_uid: artistData.artist_uid
				},
				body: {
					status: EventStatus.published
				}
			});
			publishButtonState.buttonSuccess();
			sheetApi.close();
		} finally {
			publishButtonState.reset();
		}
	};

	const footerComponent = useCallback(
		(props: BottomSheetFooterProps) => (
			<FullScreenSheetFooter {...props}>
				<View flex={1}>
					<ActionButtons
						buttonProps={[
							{
								text: 'cancel',
								variant: 'outlined',
								onPress: sheetApi.close
							},
							{
								text: 'Create',
								color: 'p',
								buttonState: publishButtonState.buttonState,
								onPress: publishEvent
							}
						]}
					/>
				</View>
			</FullScreenSheetFooter>
		),
		[publishButtonState.buttonState]
	);

	return (
		<FullScreenSheet sheetApi={sheetApi} footerComponent={footerComponent}>
			<FullScreenSheetStandardHeader />
			<View margin='m'>
				<Text variant='page-header' marginBottom='m'>
					Publish Event
				</Text>
				<Text variant='paragraph' color='text.t'>
					Currently this event is private. By hitting publish, you agree to make
					this information publicly available to everyone. Are you sure you want
					to publish this event?
				</Text>
			</View>
		</FullScreenSheet>
	);
};

export default ConfirmPublishEventBottomSheet;
