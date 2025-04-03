import { useAuthenticationAppContext } from '@arch/Authentication/Authentication.context';
import useAuthFlow from '@arch/Authentication/useAuthFlow';
import { Icon, Text, View } from '@atomic';
import { userApiSlice } from '@flux/api/user';
import { useSheet } from '@hooks';
import { ActionButtons, useButtonState } from '@molecules';
import { BasePage } from '@organisms';
import { PrivacyPolicyBottomSheet, TermsOfServiceBottomSheet } from '@popups';
import { useRoute } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { AcceptTermsPageRouteProp } from '../../types';

const AcceptTermsPage = () => {
	const { params } = useRoute<AcceptTermsPageRouteProp>();
	const termsOfServiceSheetApi = useSheet();
	const privacyPolicySheetApi = useSheet();
	const buttonStateApi = useButtonState('active');
	const [acceptTermsMutation] = userApiSlice.useAcceptTermsMutation();
	const { logout } = useAuthenticationAppContext();
	const { createHandlePage, allTheWayBack } = useAuthFlow();

	const onPressAgree = async () => {
		try {
			buttonStateApi.setButtonState('loading');
			await acceptTermsMutation().unwrap();
			buttonStateApi.setButtonState('active');
			createHandlePage(params.user);
		} catch (error) {
			console.log(error);
			Toast.show({
				text1: 'Error accepting terms',
				text2: 'Please try again.'
			});
		}
	};

	return (
		<BasePage>
			<SafeAreaView>
				<View margin='m' gap='xl'>
					<View alignItems='center'>
						<Icon name='logo' size='l' color='text.p' />
					</View>
					<Text variant='section-header-1' textAlign='center'>
						Terms & Conditions
					</Text>
					<Text variant='paragraph-small' textAlign='center'>
						By pressing 'I agree', you agree to the{' '}
						<Text
							variant='paragraph-small'
							textDecorationLine='underline'
							onPress={termsOfServiceSheetApi.open}
						>
							Terms of Service
						</Text>{' '}
						and{' '}
						<Text
							variant='paragraph-small'
							textDecorationLine='underline'
							onPress={privacyPolicySheetApi.open}
						>
							Privacy Policy
						</Text>
					</Text>
					<ActionButtons
						buttonProps={[
							{
								text: 'cancel',
								onPress: () => {
									logout();
									allTheWayBack();
								},
								variant: 'outlined'
							},
							{
								text: 'I agree',
								onPress: onPressAgree,
								buttonState: buttonStateApi.buttonState
							}
						]}
					/>
				</View>
				<TermsOfServiceBottomSheet sheetApi={termsOfServiceSheetApi} />
				<PrivacyPolicyBottomSheet sheetApi={privacyPolicySheetApi} />
			</SafeAreaView>
		</BasePage>
	);
};

export default AcceptTermsPage;
