import { useAuthenticationAppContext } from '@arch/Authentication/Authentication.context';
import { Icon, View } from '@atomic';
import { regexPatterns } from '@etc';
import { LoginResponseDto } from '@flux/api/user/dto/user-login.dto';
import { BottomSheetFooterProps } from '@gorhom/bottom-sheet';
import { SheetApi, useLayoutDimensions, useTextInput } from '@hooks';
import { Button, useButtonState } from '@molecules';
import { FullScreenSheetWithHeaderAndFooter } from '@organisms';
import FullScreenSheetFooter from '@src/components/organisms/BottomSheet/sheets/FullScreenSheetFooter';
import useLoginUserPhoneNumber from '@src/utils/redux-hook-form/useLoginUserPhoneNumberFormApi';
import useRegisterUserPhoneNumber from '@src/utils/redux-hook-form/useRegisterUserPhoneNumberFormApi';
import React, { useCallback, useEffect, useState } from 'react';
import { Case, Switch } from 'react-if';
import { useAnimatedKeyboard } from 'react-native-reanimated';
import EnterCode from './components/EnterCode';
import InputPhoneNumber from './components/InputPhoneNumber';

interface CreateAccountBottomSheetProps {
	sheetApi: SheetApi;
}

const CreateAccountBottomSheet: React.FC<CreateAccountBottomSheetProps> = ({
	sheetApi
}) => {
	const { login } = useAuthenticationAppContext();
	const textInputApi = useTextInput();
	const keyboard = useAnimatedKeyboard();
	const footerLayoutApi = useLayoutDimensions();
	const sendTextButtonStateApi = useButtonState('disabled');
	const oneTimeCodeButtonStateApi = useButtonState('disabled');
	const [step, setStep] = useState(0);

	const loginUserPhoneNumberFormApi = useLoginUserPhoneNumber({
		methods: {
			onConfirmedValid: () => {
				oneTimeCodeButtonStateApi.setButtonState('loading');
			},
			onValidDidComplete: (response: LoginResponseDto) => {
				sheetApi.close();
				login(response.token);
			},
			onValidDidFail: () => {
				oneTimeCodeButtonStateApi.setButtonState('active');
			}
		}
	});

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

	useEffect(() => {
		const newButtonState = regexPatterns.phoneNumber.test(
			registerUserPhoneNumberFormApi.formMethods.watch('phone_number')
		)
			? 'active'
			: 'disabled';
		sendTextButtonStateApi.setButtonState(newButtonState);
	}, [registerUserPhoneNumberFormApi.formMethods.watch('phone_number')]);

	useEffect(() => {
		const newButtonState = regexPatterns.oneTimeCode.test(
			loginUserPhoneNumberFormApi.formMethods.watch('passcode')
		)
			? 'active'
			: 'disabled';
		oneTimeCodeButtonStateApi.setButtonState(newButtonState);
	}, [loginUserPhoneNumberFormApi.formMethods.watch('passcode')]);

	const onPressSendText = () => {
		sendTextButtonStateApi.setButtonState('loading');
		registerUserPhoneNumberFormApi.onSubmit();
	};

	const onPressCreateAccount = async () => {
		oneTimeCodeButtonStateApi.setButtonState('loading');
		loginUserPhoneNumberFormApi.formMethods.setValue(
			'phone_number',
			registerUserPhoneNumberFormApi.formMethods.getValues('phone_number')
		);
		loginUserPhoneNumberFormApi.onSubmit();
	};

	const onPressBack = () => {
		loginUserPhoneNumberFormApi.formMethods.reset();
		registerUserPhoneNumberFormApi.formMethods.reset();
		sendTextButtonStateApi.setButtonState('disabled');
		setStep(0);
	};

	const footerComponent = useCallback(
		(props: BottomSheetFooterProps) => {
			return (
				<FullScreenSheetFooter
					{...props}
					animatedKeyboard={keyboard}
					layoutApi={footerLayoutApi}
				>
					<View flexDirection='row' flex={1}>
						<View marginRight='s' flex={1}>
							{step === 0 ? (
								<Button
									text='cancel'
									variant='outlined'
									onPress={sheetApi.close}
								/>
							) : (
								<Button text='Back' variant='outlined' onPress={onPressBack} />
							)}
						</View>
						<View marginLeft='s' flex={1}>
							{step === 0 ? (
								<Button
									text='Send Text'
									color='p'
									onPress={onPressSendText}
									buttonState={sendTextButtonStateApi.buttonState}
								/>
							) : (
								<Button
									text='Login'
									color='p'
									onPress={onPressCreateAccount}
									buttonState={oneTimeCodeButtonStateApi.buttonState}
								/>
							)}
						</View>
					</View>
				</FullScreenSheetFooter>
			);
		},
		[
			sendTextButtonStateApi.buttonState,
			oneTimeCodeButtonStateApi.buttonState,
			step
		]
	);

	return (
		<FullScreenSheetWithHeaderAndFooter
			sheetApi={sheetApi}
			footerComponent={footerComponent}
			sheetDidOpen={textInputApi.focus}
			footerLayoutApi={footerLayoutApi}
		>
			<View margin='m'>
				<View marginTop='l' marginBottom='xl' alignItems='center'>
					<Icon name='logo' size='l' color='text.p' />
				</View>
				<Switch>
					<Case condition={step === 0}>
						<InputPhoneNumber
							registerUserPhoneNumberFormApi={registerUserPhoneNumberFormApi}
							textInputApi={textInputApi}
						/>
					</Case>
					<Case condition={step === 1}>
						<EnterCode
							loginUserPhoneNumberFormApi={loginUserPhoneNumberFormApi}
							textInputApi={textInputApi}
						/>
					</Case>
				</Switch>
			</View>
		</FullScreenSheetWithHeaderAndFooter>
	);
};

export default CreateAccountBottomSheet;
