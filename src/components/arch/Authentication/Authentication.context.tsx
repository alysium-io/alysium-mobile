import { userApiSlice } from '@flux/api/user';
import { createUseContextHook, usePersistedAppState } from '@hooks';
import { AuthStage, ProviderProps } from '@types';
import React, { createContext, useState } from 'react';

export type AuthenticationAppContextType = {
	authStage: AuthStage;
	setAuthStage: React.Dispatch<React.SetStateAction<AuthStage>>;
	me: () => Promise<void>;
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
	const { token, setPersistedAppState } = usePersistedAppState();
	const [meQuery] = userApiSlice.useLazyMeQuery();
	const [loginQuery] = userApiSlice.useLazyLoginQuery();
	const [authStage, setAuthStage] = useState<AuthStage>(AuthStage.loading);

	const me = async () => {
		if (token) {
			await meQuery();
			setAuthStage(AuthStage.loggedIn);
		} else {
			setAuthStage(AuthStage.loggedOut);
		}
	};

	const logout = () => {
		setPersistedAppState({ token: null });
		setAuthStage(AuthStage.loggedOut);
	};

	const login = async (email: string, password: string) => {
		const { data, error } = await loginQuery({
			body: { email, password }
		});
		if (error) {
			logout();
		}
		if (data) {
			setPersistedAppState({ token: data.token });
			setAuthStage(AuthStage.loggedIn);
		}
	};

	return (
		<AuthenticationAppContext.Provider
			value={{
				authStage,
				setAuthStage,
				me,
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
