import { artistApiSlice } from '@flux/api/artist';
import { Artist } from '@flux/api/artist/artist.entity';
import { createUseContextHook, useAuth } from '@hooks';
import { ApiIdentifier, Persona, ProviderProps } from '@types';
import React, { createContext } from 'react';
import { usePersonaAppContext } from './PersonaAppContext';

const { useFindOneQuery } = artistApiSlice;

export type ArtistAppContextType = {
	artist?: Artist;
	error: any;
	isLoading: boolean;
	artistId: ApiIdentifier;
};

export const ArtistAppContext = createContext({} as ArtistAppContextType);

export const ArtistAppProvider: React.FC<ProviderProps> = ({ children }) => {
	const { personaId, personaType } = usePersonaAppContext();
	const { logout } = useAuth();
	if (personaType !== Persona.artist || personaId === null) {
		logout();
		return <></>;
	}

	const { data, error, isLoading } = useFindOneQuery({
		params: { artist_id: personaId }
	});

	return (
		<ArtistAppContext.Provider
			value={{
				artist: data,
				error,
				isLoading,
				artistId: personaId
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
