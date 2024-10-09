import { artistApiSlice } from '@flux/api/artist';
import { PrivateFindAllArtistsResponseDto } from '@flux/api/artist/dto/artist-find-all.dto';
import { profileImageApiSlice } from '@flux/api/profile-image';
import { userApiSlice } from '@flux/api/user';
import { PrivateUser } from '@flux/api/user/user.entity';
import { createUseContextHook, SheetApi, useSheet } from '@hooks';
import { useBehaviorContext } from '@src/utils/contexts/Behavior';
import { ApiIdentifier, Persona, ProviderProps } from '@types';
import React, { createContext, useEffect } from 'react';
import { Asset } from 'react-native-image-picker';
import { usePersonaAppContext } from './Persona.context';

export type UserAppContextType = {
	personaId: ApiIdentifier;
	personaType: Persona;
	userData: PrivateUser;
	userError: any;
	userIsLoading: boolean;
	setUserProfileImage: (image: Asset) => void;
	createAccountBottomSheetApi: SheetApi;
	checkUserWantsToRegisterBottomSheet: SheetApi;
	userArtistsData: PrivateFindAllArtistsResponseDto;
};

export const UserAppContext = createContext({} as UserAppContextType);

export const UserAppProvider: React.FC<ProviderProps> = ({ children }) => {
	const createAccountBottomSheetApi = useSheet();
	const checkUserWantsToRegisterBottomSheet = useSheet();
	const { personaId, personaType, initializePersona } = usePersonaAppContext();
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
				userArtistsData
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
