import { DismissKeyboardWrapper } from '@atomic';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { SheetApi } from '@hooks';
import {
	BottomSheet,
	BottomSheetFooter,
	BottomSheetHeader,
	SequenceFooterButtons,
	useAnimatedFooterHeight
} from '@organisms';
import React from 'react';
import EventName from './components/EventName';
import useCreateEventBottomSheet from './useCreateEventBottomSheet';

interface CreateEventBottomSheetProps {
	sheetApi: SheetApi;
}

const CreateEventBottomSheet: React.FC<CreateEventBottomSheetProps> = ({
	sheetApi
}) => {
	const {
		onSubmit,
		onSheetIndexChangeFocusTextInput,
		eventNameTextInputApi,
		cancel,
		resetAll,
		formMethods
	} = useCreateEventBottomSheet(sheetApi);
	const { animatedMarginBottom } = useAnimatedFooterHeight();

	return (
		<BottomSheet
			sheetRef={sheetApi.sheetRef}
			onChange={onSheetIndexChangeFocusTextInput}
			snapPoints={['90%']}
			onDismiss={resetAll}
		>
			<DismissKeyboardWrapper>
				<BottomSheetView style={[{ flex: 1 }, animatedMarginBottom]}>
					<BottomSheetHeader text='Create Event' />
					<EventName
						eventNameTextInputApi={eventNameTextInputApi}
						formMethods={formMethods}
					/>
				</BottomSheetView>
			</DismissKeyboardWrapper>
			<BottomSheetFooter>
				<SequenceFooterButtons
					buttons={[
						{
							onPress: cancel,
							text: 'cancel',
							variant: 'outlined',
							colorVariant: 'default'
						},
						{
							onPress: onSubmit,
							text: 'Create',
							variant: 'filled',
							colorVariant: 'default',
							buttonState:
								formMethods.watch('name') === '' ? 'disabled' : 'default'
						}
					]}
				/>
			</BottomSheetFooter>
		</BottomSheet>
	);
};

export default CreateEventBottomSheet;
