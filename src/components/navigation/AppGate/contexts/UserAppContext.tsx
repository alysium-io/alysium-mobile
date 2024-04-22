import { createUseContextHook, usePersona } from '@hooks';
import { ProviderProps } from '@types';
import React, { createContext } from 'react';
import { userApiSlice } from 'src/redux/api/user';
import { User } from 'src/redux/api/user/user.entity';

const { useMeQuery } = userApiSlice;

export type UserAppContextType = {
	user?: User;
	error: any;
	isLoading: boolean;
};

export const UserAppContext = createContext({} as UserAppContextType);

export const UserAppProvider: React.FC<ProviderProps> = ({ children }) => {
	const { data, error, isLoading } = useMeQuery();
	const { initializePersona } = usePersona();
	if (data) initializePersona(data.user_id);

	return (
		<UserAppContext.Provider
			value={{
				user: data,
				error,
				isLoading
			}}
		>
			{children}
		</UserAppContext.Provider>
	);
};

export const useUserAppContext = createUseContextHook<UserAppContextType>(
	UserAppContext,
	'UserAppContext'
);
