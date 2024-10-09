import { usePersonaAppContext } from '@arch/Application/contexts/Persona.context';
import { useAuthenticationAppContext } from '@arch/Authentication/Authentication.context';
import { Icon, View } from '@atomic';
import { regexPatterns } from '@etc';
import { userApiSlice } from '@flux/api/user';
import { LoginResponseDto } from '@flux/api/user/dto/user-login.dto';
import { BottomSheetFooterProps } from '@gorhom/bottom-sheet';
import { SheetApi, useLayoutDimensions, useTextInput, useToast } from '@hooks';
import { Button, useButtonState } from '@molecules';
import { FullScreenSheet } from '@organisms';
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
	const { toastSuccess } = useToast();
	const { login } = useAuthenticationAppContext();
	const { setIsPersonaLoading } = usePersonaAppContext();
	const [privateFindOneUserQuery] =
		userApiSlice.useLazyPrivateFindOneUserQuery();
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
				setIsPersonaLoading(true);
				login(response.token);
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
					toastSuccess('Logged in as: ' + user.handle);
				}, 300);
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

	const onPressCancel = () => {
		sheetApi.close();
		setTimeout(() => {
			loginUserPhoneNumberFormApi.formMethods.reset();
			registerUserPhoneNumberFormApi.formMethods.reset();
			setStep(0);
		}, 300);
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
									onPress={onPressCancel}
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
		<FullScreenSheet
			sheetApi={sheetApi}
			footerComponent={footerComponent}
			sheetDidOpen={textInputApi.focus}
			footerLayoutApi={footerLayoutApi}
			onDismiss={onPressCancel}
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
		</FullScreenSheet>
	);
};

export default CreateAccountBottomSheet;
