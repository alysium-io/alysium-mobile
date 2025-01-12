import { artistApiSlice } from '@flux/api/artist';
import { PrivateFindAllArtistsResponseDto } from '@flux/api/artist/dto/artist-find-all.dto';
import { profileImageApiSlice } from '@flux/api/profile-image';
import { userApiSlice } from '@flux/api/user';
import { PrivateUser } from '@flux/api/user/user.entity';
import { createUseContextHook, SheetApi, useSheet } from '@hooks';
import { useBehaviorContext } from '@src/utils/contexts/Behavior';
import { NanoId, Persona, ProviderProps } from '@types';
import React, { createContext, useEffect } from 'react';
import { Asset } from 'react-native-image-picker';
import { usePersonaAppContext } from './Persona.context';

export type UserAppContextType = {
	personaId: NanoId;
	personaType: Persona;
	userData: PrivateUser;
	userError: any;
	userIsLoading: boolean;
	setUserProfileImage: (image: Asset) => void;
	createAccountBottomSheetApi: SheetApi;
	checkUserWantsToRegisterBottomSheet: SheetApi;
	userArtistsData: PrivateFindAllArtistsResponseDto;
	revertToUser: () => void;
	numberOfAccounts: number;
};

export const UserAppContext = createContext({} as UserAppContextType);

export const UserAppProvider: React.FC<ProviderProps> = ({ children }) => {
	const createAccountBottomSheetApi = useSheet();
	const checkUserWantsToRegisterBottomSheet = useSheet();
	const { personaId, personaType, initializePersona, changePersona } =
		usePersonaAppContext();
	const {
		data: userData,
		error: userError,
		isLoading: userIsLoading
	} = userApiSlice.usePrivateFindOneUserQuery();
	const [createUserProfileImageMutation] =
		profileImageApiSlice.useCreateUserProfileImageMutation();
	const { setBehaviorUserUid } = useBehaviorContext();
	const { data: userArtistsData } =
		artistApiSlice.usePrivateFindAllArtistsQuery();

	useEffect(() => {
		if (userData) {
			initializePersona(userData.user_uid);
			setBehaviorUserUid(userData.user_uid);
		}
	}, [userData]);

	const setUserProfileImage = (image: Asset) => {
		if (userData) {
			createUserProfileImageMutation({ file: image });
		}
	};

	const revertToUser = () => {
		// If for any reason run into a complication where being a "persona" is not
		// working out, then we can revert to being a user.
		// For example, let's say your app is currently logged in and "personified"
		// as an artist, but you make a call to the api to delete that artist account.
		// When you open the app and the local storage says you're currently still that artist
		// and that request fails, it should revert to being a user.
		if (userData) {
			changePersona(Persona.user, userData.user_uid);
		}
	};

	if (!userData || !userArtistsData || personaId === null) {
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
				setUserProfileImage,
				createAccountBottomSheetApi,
				checkUserWantsToRegisterBottomSheet,
				userArtistsData,
				revertToUser,
				numberOfAccounts: userArtistsData.length + 1
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
