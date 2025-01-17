import { useDispatch } from '@flux';
import { serviceApi } from '@flux/api/base';
import { userApiSlice } from '@flux/api/user';
import { createUseContextHook, usePersistedAppState, useToast } from '@hooks';
import { AuthStage, ProviderProps } from '@types';
import React, { createContext, useEffect } from 'react';

export type AuthenticationAppContextType = {
	authStage: AuthStage;
	token: string | null;
	logout: () => void;
	deleteAccount: () => void;
	loginGuest: () => void;
	login: (token: string) => void;
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
	const { toastError } = useToast();
	const [privateFindOneUserQuery] =
		userApiSlice.useLazyPrivateFindOneUserQuery();
	const [deleteUserMutation] = userApiSlice.useDeleteUserMutation();
	const [loginGuestQuery] = userApiSlice.useLazyLoginGuestUserQuery();
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchMe = async () => {
			if (token !== null) {
				privateFindOneUserQuery()
					.unwrap()
					.then(() => {
						setPersistedAppState({
							authStage: AuthStage.loggedIn
						});
					})
					.catch(() => {
						logout();
					});
			} else {
				if (authStage !== AuthStage.loggedOut) {
					console.log('No token found, setting user to logged out.');
					dispatch(serviceApi.util.resetApiState());
					logout();
				}
			}
		};
		fetchMe();
	}, [token]);

	const logout = () => {
		dispatch(serviceApi.util.resetApiState());
		setPersistedAppStateWithDefaults({
			authStage: AuthStage.loggedOut,
			token: null
		});
	};

	const login = (token: string) => {
		dispatch(serviceApi.util.resetApiState());
		setPersistedAppState({
			token,
			authStage: AuthStage.loggedIn
		});
	};

	const deleteAccount = async () => {
		deleteUserMutation()
			.unwrap()
			.then(logout)
			.catch(() => toastError());
	};

	const loginGuest = async () => {
		loginGuestQuery()
			.unwrap()
			.then(({ token }) => login(token))
			.catch(() => toastError());
	};

	return (
		<AuthenticationAppContext.Provider
			value={{
				authStage,
				token,
				logout,
				deleteAccount,
				loginGuest,
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
