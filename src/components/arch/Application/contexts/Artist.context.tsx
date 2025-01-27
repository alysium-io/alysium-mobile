import { artistApiSlice } from '@flux/api/artist';
import { PrivateArtist } from '@flux/api/artist/artist.entity';
import { UserArtistLinkPermissions } from '@flux/api/user-artist-link/types';
import { createUseContextHook } from '@hooks';
import { NanoId, ProviderProps } from '@types';
import React, { createContext, useEffect } from 'react';
import { useUserAppContext } from './User.context';

export type ArtistAppContextType = {
	artist_uid: NanoId;
	artistData: PrivateArtist;
	artistError: any;
	artistIsLoading: boolean;
	permissions: UserArtistLinkPermissions | null;
	isEditable: boolean;
};

export const ArtistAppContext = createContext({} as ArtistAppContextType);

export const ArtistAppProvider: React.FC<ProviderProps> = ({ children }) => {
	const { personaId, revertToUser } = useUserAppContext();

	const {
		data: artistData,
		error: artistError,
		isLoading: artistIsLoading
	} = artistApiSlice.usePrivateFindOneArtistQuery({
		params: { artist_uid: personaId }
	});

	useEffect(() => {
		if (artistError && 'status' in artistError) {
			revertToUser();
		}
	}, [artistError]);

	const isEditable =
		artistData?.user?.permissions === UserArtistLinkPermissions.manager ||
		artistData?.user?.permissions === UserArtistLinkPermissions.owner;

	if (!artistData) {
		return <></>;
	}

	return (
		<ArtistAppContext.Provider
			value={{
				artist_uid: artistData.artist_uid,
				artistData,
				artistError,
				artistIsLoading,
				permissions: artistData.user?.permissions ?? null,
				isEditable
			}}
		>
			{children}
		</ArtistAppContext.Provider>
	);
};

export const useArtistAppContext = createUseContextHook<ArtistAppContextType>(
	ArtistAppContext,
	'ArtistAppContext'
);
