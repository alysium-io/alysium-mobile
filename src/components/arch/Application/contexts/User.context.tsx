import { artistApiSlice } from '@flux/api/artist';
import { PrivateFindAllArtistsResponseDto } from '@flux/api/artist/dto/artist-find-all.dto';
import { hostApiSlice } from '@flux/api/host';
import { FindAllHostsResponseDto } from '@flux/api/host/dto/host-find-all.dto';
import { profileImageApiSlice } from '@flux/api/profile-image';
import { userApiSlice } from '@flux/api/user';
import { PrivateUser } from '@flux/api/user/user.entity';
import { createUseContextHook, usePersona } from '@hooks';
import { ApiIdentifier, Persona, ProviderProps } from '@types';
import React, { createContext, useEffect } from 'react';
import { Asset } from 'react-native-image-picker';

export type UserAppContextType = {
	personaId: ApiIdentifier;
	personaType: Persona;
	userData: PrivateUser;
	userError: any;
	userIsLoading: boolean;
	userArtists: PrivateFindAllArtistsResponseDto[];
	userArtistsError: any;
	userArtistsIsLoading: boolean;
	userHosts: FindAllHostsResponseDto[];
	userHostsError: any;
	userHostsIsLoading: boolean;
	setUserProfileImage: (image: Asset) => void;
};

export const UserAppContext = createContext({} as UserAppContextType);

export const UserAppProvider: React.FC<ProviderProps> = ({ children }) => {
	const { personaId, personaType } = usePersona();
	const {
		data: userData,
		error: userError,
		isLoading: userIsLoading
	} = userApiSlice.usePrivateFindOneQuery();
	const { initializePersona } = usePersona();
	const [createUserProfileImageMutation] =
		profileImageApiSlice.useCreateMutation();

	useEffect(() => {
		if (userData) initializePersona(userData.user_uid);
	}, [userData]);

	const setUserProfileImage = (image: Asset) => {
		if (userData) {
			createUserProfileImageMutation({ file: image });
		}
	};

	const {
		data: userArtists,
		error: userArtistsError,
		isLoading: userArtistsIsLoading
	} = artistApiSlice.usePrivateFindAllQuery({ query: { page: 1, limit: 10 } });

	const {
		data: userHosts,
		error: userHostsError,
		isLoading: userHostsIsLoading
	} = hostApiSlice.useFindAllQuery({ query: { page: 1, limit: 10 } });

	if (!userData || !userArtists || !userHosts || personaId === null) {
		return <></>;
	}

	return (
		<UserAppContext.Provider
			value={{
				personaId,
				personaType,
				userData,
				userError,
				userIsLoading,
				userArtists,
				userArtistsError,
				userArtistsIsLoading,
				userHosts,
				userHostsError,
				userHostsIsLoading,
				setUserProfileImage
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
