import { View } from '@atomic';
import { BottomSheetFooterProps } from '@gorhom/bottom-sheet';
import { SheetApi } from '@hooks';
import { FullScreenSheet, FullScreenSheetStandardHeader } from '@organisms';
import ActionButtons from '@src/components/molecules/Buttons/ActionButtons';
import FullScreenSheetFooter from '@src/components/organisms/BottomSheet/sheets/FullScreenSheetFooter';
import React, { useCallback } from 'react';
import EventName from './components/EventName';
import useCreateArtistEventBottomSheet from './useCreateArtistEventBottomSheet';

interface CreateArtistEventBottomSheetProps {
	sheetApi: SheetApi;
}

const CreateArtistEventBottomSheet: React.FC<
	CreateArtistEventBottomSheetProps
> = ({ sheetApi }) => {
	const {
		close,
		onSheetIndexChangeFocusTextInput,
		eventNameTextInputApi,
		createArtistEventFormApi,
		createArtistEventButtonStateApi
	} = useCreateArtistEventBottomSheet(sheetApi);

	const footerComponent = useCallback(
		(props: BottomSheetFooterProps) => (
			<FullScreenSheetFooter {...props}>
				<View flex={1}>
					<ActionButtons
						buttonProps={[
							{
								text: 'cancel',
								variant: 'outlined',
								onPress: close
							},
							{
								text: 'Create',
								onPress: createArtistEventFormApi.onSubmit,
								color: 'p',
								buttonState: createArtistEventButtonStateApi.buttonState
							}
						]}
					/>
				</View>
			</FullScreenSheetFooter>
		),
		[createArtistEventButtonStateApi.buttonState]
	);

	return (
		<FullScreenSheet
			sheetApi={sheetApi}
			onChange={onSheetIndexChangeFocusTextInput}
			footerComponent={footerComponent}
		>
			<FullScreenSheetStandardHeader />
			<EventName
				eventNameTextInputApi={eventNameTextInputApi}
				createArtistEventFormApi={createArtistEventFormApi}
			/>
		</FullScreenSheet>
	);
};

export default CreateArtistEventBottomSheet;
