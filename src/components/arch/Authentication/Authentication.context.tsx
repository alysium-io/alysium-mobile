import { Formatting } from '@etc';
import { userApiSlice } from '@flux/api/user';
import { createUseContextHook, usePersistedAppState } from '@hooks';
import { AuthStage, ProviderProps } from '@types';
import React, { createContext, useEffect, useState } from 'react';

export type ScreenState = 'login-phone' | 'continue-phone';
export type AuthenticationState = {
	screen: ScreenState;
	phone_number: string;
	passcode: string;
	isLoading: boolean;
};

const initialState: AuthenticationState = {
	screen: 'continue-phone',
	phone_number: '',
	passcode: '',
	isLoading: false
};

export type AuthenticationAppContextType = {
	authStage: AuthStage;
	token: string | null;
	state: AuthenticationState;
	logout: () => void;
	loginEmail: (email: string, password: string) => Promise<void>;
	continuePhoneNumber: () => Promise<void>;
	loginPhoneNumber: () => void;
	setPhoneNumber: (phone_number: string) => void;
	setCode: (passcode: string) => void;
	resetState: () => void;
};

export const AuthenticationAppContext = createContext(
	{} as AuthenticationAppContextType
);

export const AuthenticationAppProvider: React.FC<ProviderProps> = ({
	children
}) => {
	const {
		token,
		setPersistedAppState,
		setPersistedAppStateWithDefaults,
		authStage
	} = usePersistedAppState();
	const [loginQuery] = userApiSlice.useLazyLoginQuery();
	const [meQuery] = userApiSlice.useLazyMeQuery();
	const [registerPhoneNumberQuery] =
		userApiSlice.useLazyRegisterPhoneNumberQuery();
	const [loginPhoneNumberQuery] = userApiSlice.useLazyLoginPhoneNumberQuery();

	const [state, setState] = useState<AuthenticationState>(initialState);

	const setPhoneNumber = (phone_number: string) => {
		setState({
			...state,
			phone_number: Formatting.formatPhoneNumber(phone_number)
		});
	};

	const setCode = (passcode: string) => {
		setState({
			...state,
			passcode
		});
	};

	const goToOneTimeCode = () => {
		setState({
			...state,
			isLoading: false,
			screen: 'login-phone'
		});
	};

	const resetState = () => {
		setState(initialState);
	};

	const setIsLoading = (isLoading: boolean) => {
		setState({
			...state,
			isLoading
		});
	};

	useEffect(() => {
		const fetchMe = async () => {
			if (token !== null) {
				if (authStage !== AuthStage.loggedIn) {
					console.log(`Existing token found: ${token}`);
					const { error } = await meQuery();

					if (error) {
						console.log('Failed to fetch user data.', error);
						logout();
					} else {
						console.log('Successfully fetched user data.');
						setPersistedAppState({
							authStage: AuthStage.loggedIn
						});
					}
				}
			} else {
				if (authStage !== AuthStage.loggedOut) {
					console.log('No token found, setting user to logged out.');
					logout();
				}
			}
		};
		fetchMe();
	}, [token]);

	const logout = () => {
		setPersistedAppStateWithDefaults({
			authStage: AuthStage.loggedOut,
			token: null
		});
		resetState();
	};

	const login = (token: string) => {
		setPersistedAppState({
			token,
			authStage: AuthStage.loggedIn
		});
		resetState();
	};

	const loginEmail = async (email: string, password: string) => {
		setPersistedAppState({ authStage: AuthStage.loading });
		const { data, error } = await loginQuery({
			body: { email, password }
		});

		if (error) {
			logout();
		}
		if (data) {
			login(data.token);
		}
	};

	const continuePhoneNumber = async () => {
		setIsLoading(true);
		const { data, error } = await registerPhoneNumberQuery({
			body: {
				phone_number: '+1' + Formatting.cleanStringToNumber(state.phone_number)
			}
		});

		if (error) {
			logout();
		}

		if (data) {
			goToOneTimeCode();
		}
	};

	const loginPhoneNumber = async () => {
		const { data, error } = await loginPhoneNumberQuery({
			body: {
				phone_number: '+1' + Formatting.cleanStringToNumber(state.phone_number),
				passcode: state.passcode
			}
		});

		if (error) {
			console.log('Failed to login with phone number.', error);
			logout();
		}

		if (data) {
			login(data.token);
		}
	};

	return (
		<AuthenticationAppContext.Provider
			value={{
				authStage,
				token,
				logout,
				loginEmail,
				state,
				continuePhoneNumber,
				loginPhoneNumber,
				setPhoneNumber,
				setCode,
				resetState
			}}
		>
			{children}
		</AuthenticationAppContext.Provider>
	);
};

export const useAuthenticationAppContext =
	createUseContextHook<AuthenticationAppContextType>(
		AuthenticationAppContext,
		'AuthenticationAppContext'
	);
