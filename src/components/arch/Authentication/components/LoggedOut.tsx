import { AView, Icon, View } from '@atomic';
import { Formatting } from '@etc';
import { userApiSlice } from '@flux/api/user';
import { LoginUserPhoneNumberBodyDto } from '@flux/api/user/dto/user-login-phone.dto';
import { RegisterUserPhoneNumberBodyDto } from '@flux/api/user/dto/user-register-phone.dto';
import { useTheme } from '@hooks';
import { useButtonState } from '@molecules';
import { BasePage } from '@organisms';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Case, Switch } from 'react-if';
import {
	FadeInLeft,
	FadeOutRight,
	LayoutAnimationConfig
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { useAuthenticationAppContext } from '../Authentication.context';
import EnterCode from './EnterCode';
import RegisterUserPhoneNumber from './RegisterUserPhoneNumber';

const LoggedOut = () => {
	const { theme } = useTheme();
	const insets = useSafeAreaInsets();
	const { login } = useAuthenticationAppContext();
	const oneTimeCodeButtonStateApi = useButtonState('disabled');
	const sendTextButtonStateApi = useButtonState('disabled');
	const [step, setStep] = useState(0);
	const [registerPhoneNumberQuery] =
		userApiSlice.useLazyRegisterUserPhoneNumberQuery();
	const [loginPhoneNumberQuery] =
		userApiSlice.useLazyLoginUserPhoneNumberQuery();
	const [previouslyAcceptedTerms, setPreviouslyAcceptedTerms] = useState(false);

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
			passcode: '',
			has_accepted_terms: false
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
					setPreviouslyAcceptedTerms(res.has_accepted_terms);
					setLoginFormValue('has_accepted_terms', res.has_accepted_terms);
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
					login(res.token);
				})
				.catch((err) => {
					Toast.show({
						text1: 'Error',
						text2: 'Invalid authentication, please try again.',
						type: 'error'
					});
					resetAll();
				});
		}
	);

	const onPressBack = () => {
		resetAll();
	};

	const resetAll = () => {
		resetLoginForm();
		resetRegisterForm();
		sendTextButtonStateApi.setButtonState('disabled');
		oneTimeCodeButtonStateApi.setButtonState('disabled');
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

	return (
		<BasePage>
			<LayoutAnimationConfig skipEntering>
				<View
					flex={1}
					margin='m'
					style={{ marginTop: insets.top + theme.spacing.l }}
				>
					<View marginBottom='xl' alignItems='center'>
						<Icon name='logo' size='l' color='text.p' />
					</View>
					<AView
						flex={1}
						key={step}
						entering={FadeInLeft.duration(200)}
						exiting={FadeOutRight.duration(200)}
					>
						<Switch>
							<Case condition={step === 0}>
								<RegisterUserPhoneNumber
									sendTextButtonStateApi={sendTextButtonStateApi}
									control={registerFormControl}
									onSubmit={onSubmitRegister}
								/>
							</Case>
							<Case condition={step === 1}>
								<EnterCode
									onPressBack={onPressBack}
									control={loginFormControl}
									onSubmit={onSubmitLogin}
									oneTimeCodeButtonStateApi={oneTimeCodeButtonStateApi}
									previouslyAcceptedTerms={previouslyAcceptedTerms}
								/>
							</Case>
						</Switch>
					</AView>
				</View>
			</LayoutAnimationConfig>
		</BasePage>
	);
};

export default LoggedOut;
