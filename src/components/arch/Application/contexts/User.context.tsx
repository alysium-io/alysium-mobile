import { artistApiSlice } from '@flux/api/artist';
import { FindAllArtistsResponseDto } from '@flux/api/artist/dto/artist-find-all.dto';
import { hostApiSlice } from '@flux/api/host';
import { FindAllHostsResponseDto } from '@flux/api/host/dto/host-find-all.dto';
import { userApiSlice } from '@flux/api/user';
import { User } from '@flux/api/user/user.entity';
import { createUseContextHook, usePersona } from '@hooks';
import { ProviderProps } from '@types';
import React, { createContext } from 'react';

export type UserAppContextType = {
	userData: User;
	userError: any;
	userIsLoading: boolean;
	userArtists: FindAllArtistsResponseDto[];
	userArtistsError: any;
	userArtistsIsLoading: boolean;
	userHosts: FindAllHostsResponseDto[];
	userHostsError: any;
	userHostsIsLoading: boolean;
};

export const UserAppContext = createContext({} as UserAppContextType);

export const UserAppProvider: React.FC<ProviderProps> = ({ children }) => {
	const {
		data: userData,
		error: userError,
		isLoading: userIsLoading
	} = userApiSlice.useMeQuery();
	const { initializePersona } = usePersona();
	if (userData) initializePersona(userData.user_id);

	if (!userData) {
		return <></>;
	}

	const {
		data: userArtists,
		error: userArtistsError,
		isLoading: userArtistsIsLoading
	} = artistApiSlice.useFindAllQuery({ query: { page: 1, limit: 10 } });

	const {
		data: userHosts,
		error: userHostsError,
		isLoading: userHostsIsLoading
	} = hostApiSlice.useFindAllQuery({ query: { page: 1, limit: 10 } });

	if (!userArtists || !userHosts) {
		return <></>;
	}

	return (
		<UserAppContext.Provider
			value={{
				userData,
				userError,
				userIsLoading,
				userArtists,
				userArtistsError,
				userArtistsIsLoading,
				userHosts,
				userHostsError,
				userHostsIsLoading
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
