import { userApiSlice } from '@flux/api/user';
import { createUseContextHook, usePersistedAppState } from '@hooks';
import { AuthStage, ProviderProps } from '@types';
import React, { createContext, useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';

export type AuthenticationAppContextType = {
	authStage: AuthStage;
	token: string | null;
	logout: () => void;
	login: (email: string, password: string) => Promise<void>;
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
			SplashScreen.hide();
		};
		fetchMe();
	}, [token]);

	const logout = () => {
		setPersistedAppStateWithDefaults({
			authStage: AuthStage.loggedOut,
			token: null
		});
	};

	const login = async (email: string, password: string) => {
		setPersistedAppState({ authStage: AuthStage.loading });
		console.log('Starting: ', { email, password });
		const { data, error } = await loginQuery({
			body: { email, password }
		});
		console.log('Finished: ', { data, error });
		if (error) {
			logout();
		}
		if (data) {
			setPersistedAppState({
				token: data.token,
				authStage: AuthStage.loggedIn
			});
		}
	};

	return (
		<AuthenticationAppContext.Provider
			value={{
				authStage,
				token,
				logout,
				login
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
