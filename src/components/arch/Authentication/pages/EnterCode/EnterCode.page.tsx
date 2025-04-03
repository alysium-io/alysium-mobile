import useAuthFlow from '@arch/Authentication/useAuthFlow';
import { Icon, View } from '@atomic';
import { regexPatterns } from '@etc';
import { userApiSlice } from '@flux/api/user';
import { LoginUserPhoneNumberBodyDto } from '@flux/api/user/dto/user-login-phone.dto';
import { usePersistedAppState } from '@hooks';
import { ActionButtons, TextInputWithLabel, useButtonState } from '@molecules';
import { BasePage } from '@organisms';
import { useRoute } from '@react-navigation/native';
import { captureException } from '@sentry/react-native';
import { AuthStage } from '@types';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { EnterCodePageRouteProp } from '../../types';

const EnterCodePage = () => {
	const { params } = useRoute<EnterCodePageRouteProp>();
	const { back, acceptTermsPage, createHandlePage } = useAuthFlow();
	const oneTimeCodeButtonStateApi = useButtonState('disabled');
	const [loginPhoneNumberQuery] =
		userApiSlice.useLazyLoginUserPhoneNumberQuery();
	const { setPersistedAppState } = usePersistedAppState();
	const [privateFindOneUserQuery] =
		userApiSlice.useLazyPrivateFindOneUserQuery();

	const {
		handleSubmit,
		control,
		formState: { isValid }
	} = useForm<LoginUserPhoneNumberBodyDto>({
		defaultValues: {
			phone_number: params.phoneNumber,
			passcode: ''
		}
	});

	useEffect(() => {
		oneTimeCodeButtonStateApi.setButtonState(isValid ? 'active' : 'disabled');
	}, [isValid]);

	const onSubmitLogin = handleSubmit(
		async (data: LoginUserPhoneNumberBodyDto) => {
			try {
				oneTimeCodeButtonStateApi.setButtonState('loading');
				const res = await loginPhoneNumberQuery({ body: data }).unwrap();
				setPersistedAppState({ token: res.token });

				const user = await privateFindOneUserQuery().unwrap();
				if (user.has_accepted_terms === false) {
					acceptTermsPage(user);
				} else if (user.has_created_handle === false) {
					createHandlePage(user);
				} else {
					setPersistedAppState({ authStage: AuthStage.loggedIn });
				}
			} catch (err) {
				captureException(err);
				Toast.show({
					text1: 'Error Logging In',
					text2: 'Please try again.'
				});
				back();
			}
		}
	);

	return (
		<BasePage>
			<SafeAreaView>
				<View margin='m' gap='m'>
					<View alignItems='center'>
						<Icon name='logo' size='l' color='text.p' />
					</View>
					<Controller
						control={control}
						name='passcode'
						rules={{
							required: 'Please enter a code',
							pattern: {
								value: regexPatterns.oneTimeCode,
								message: 'Please enter a valid code'
							}
						}}
						render={({ field: { onChange } }) => (
							<TextInputWithLabel
								placeholder='Enter One Time Code'
								keyboardType='number-pad'
								textContentType='oneTimeCode'
								autoComplete='one-time-code'
								onChangeText={onChange}
								autoFocus
								maxLength={6}
							/>
						)}
					/>
					<ActionButtons
						buttonProps={[
							{
								text: 'Back',
								onPress: back,
								variant: 'outlined'
							},
							{
								text: 'Log In',
								color: 'p',
								onPress: onSubmitLogin,
								buttonState: oneTimeCodeButtonStateApi.buttonState
							}
						]}
					/>
				</View>
			</SafeAreaView>
		</BasePage>
	);
};

export default EnterCodePage;
