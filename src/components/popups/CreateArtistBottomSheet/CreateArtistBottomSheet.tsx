import { Loading, View } from '@atomic';
import { BottomSheetFooterProps } from '@gorhom/bottom-sheet';
import { SheetApi } from '@hooks';
import { FullScreenSheet, FullScreenSheetStandardHeader } from '@organisms';
import ActionButtons from '@src/components/molecules/Buttons/ActionButtons';
import FullScreenSheetFooter from '@src/components/organisms/BottomSheet/sheets/FullScreenSheetFooter';
import React, { useCallback } from 'react';
import { Case, Default, Switch } from 'react-if';
import { FadeIn, FadeOut } from 'react-native-reanimated';
import CreateArtistSequence from './components/CreateArtistSequence/CreateArtistSequence';
import CreateArtistSuccess from './components/CreateArtistSuccess';
import useCreateArtistBottomSheet from './useCreateArtistBottomSheet';

interface CreateArtistBottomSheetProps {
	sheetApi: SheetApi;
}

const CreateArtistBottomSheet: React.FC<CreateArtistBottomSheetProps> = ({
	sheetApi
}) => {
	const {
		cancel,
		resetAll,
		createArtistFormApi,
		artistNameTextInputApi,
		onSheetIndexChangeFocusTextInput,
		artistNameNextButtonStateApi
	} = useCreateArtistBottomSheet(sheetApi);

	const footerComponent = useCallback(
		(props: BottomSheetFooterProps) => {
			if (!createArtistFormApi.isLoading && !createArtistFormApi.isSuccess) {
				return (
					<FullScreenSheetFooter {...props}>
						<View flex={1}>
							<ActionButtons
								buttonProps={[
									{
										text: 'cancel',
										variant: 'outlined',
										onPress: cancel
									},
									{
										text: 'Create',
										onPress: createArtistFormApi.onSubmit,
										color: 'p',
										buttonState: artistNameNextButtonStateApi.buttonState
									}
								]}
							/>
						</View>
					</FullScreenSheetFooter>
				);
			}
		},
		[
			artistNameNextButtonStateApi.buttonState,
			createArtistFormApi.onSubmit,
			createArtistFormApi.isLoading,
			createArtistFormApi.isSuccess
		]
	);

	return (
		<FullScreenSheet
			sheetApi={sheetApi}
			onDismiss={resetAll}
			onChange={onSheetIndexChangeFocusTextInput}
			footerComponent={footerComponent}
		>
			<FullScreenSheetStandardHeader />
			<Switch>
				<Case condition={createArtistFormApi.isLoading}>
					<View flex={1} animated entering={FadeIn} exiting={FadeOut}>
						<Loading />
					</View>
				</Case>
				<Case condition={createArtistFormApi.isSuccess}>
					<CreateArtistSuccess
						sheetApi={sheetApi}
						createArtistFormApi={createArtistFormApi}
					/>
				</Case>
				<Default>
					<CreateArtistSequence
						createArtistFormApi={createArtistFormApi}
						artistNameTextInputApi={artistNameTextInputApi}
					/>
				</Default>
			</Switch>
		</FullScreenSheet>
	);
};

export default CreateArtistBottomSheet;
