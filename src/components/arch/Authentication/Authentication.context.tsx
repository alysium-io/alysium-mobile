import { useDispatch } from '@flux';
import { serviceApi } from '@flux/api/base';
import { userApiSlice } from '@flux/api/user';
import { usePersistedArray } from '@flux/local/arrays/usePersistedArray';
import { createUseContextHook, usePersistedAppState } from '@hooks';
import { addBreadcrumb, captureException } from '@sentry/react-native';
import { AuthStage, ProviderProps } from '@types';
import React, { createContext, useEffect } from 'react';
import Toast from 'react-native-toast-message';

export type AuthenticationAppContextType = {
	logout: () => void;
	login: () => void;
	deleteAccount: () => void;
};

export const AuthenticationAppContext = createContext(
	{} as AuthenticationAppContextType
);

export const AuthenticationAppProvider: React.FC<ProviderProps> = ({
	children
}) => {
	const { token, setPersistedAppState, setPersistedAppStateWithDefaults } =
		usePersistedAppState();
	const [privateFindOneUserQuery] =
		userApiSlice.useLazyPrivateFindOneUserQuery();
	const [deleteUserMutation] = userApiSlice.useDeleteUserMutation();
	const dispatch = useDispatch();
	const { reset: resetPersistedArrayArtists } = usePersistedArray(
		'homeRecentSearchArtists'
	);
	const { reset: resetPersistedArrayScenes } = usePersistedArray(
		'homeRecentSearchScenes'
	);

	useEffect(() => {
		if (token) {
			login();
		} else {
			logout();
		}
	}, []);

	const login = async () => {
		try {
			await privateFindOneUserQuery().unwrap();
			setPersistedAppState({
				authStage: AuthStage.loggedIn
			});
		} catch (err) {
			addBreadcrumb({
				level: 'error',
				message: 'Error fetching user with token in AuthenticationAppContext',
				category: 'authentication'
			});
			captureException(err);
			logout();
		}
	};

	const logout = () => {
		dispatch(serviceApi.util.resetApiState());
		resetPersistedArrayArtists();
		resetPersistedArrayScenes();
		setPersistedAppStateWithDefaults({
			authStage: AuthStage.loggedOut,
			token: null
		});
	};

	const deleteAccount = async () => {
		deleteUserMutation()
			.unwrap()
			.then(logout)
			.catch((err) => {
				captureException(err);
				Toast.show({
					text1: 'Error',
					text2: 'Failed to delete account.'
				});
			});
	};

	return (
		<AuthenticationAppContext.Provider
			value={{
				logout,
				login,
				deleteAccount
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
