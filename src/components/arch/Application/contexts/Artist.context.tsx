import { artistApiSlice } from '@flux/api/artist';
import { PrivateArtist } from '@flux/api/artist/artist.entity';
import { createUseContextHook } from '@hooks';
import { ProviderProps } from '@types';
import React, { createContext, useEffect } from 'react';
import { useUserAppContext } from './User.context';

export type ArtistAppContextType = {
	artistData: PrivateArtist;
	artistError: any;
	artistIsLoading: boolean;
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

	if (!artistData) {
		return <></>;
	}

	return (
		<ArtistAppContext.Provider
			value={{
				artistData,
				artistError,
				artistIsLoading
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
