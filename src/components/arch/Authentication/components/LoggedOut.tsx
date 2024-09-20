import { DismissKeyboardWrapper, Icon, View } from '@atomic';
import { LoginResponseDto } from '@flux/api/user/dto/user-login.dto';
import { useTheme } from '@hooks';
import { useButtonState } from '@molecules';
import { BasePage } from '@organisms';
import useLoginUserPhoneNumber from '@src/utils/redux-hook-form/useLoginUserPhoneNumberFormApi';
import useRegisterUserPhoneNumber from '@src/utils/redux-hook-form/useRegisterUserPhoneNumberFormApi';
import React, { useState } from 'react';
import { Case, Switch } from 'react-if';
import { LayoutAnimationConfig } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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

	const registerUserPhoneNumberFormApi = useRegisterUserPhoneNumber({
		methods: {
			onConfirmedValid: () => {
				sendTextButtonStateApi.setButtonState('loading');
			},
			onValidDidComplete: () => {
				sendTextButtonStateApi.setButtonState('active');
				loginUserPhoneNumberFormApi.formMethods.setValue(
					'phone_number',
					registerUserPhoneNumberFormApi.formMethods.getValues('phone_number')
				);
				setStep(1);
			},
			onValidDidFail: () => {
				sendTextButtonStateApi.setButtonState('active');
			}
		}
	});

	const loginUserPhoneNumberFormApi = useLoginUserPhoneNumber({
		methods: {
			onConfirmedValid: () => {
				oneTimeCodeButtonStateApi.setButtonState('loading');
			},
			onValidDidComplete: (response: LoginResponseDto) => {
				login(response.token);
			},
			onValidDidFail: () => {
				oneTimeCodeButtonStateApi.setButtonState('active');
			}
		}
	});

	const onPressBack = () => {
		loginUserPhoneNumberFormApi.formMethods.reset();
		registerUserPhoneNumberFormApi.formMethods.reset();
		sendTextButtonStateApi.setButtonState('disabled');
		setStep(0);
	};

	return (
		<BasePage>
			<LayoutAnimationConfig skipEntering>
				<DismissKeyboardWrapper>
					<View
						flex={1}
						margin='m'
						style={{ marginTop: insets.top + theme.spacing.l }}
					>
						<View marginBottom='xl' alignItems='center'>
							<Icon name='logo' size='l' color='text.p' />
						</View>
						<Switch>
							<Case condition={step === 0}>
								<RegisterUserPhoneNumber
									sendTextButtonStateApi={sendTextButtonStateApi}
									registerUserPhoneNumberFormApi={
										registerUserPhoneNumberFormApi
									}
								/>
							</Case>
							<Case condition={step === 1}>
								<EnterCode
									onPressBack={onPressBack}
									loginUserPhoneNumberFormApi={loginUserPhoneNumberFormApi}
									oneTimeCodeButtonStateApi={oneTimeCodeButtonStateApi}
								/>
							</Case>
						</Switch>
					</View>
				</DismissKeyboardWrapper>
			</LayoutAnimationConfig>
		</BasePage>
	);
};

export default LoggedOut;
