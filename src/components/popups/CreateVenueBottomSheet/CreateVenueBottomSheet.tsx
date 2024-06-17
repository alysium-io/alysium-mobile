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
import VenueName from './components/VenueName';
import useCreateVenueBottomSheet from './useCreateVenueBottomSheet';

interface CreateVenueStartBottomSheetProps {
	sheetApi: SheetApi;
}

const CreateVenueStartBottomSheet: React.FC<
	CreateVenueStartBottomSheetProps
> = ({ sheetApi }) => {
	const {
		formMethods,
		cancel,
		onSubmit,
		venueNameTextInputApi,
		resetAll,
		onSheetIndexChangeFocusTextInput
	} = useCreateVenueBottomSheet(sheetApi);

	const { animatedMarginBottom } = useAnimatedFooterHeight();

	return (
		<BottomSheet
			sheetRef={sheetApi.sheetRef}
			onChange={onSheetIndexChangeFocusTextInput}
			onDismiss={resetAll}
			snapPoints={['90%']}
		>
			<DismissKeyboardWrapper>
				<BottomSheetView style={[{ flex: 1 }, animatedMarginBottom]}>
					<BottomSheetHeader text='Create Venue' />
					<VenueName
						formMethods={formMethods}
						venueNameTextInputApi={venueNameTextInputApi}
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

export default CreateVenueStartBottomSheet;
