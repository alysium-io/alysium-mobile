import { artistApiSlice } from '@flux/api/artist';
import { Artist } from '@flux/api/artist/artist.entity';
import { MediaRefType } from '@flux/api/media/media.entity';
import { createUseContextHook, useMedia } from '@hooks';
import { ProviderProps } from '@types';
import React, { createContext } from 'react';
import { Asset } from 'react-native-image-picker';
import { useUserAppContext } from './User.context';

export type ArtistAppContextType = {
	artistData: Artist;
	artistError: any;
	artistIsLoading: boolean;
	setArtistProfileImage: (image: Asset) => void;
};

export const ArtistAppContext = createContext({} as ArtistAppContextType);

export const ArtistAppProvider: React.FC<ProviderProps> = ({ children }) => {
	const { personaId } = useUserAppContext();

	const {
		data: artistData,
		error: artistError,
		isLoading: artistIsLoading
	} = artistApiSlice.useFindOneQuery({
		params: { artist_id: personaId }
	});

	const { uploadMedia } = useMedia();
	const setArtistProfileImage = (image: Asset) => {
		if (artistData) {
			uploadMedia(
				{
					ref: MediaRefType.artist,
					refId: artistData.artist_id,
					field: 'profile_image'
				},
				image
			);
		}
	};

	if (!artistData) {
		return <></>;
	}

	return (
		<ArtistAppContext.Provider
			value={{
				artistData,
				artistError,
				artistIsLoading,
				setArtistProfileImage
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
