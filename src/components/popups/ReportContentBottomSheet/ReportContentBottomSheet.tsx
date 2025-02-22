import { Icon, Text, View } from '@atomic';
import { reportedContentApiSlice } from '@flux/api/reported-content';
import { CreateReportedContentBodyDto } from '@flux/api/reported-content/dto/reported-content-create.dto';
import { ReportedContentType } from '@flux/api/reported-content/types';
import { SheetApi } from '@hooks';
import { TextBox, useButtonState } from '@molecules';
import { FullScreenSheet } from '@organisms';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Toast from 'react-native-toast-message';

interface ReportContentBottomSheetProps {
	sheetApi: SheetApi;
	referenceType?: ReportedContentType;
	referenceUid?: string;
}

const ReportContentBottomSheet: React.FC<ReportContentBottomSheetProps> = ({
	sheetApi,
	referenceType,
	referenceUid
}) => {
	const submitButtonState = useButtonState('disabled');
	const [createReportedContentMutation] =
		reportedContentApiSlice.useCreateReportedContentMutation();

	const {
		control,
		handleSubmit,
		formState: { isValid },
		reset
	} = useForm<CreateReportedContentBodyDto>({
		defaultValues: {
			reference_type: referenceType,
			reference_uid: referenceUid,
			description: ''
		}
	});

	useEffect(() => {
		reset({
			reference_type: referenceType,
			reference_uid: referenceUid,
			description: ''
		});
	}, [referenceType, referenceUid, reset]);

	useEffect(() => {
		submitButtonState.setButtonState(isValid ? 'active' : 'disabled');
	}, [isValid, submitButtonState]);

	const resetAll = () => {
		reset();
		submitButtonState.reset();
	};

	const onSubmit = (data: CreateReportedContentBodyDto) => {
		try {
			submitButtonState.setButtonState('loading');
			createReportedContentMutation({ body: data })
				.unwrap()
				.then(() => {
					Toast.show({
						text1: 'Content reported successfully',
						text2: 'We will review your report in 24 hours'
					});
					sheetApi.close();
					resetAll();
				});
		} catch (error) {
			Toast.show({
				text1: 'Failed to report content',
				text2: 'Please try again later'
			});
			submitButtonState.setButtonState('active');
		}
	};

	const onInvalid = () => {
		Toast.show({
			text1: 'Please fill in all fields',
			text2: 'Description is required'
		});
	};

	return (
		<FullScreenSheet
			sheetApi={sheetApi}
			onDismiss={resetAll}
			buttonProps={[
				{
					text: 'Cancel',
					variant: 'outlined',
					onPress: sheetApi.close
				},
				{
					text: 'Report',
					color: 't',
					onPress: handleSubmit(onSubmit, onInvalid),
					buttonState: submitButtonState.buttonState
				}
			]}
		>
			<View margin='m' flex={1}>
				<Text
					variant='section-header-1'
					textAlign='center'
					marginBottom='m'
					color='text.s'
				>
					Report {referenceType} <Icon name='flag' size='m' color='text.s' />
				</Text>
				<Controller
					control={control}
					name='description'
					rules={{
						required: 'Description is required'
					}}
					render={({ field: { value, onChange } }) => (
						<TextBox
							placeholder='Description'
							subtitle='Tell us why you want to report this content (e.g. spam, inappropriate content, etc.)'
							maxLength={250}
							multiline
							autoFocus
							value={value}
							onChangeText={onChange}
							autoCapitalize='sentences'
						/>
					)}
				/>
			</View>
		</FullScreenSheet>
	);
};

export default ReportContentBottomSheet;
