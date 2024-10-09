import { Loading, View } from '@atomic';
import { BottomSheetFooterProps } from '@gorhom/bottom-sheet';
import { SheetApi } from '@hooks';
import { StepBar } from '@molecules';
import {
	CancelXButton,
	FullScreenSheet,
	Header,
	HeaderSection
} from '@organisms';
import ActionButtons from '@src/components/molecules/Buttons/ActionButtons';
import FullScreenSheetFooter from '@src/components/organisms/BottomSheet/sheets/FullScreenSheetFooter';
import React, { useCallback } from 'react';
import { Case, Default, If, Switch, Then } from 'react-if';
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
		createArtistSequenceApi,
		artistNameNextButtonStateApi,
		profileImage,
		setProfileImage,
		selectedTagsListApi
	} = useCreateArtistBottomSheet(sheetApi);

	const footerComponent = useCallback(
		(props: BottomSheetFooterProps) => {
			if (!createArtistFormApi.isLoading && !createArtistFormApi.isSuccess) {
				return (
					<FullScreenSheetFooter {...props}>
						<View flex={1}>
							<Switch>
								<Case condition={createArtistSequenceApi.sequenceIndex === 0}>
									<ActionButtons
										buttonProps={[
											{
												text: 'cancel',
												variant: 'outlined',
												onPress: cancel
											},
											{
												text: 'Next',
												onPress: createArtistSequenceApi.next,
												buttonState: artistNameNextButtonStateApi.buttonState
											}
										]}
									/>
								</Case>
								<Case condition={createArtistSequenceApi.sequenceIndex === 1}>
									<ActionButtons
										buttonProps={[
											{
												text: 'back',
												variant: 'outlined',
												onPress: createArtistSequenceApi.back
											},
											{ text: 'Next', onPress: createArtistSequenceApi.next }
										]}
									/>
								</Case>
								<Case condition={createArtistSequenceApi.sequenceIndex === 2}>
									<ActionButtons
										buttonProps={[
											{
												text: 'back',
												variant: 'outlined',
												onPress: createArtistSequenceApi.back
											},
											{
												text: 'Create',
												onPress: createArtistFormApi.onSubmit,
												color: 'p'
											}
										]}
									/>
								</Case>
							</Switch>
						</View>
					</FullScreenSheetFooter>
				);
			}
		},
		[
			createArtistSequenceApi.sequenceIndex,
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
			<If
				condition={
					!createArtistFormApi.isLoading && !createArtistFormApi.isSuccess
				}
			>
				<Then>
					<Header>
						<HeaderSection
							LeftComponent={<CancelXButton />}
							CenterComponent={
								<View width='100%'>
									<StepBar
										steps={createArtistSequenceApi.numItems}
										currentStep={createArtistSequenceApi.sequenceIndex}
									/>
								</View>
							}
						/>
					</Header>
				</Then>
			</If>
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
						createArtistSequenceApi={createArtistSequenceApi}
						createArtistFormApi={createArtistFormApi}
						artistNameTextInputApi={artistNameTextInputApi}
						profileImage={profileImage}
						setProfileImage={setProfileImage}
						selectedTagsListApi={selectedTagsListApi}
					/>
				</Default>
			</Switch>
		</FullScreenSheet>
	);
};

export default CreateArtistBottomSheet;
