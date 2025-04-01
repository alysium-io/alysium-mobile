import { useUserAppContext } from '@arch/Application/contexts/User.context';
import { View } from '@atomic';
import { userApiSlice } from '@flux/api/user';
import { UpdateUserBodyDto } from '@flux/api/user/dto/user-update.dto';
import { useNavigation } from '@hooks';
import { FormText } from '@molecules';
import { BasePage } from '@organisms';
import { captureException } from '@sentry/react-native';
import { Alert, useGlobalLoader } from '@templates';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';
import EditFanHandlePageHeader from './EditFanHandle.header';

const EditFanHandle = () => {
	const { userData } = useUserAppContext();
	const { showLoader, hideLoader } = useGlobalLoader();
	const { back } = useNavigation();
	const [updateUserMutation] = userApiSlice.useUpdateUserMutation();

	const {
		control,
		handleSubmit,
		formState: { isDirty }
	} = useForm<UpdateUserBodyDto>({
		defaultValues: {
			handle: userData.handle
		}
	});

	const onSubmit = (data: UpdateUserBodyDto) => {
		if (isDirty) {
			showLoader();
			updateUserMutation({ body: data })
				.unwrap()
				.then(() => {
					hideLoader();
					back();
				})
				.catch((err) => {
					hideLoader();
					console.log(err);
					if (err?.data?.error === 'UNIQUE_CONSTRAINT_EXCEPTION') {
						Toast.show({
							text1: 'Handle already exists',
							text2: 'Please choose another handle.',
							props: { icon: 'block' }
						});
					} else {
						captureException(err);
						Toast.show({
							text1: 'Error',
							text2: 'Failed to update fan handle.'
						});
					}
				});
		} else {
			back();
		}
	};

	const onCancel = () => {
		if (isDirty) {
			Alert.alert(
				'Discard changes?',
				'You have unsaved changes. Are you sure you want to discard them?',
				[
					{
						text: 'Cancel',
						style: 'accent'
					},
					{
						text: 'Discard',
						onPress: () => back(),
						style: 'destructive'
					}
				]
			);
		} else {
			back();
		}
	};

	return (
		<BasePage>
			<EditFanHandlePageHeader
				onCancel={onCancel}
				onSubmit={handleSubmit(onSubmit)}
			/>
			<ScrollView>
				<View margin='m'>
					<Controller
						control={control}
						name='handle'
						render={({ field: { onChange, value } }) => (
							<FormText
								focusConfig={{ focusOnMount: true }}
								onPressClear={() => onChange('')}
								label='Handle'
								placeholder='Enter your handle'
								onChangeText={onChange}
								value={value ?? ''}
							/>
						)}
					/>
				</View>
			</ScrollView>
		</BasePage>
	);
};

export default EditFanHandle;
