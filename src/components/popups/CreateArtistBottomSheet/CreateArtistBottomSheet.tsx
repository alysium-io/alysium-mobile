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
import ArtistName from './components/ArtistName';
import useCreateArtistBottomSheet from './useCreateArtistBottomSheet';

interface CreateArtistBottomSheetProps {
	sheetApi: SheetApi;
}

const CreateArtistBottomSheet: React.FC<CreateArtistBottomSheetProps> = ({
	sheetApi
}) => {
	const {
		resetAll,
		cancel,
		onSubmit,
		artistNameTextInputApi,
		onSheetIndexChangeFocusTextInput,
		formMethods
	} = useCreateArtistBottomSheet(sheetApi);
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
							contentType={ContentType.artist}
						/>
					</View>
					<ArtistName
						formMethods={formMethods}
						artistNameTextInputApi={artistNameTextInputApi}
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

export default CreateArtistBottomSheet;
