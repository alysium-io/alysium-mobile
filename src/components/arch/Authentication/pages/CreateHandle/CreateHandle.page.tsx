import { CreateHandlePageRouteProp } from '@arch/Authentication/types';
import useAuthFlow from '@arch/Authentication/useAuthFlow';
import { Text, View } from '@atomic';
import { userApiSlice } from '@flux/api/user';
import { UpdateUserBodyDto } from '@flux/api/user/dto/user-update.dto';
import { usePersistedAppState } from '@hooks';
import { ActionButtons, TextBox, useButtonState } from '@molecules';
import { BasePage } from '@organisms';
import { useRoute } from '@react-navigation/native';
import { captureException } from '@sentry/react-native';
import { AuthStage } from '@types';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

const CreateHandlePage = () => {
	const { params } = useRoute<CreateHandlePageRouteProp>();
	const [updateUserMutation] = userApiSlice.useUpdateUserMutation();
	const [handleCreatedMutation] = userApiSlice.useHandleCreatedMutation();
	const { setPersistedAppState } = usePersistedAppState();
	const { fanAccountCreatedPage } = useAuthFlow();
	const createButtonStateApi = useButtonState('disabled');

	const {
		handleSubmit,
		control,
		formState: { isValid }
	} = useForm<UpdateUserBodyDto>({
		defaultValues: {
			handle: ''
		}
	});

	const onPressCreateHandle = handleSubmit(async (data: UpdateUserBodyDto) => {
		try {
			createButtonStateApi.setButtonState('loading');
			handleCreatedMutation();
			const newUser = await updateUserMutation({ body: data }).unwrap();
			Keyboard.dismiss();
			fanAccountCreatedPage(newUser);
			createButtonStateApi.setButtonState('active');
		} catch (error: any) {
			createButtonStateApi.setButtonState('active');
			if (error?.data?.error === 'UNIQUE_CONSTRAINT_EXCEPTION') {
				Toast.show({
					text1: 'Handle already exists',
					text2: 'Please choose another handle.',
					props: { icon: 'block' }
				});
			} else {
				captureException(error);
				Toast.show({
					text1: 'Error',
					text2: 'Failed to update fan handle.'
				});
			}
		}
	});

	const onPressSkip = async () => {
		handleCreatedMutation();
		setPersistedAppState({ authStage: AuthStage.loggedIn });
	};

	useEffect(() => {
		createButtonStateApi.setButtonState(isValid ? 'active' : 'disabled');
	}, [isValid]);

	return (
		<BasePage>
			<SafeAreaView>
				<View margin='m' gap='m'>
					<Text textAlign='center' variant='section-header-1'>
						Create Handle
					</Text>
					<Controller
						name='handle'
						control={control}
						rules={{
							required: 'Handle is required',
							minLength: {
								value: 3,
								message: 'Handle must be at least 3 characters'
							},
							pattern: {
								value: /^[a-zA-Z][a-zA-Z0-9]*$/,
								message:
									'Handle must start with a letter and contain only letters and numbers'
							}
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextBox
								focusConfig={{ focusOnMount: true }}
								onChangeText={onChange}
								onBlur={onBlur}
								placeholder={params.user.handle}
								subtitle='Create a unique handle for your account. Handle must start with a letter and contain only letters and numbers.'
								value={value}
								autoCapitalize='none'
							/>
						)}
					/>
					<ActionButtons
						buttonProps={[
							{
								text: 'skip',
								onPress: onPressSkip,
								variant: 'outlined'
							},
							{
								text: 'Create',
								onPress: onPressCreateHandle,
								buttonState: createButtonStateApi.buttonState
							}
						]}
					/>
				</View>
			</SafeAreaView>
		</BasePage>
	);
};

export default CreateHandlePage;
