import { usePersonaAppContext } from '@arch/Application/contexts/Persona.context';
import { useAuthenticationAppContext } from '@arch/Authentication/Authentication.context';
import { Icon, View } from '@atomic';
import { Formatting } from '@etc';
import { userApiSlice } from '@flux/api/user';
import { LoginUserPhoneNumberBodyDto } from '@flux/api/user/dto/user-login-phone.dto';
import { RegisterUserPhoneNumberBodyDto } from '@flux/api/user/dto/user-register-phone.dto';
import { SheetApi } from '@hooks';
import { Button, useButtonState } from '@molecules';
import { FullScreenSheet } from '@organisms';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Case, Switch } from 'react-if';
import Toast from 'react-native-toast-message';
import EnterCode from './components/EnterCode';
import InputPhoneNumber from './components/InputPhoneNumber';

interface CreateAccountBottomSheetProps {
	sheetApi: SheetApi;
}

const CreateAccountBottomSheet: React.FC<CreateAccountBottomSheetProps> = ({
	sheetApi
}) => {
	const { login } = useAuthenticationAppContext();
	const { setIsPersonaLoading } = usePersonaAppContext();
	const [privateFindOneUserQuery] =
		userApiSlice.useLazyPrivateFindOneUserQuery();
	const sendTextButtonStateApi = useButtonState('disabled');
	const oneTimeCodeButtonStateApi = useButtonState('disabled');
	const [step, setStep] = useState(0);
	const [loginPhoneNumberQuery] =
		userApiSlice.useLazyLoginUserPhoneNumberQuery();
	const [registerPhoneNumberQuery] =
		userApiSlice.useLazyRegisterUserPhoneNumberQuery();

	const {
		handleSubmit: handleSubmitRegister,
		reset: resetRegisterForm,
		control: registerFormControl,
		formState: { isValid: registerFormIsValid }
	} = useForm<RegisterUserPhoneNumberBodyDto>({
		defaultValues: {
			phone_number: ''
		}
	});

	const {
		handleSubmit: handleSubmitLogin,
		setValue: setLoginFormValue,
		reset: resetLoginForm,
		control: loginFormControl,
		formState: { isValid: loginFormIsValid }
	} = useForm<LoginUserPhoneNumberBodyDto>({
		defaultValues: {
			phone_number: '',
			passcode: ''
		}
	});

	const onSubmitRegister = handleSubmitRegister(
		async (data: RegisterUserPhoneNumberBodyDto) => {
			sendTextButtonStateApi.setButtonState('loading');
			const phone_number =
				Formatting.preparePhoneNumberForApi(data.phone_number) ?? '';
			data.phone_number = phone_number;
			registerPhoneNumberQuery({ body: data })
				.unwrap()
				.then((res) => {
					setLoginFormValue('phone_number', phone_number);
					setStep(1);
				})
				.catch((err) => {
					Toast.show({
						text1: 'Error',
						text2: 'Something went wrong, please try again.',
						type: 'error'
					});
				})
				.finally(() => {
					sendTextButtonStateApi.setButtonState('active');
				});
		}
	);

	const onSubmitLogin = handleSubmitLogin(
		async (data: LoginUserPhoneNumberBodyDto) => {
			oneTimeCodeButtonStateApi.setButtonState('loading');
			loginPhoneNumberQuery({ body: data })
				.unwrap()
				.then((res) => {
					sheetApi.close();
					setIsPersonaLoading(true);
					login(res.token);
					setTimeout(async () => {
						setIsPersonaLoading(false);

						// We do have to call it this way...
						// If we try to just reference the useUserAppContext `userData` directly
						// it will use the reference from when this function began (which is the guest account)
						// The reason we show the toast in this scenario is because the user is currently
						// in a "logged in" state as a guest. So we want to give them some sort of visual feedback
						// that when they complete the register process, they have changed from a guest account to a user account.
						// So we display their new user handle in a toast.
						// This method covers the case where the user is a guest, and when they register, they register
						// under an existing phone number, so their handle actually changes between the guest account that
						// they currently are, and the user account that they are about to become.
						const user = await privateFindOneUserQuery().unwrap();
						Toast.show({
							text1: 'Success!',
							text2: 'Logged in as @' + user.handle
						});
					}, 300);
				})
				.catch((err) => {
					Toast.show({
						text1: 'Error',
						text2: 'Something went wrong.'
					});
				})
				.finally(() => {
					oneTimeCodeButtonStateApi.setButtonState('active');
				});
		}
	);

	const onPressBack = () => {
		resetLoginForm();
		resetRegisterForm();
		sendTextButtonStateApi.setButtonState('disabled');
		setStep(0);
	};

	useEffect(() => {
		sendTextButtonStateApi.setButtonState(
			registerFormIsValid ? 'active' : 'disabled'
		);
	}, [registerFormIsValid]);

	useEffect(() => {
		oneTimeCodeButtonStateApi.setButtonState(
			loginFormIsValid ? 'active' : 'disabled'
		);
	}, [loginFormIsValid]);

	const onPressCancel = () => {
		sheetApi.close();
		setTimeout(() => {
			resetLoginForm();
			resetRegisterForm();
			setStep(0);
		}, 300);
	};

	return (
		<FullScreenSheet
			sheetApi={sheetApi}
			onDismiss={onPressCancel}
			withButtons={false}
		>
			<View margin='m'>
				<View marginTop='l' marginBottom='xl' alignItems='center'>
					<Icon name='logo' size='l' color='text.p' />
				</View>
				<Switch>
					<Case condition={step === 0}>
						<InputPhoneNumber control={registerFormControl} />
					</Case>
					<Case condition={step === 1}>
						<EnterCode control={loginFormControl} />
					</Case>
				</Switch>
			</View>
			<View flexDirection='row' flex={1} marginHorizontal='m'>
				<View marginRight='s' flex={1}>
					{step === 0 ? (
						<Button text='cancel' variant='outlined' onPress={onPressCancel} />
					) : (
						<Button text='Back' variant='outlined' onPress={onPressBack} />
					)}
				</View>
				<View marginLeft='s' flex={1}>
					{step === 0 ? (
						<Button
							text='Send Text'
							color='p'
							onPress={onSubmitRegister}
							buttonState={sendTextButtonStateApi.buttonState}
						/>
					) : (
						<Button
							text='Login'
							color='p'
							onPress={onSubmitLogin}
							buttonState={oneTimeCodeButtonStateApi.buttonState}
						/>
					)}
				</View>
			</View>
		</FullScreenSheet>
	);
};

export default CreateAccountBottomSheet;
