import { useAuthenticationAppContext } from '@arch/Authentication/Authentication.context';
import useAuthFlow from '@arch/Authentication/useAuthFlow';
import { DismissKeyboardWrapper, Icon, View } from '@atomic';
import { Formatting, regexPatterns } from '@etc';
import { userApiSlice } from '@flux/api/user';
import { RegisterUserPhoneNumberBodyDto } from '@flux/api/user/dto/user-register-phone.dto';
import { usePersistedAppState, useSheet } from '@hooks';
import {
	Button,
	DeclarativeText,
	InternationalPhoneNumberTextInput,
	useButtonState
} from '@molecules';
import { BasePage } from '@organisms';
import { PrivacyPolicyBottomSheet } from '@popups';
import { captureException } from '@sentry/react-native';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

const RegisterUserPhoneNumberPage = () => {
	const { setPersistedAppState } = usePersistedAppState();
	const { login } = useAuthenticationAppContext();
	const sheetApi = useSheet();
	const sendTextButtonStateApi = useButtonState('disabled');
	const [loginGuestQuery] = userApiSlice.useLazyLoginGuestUserQuery();
	const [registerPhoneNumberQuery] =
		userApiSlice.useLazyRegisterUserPhoneNumberQuery();
	const { enterCodePage } = useAuthFlow();

	const loginGuest = async () => {
		loginGuestQuery()
			.unwrap()
			.then(({ token }) => {
				setPersistedAppState({ token });
				login();
			})
			.catch((err) => {
				captureException(err);
				Toast.show({
					text1: 'Error',
					text2: 'Failed to login as guest.'
				});
			});
	};

	const {
		handleSubmit: handleSubmitRegister,
		control: registerFormControl,
		formState: { isValid: registerFormIsValid }
	} = useForm<RegisterUserPhoneNumberBodyDto>({
		defaultValues: {
			phone_number: ''
		}
	});

	const onSubmitRegister = handleSubmitRegister(
		async (data: RegisterUserPhoneNumberBodyDto) => {
			try {
				sendTextButtonStateApi.setButtonState('loading');
				data.phone_number =
					Formatting.preparePhoneNumberForApi(data.phone_number) ?? '';
				await registerPhoneNumberQuery({ body: data }).unwrap();
				enterCodePage(data.phone_number);
			} catch (err: any) {
				captureException(err);
				Toast.show({
					text1: 'Error',
					text2: 'Something went wrong, please try again.',
					type: 'error'
				});
			} finally {
				sendTextButtonStateApi.setButtonState('active');
			}
		}
	);

	useEffect(() => {
		sendTextButtonStateApi.setButtonState(
			registerFormIsValid ? 'active' : 'disabled'
		);
	}, [registerFormIsValid]);

	return (
		<BasePage>
			<SafeAreaView style={{ flex: 1 }}>
				<View flex={1} margin='m'>
					<View flex={1} justifyContent='space-between' gap='l'>
						<View alignItems='center'>
							<Icon name='logo' size='l' color='text.p' />
						</View>
						<Controller
							control={registerFormControl}
							name='phone_number'
							rules={{
								required: 'Please enter a phone number',
								pattern: {
									value: regexPatterns.phoneNumber,
									message: 'Please enter a valid phone number'
								}
							}}
							render={({ field: { onChange } }) => (
								<InternationalPhoneNumberTextInput
									onChangeText={onChange}
									focusConfig={{ useFocusEffect: true, focusOnMount: true }}
								/>
							)}
						/>
						<DeclarativeText
							textItems={[
								{
									text: 'We will only ever use your phone number to log you in. See our ',
									variant: 'paragraph-small'
								},
								{
									text: 'Privacy Policy',
									variant: 'paragraph-small',
									color: 'subtext.s',
									underline: true,
									newline: false,
									onPress: () => {
										Keyboard.dismiss();
										sheetApi.open();
									}
								}
							]}
						/>
						<Button
							text='Continue as Guest'
							variant='outlined'
							onPress={loginGuest}
						/>
						<Button
							text='Send Text'
							onPress={onSubmitRegister}
							color='p'
							buttonState={sendTextButtonStateApi.buttonState}
						/>
						<DismissKeyboardWrapper containerStyle={{ flex: 1 }} />
						<PrivacyPolicyBottomSheet sheetApi={sheetApi} />
					</View>
				</View>
			</SafeAreaView>
		</BasePage>
	);
};

export default RegisterUserPhoneNumberPage;
