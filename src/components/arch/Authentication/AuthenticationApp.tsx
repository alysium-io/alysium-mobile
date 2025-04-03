import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {
	AcceptTermsPage,
	CreateHandlePage,
	EnterCodePage,
	FanAccountCreatedPage,
	RegisterUserPhoneNumberPage
} from './pages';
import { AuthenticationStackNavigatorParamList } from './types';

export const AuthenticationStack =
	createNativeStackNavigator<AuthenticationStackNavigatorParamList>();

const AuthenticationApp = () => {
	return (
		<NavigationContainer>
			<AuthenticationStack.Navigator
				screenOptions={{
					headerShown: false
				}}
			>
				<AuthenticationStack.Screen
					name='RegisterUserPhoneNumberPage'
					component={RegisterUserPhoneNumberPage}
				/>

				<AuthenticationStack.Screen
					name='AcceptTermsPage'
					component={AcceptTermsPage}
				/>

				<AuthenticationStack.Screen
					name='CreateHandlePage'
					component={CreateHandlePage}
				/>

				<AuthenticationStack.Screen
					name='EnterCodePage'
					component={EnterCodePage}
				/>

				<AuthenticationStack.Screen
					name='FanAccountCreatedPage'
					component={FanAccountCreatedPage}
				/>
			</AuthenticationStack.Navigator>
		</NavigationContainer>
	);
};

export default AuthenticationApp;
