import { View } from '@atomic';
import { ExternalUrlRefType } from '@flux/api/external-url/types';
import { BottomSheetFooterProps } from '@gorhom/bottom-sheet';
import { SheetApi } from '@hooks';
import { ActionButtons, FormTextInputWithLabel } from '@molecules';
import { FullScreenSheet, FullScreenSheetStandardHeader } from '@organisms';
import FullScreenSheetFooter from '@src/components/organisms/BottomSheet/sheets/FullScreenSheetFooter';
import { isValidUrlString } from '@src/etc/url';
import { NanoId } from '@types';
import React, { useCallback } from 'react';
import { Controller } from 'react-hook-form';
import useCreateExternalUrlBottomSheet from './useCreateExternalUrlBottomSheet';

interface CreateExternalUrlBottomSheetProps {
	sheetApi: SheetApi;
	refType: ExternalUrlRefType;
	refId: NanoId;
}

const CreateExternalUrlBottomSheet: React.FC<
	CreateExternalUrlBottomSheetProps
> = ({ sheetApi, refType, refId }) => {
	const { createExternalUrlFormApi, resetAll, close, saveButtonStateApi } =
		useCreateExternalUrlBottomSheet(sheetApi, refType, refId);

	const footerComponent = useCallback(
		(props: BottomSheetFooterProps) => {
			return (
				<FullScreenSheetFooter {...props}>
					<View flex={1}>
						<ActionButtons
							buttonProps={[
								{
									text: 'Cancel',
									color: 'default',
									variant: 'outlined',
									onPress: close
								},
								{
									text: 'Save',
									color: 'default',
									onPress: createExternalUrlFormApi.onSubmit,
									buttonState: saveButtonStateApi.buttonState
								}
							]}
						/>
					</View>
				</FullScreenSheetFooter>
			);
		},
		[saveButtonStateApi.buttonState]
	);

	return (
		<FullScreenSheet
			sheetApi={sheetApi}
			footerComponent={footerComponent}
			onDismiss={resetAll}
		>
			<FullScreenSheetStandardHeader />
			<View margin='m'>
				<Controller
					control={createExternalUrlFormApi.formMethods.control}
					name='name'
					rules={{
						required: 'Must enter a name',
						maxLength: { value: 50, message: 'Name is too long' }
					}}
					render={({ field: { onChange } }) => (
						<FormTextInputWithLabel
							label='Name'
							placeholder='Instagram, Facebook, etc.'
							onChangeText={onChange}
						/>
					)}
				/>
				<Controller
					control={createExternalUrlFormApi.formMethods.control}
					name='url'
					rules={{
						required: 'Must enter a URL',
						validate: (value) => isValidUrlString(value) || 'Invalid URL'
					}}
					render={({ field: { onChange } }) => (
						<FormTextInputWithLabel
							label='Url'
							placeholder='https://instagram.com/...'
							onChangeText={onChange}
						/>
					)}
				/>
			</View>
		</FullScreenSheet>
	);
};

export default CreateExternalUrlBottomSheet;
