import { useDispatch } from '@flux';
import { serviceApi } from '@flux/api/base';
import { userApiSlice } from '@flux/api/user';
import { usePersistedArray } from '@flux/local/arrays/usePersistedArray';
import { createUseContextHook, usePersistedAppState } from '@hooks';
import { AuthStage, ProviderProps } from '@types';
import React, { createContext, useEffect } from 'react';
import Toast from 'react-native-toast-message';

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
	const [privateFindOneUserQuery] =
		userApiSlice.useLazyPrivateFindOneUserQuery();
	const [deleteUserMutation] = userApiSlice.useDeleteUserMutation();
	const [loginGuestQuery] = userApiSlice.useLazyLoginGuestUserQuery();
	const dispatch = useDispatch();
	const { reset: resetPersistedArrayArtists } = usePersistedArray(
		'homeRecentSearchArtists'
	);
	const { reset: resetPersistedArrayScenes } = usePersistedArray(
		'homeRecentSearchScenes'
	);

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
						Toast.show({
							text1: 'Error',
							text2: 'Unable to log in, please try again later.'
						});
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
		resetPersistedArrayArtists();
		resetPersistedArrayScenes();
		setPersistedAppStateWithDefaults({
			authStage: AuthStage.loggedOut,
			token: null
		});
	};

	const login = (token: string) => {
		setPersistedAppState({
			token,
			authStage: AuthStage.loggedIn
		});
	};

	const deleteAccount = async () => {
		deleteUserMutation()
			.unwrap()
			.then(logout)
			.catch(() => {
				Toast.show({
					text1: 'Error',
					text2: 'Failed to delete account.'
				});
			});
	};

	const loginGuest = async () => {
		loginGuestQuery()
			.unwrap()
			.then(({ token }) => login(token))
			.catch(() => {
				Toast.show({
					text1: 'Error',
					text2: 'Failed to login as guest.'
				});
			});
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
