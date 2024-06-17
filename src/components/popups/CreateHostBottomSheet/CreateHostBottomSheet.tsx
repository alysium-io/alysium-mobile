import { DismissKeyboardWrapper, View } from '@atomic';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { SheetApi } from '@hooks';
import { EditableProfileImage } from '@molecules';
import {
	BottomSheet,
	BottomSheetFooter,
	SequenceFooterButtons,
	useAnimatedFooterHeight
} from '@organisms';
import { ContentType } from '@types';
import React from 'react';
import HostName from './components/HostName';
import useCreateHostBottomSheet from './useCreateHostBottomSheet';

interface CreateHostBottomSheetProps {
	sheetApi: SheetApi;
}

const CreateHostBottomSheet: React.FC<CreateHostBottomSheetProps> = ({
	sheetApi
}) => {
	const {
		resetAll,
		cancel,
		onSheetIndexChangeFocusTextInput,
		onSubmit,
		formMethods,
		hostNameTextInputApi
	} = useCreateHostBottomSheet(sheetApi);
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
					<View margin='m' justifyContent='center' alignItems='center'>
						<EditableProfileImage
							image={undefined}
							contentType={ContentType.host}
						/>
					</View>
					<HostName
						formMethods={formMethods}
						hostNameTextInputApi={hostNameTextInputApi}
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
							colorVariant: 'positive',
							buttonState:
								formMethods.watch('name') === '' ? 'disabled' : 'default'
						}
					]}
				/>
			</BottomSheetFooter>
		</BottomSheet>
	);
};

export default CreateHostBottomSheet;
