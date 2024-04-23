import { Artist, artistApiSlice } from '@flux/api/artist';
import { SheetApi, createUseContextHook, useSheet } from '@hooks';
import { useRoute } from '@react-navigation/native';
import { ArtistPageRouteProp, ProviderProps } from '@types';
import React, { createContext } from 'react';

export type ArtistPageContextType = {
	moreSheetApi: SheetApi;
	notificationsSheetApi: SheetApi;
	linksSheetApi: SheetApi;
	onPressFollowers: () => void;
	onPressShows: () => void;
	openLinks: () => void;
	artistData: Artist;
	artistIsLoading: boolean;
	artistError: any;
};

export const ArtistPageContext = createContext({} as ArtistPageContextType);

export const ArtistPageProvider: React.FC<ProviderProps> = ({ children }) => {
	const route = useRoute<ArtistPageRouteProp>();
	const {
		data: artistData,
		isLoading: artistIsLoading,
		error: artistError
	} = artistApiSlice.useFindOneQuery({
		params: { artist_id: route.params.artistId }
	});

	const moreSheetApi = useSheet();
	const notificationsSheetApi = useSheet();
	const linksSheetApi = useSheet();

	const onPressFollowers = () => console.log('Followers');
	const onPressShows = () => console.log('Shows');
	const openLinks = () => console.log('Links');

	if (!artistData) {
		return <></>;
	}

	return (
		<ArtistPageContext.Provider
			value={{
				moreSheetApi,
				notificationsSheetApi,
				linksSheetApi,
				onPressFollowers,
				onPressShows,
				openLinks,
				artistData,
				artistIsLoading,
				artistError
			}}
		>
			{children}
		</ArtistPageContext.Provider>
	);
};

export const useArtistPageContext = createUseContextHook<ArtistPageContextType>(
	ArtistPageContext,
	'ArtistPageContext'
);
