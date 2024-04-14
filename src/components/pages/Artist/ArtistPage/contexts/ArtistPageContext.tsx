import { SheetApi, useNavigation, useSheet } from '@hooks';
import { useRoute } from '@react-navigation/native';
import { ArtistPageRouteProp, ProviderProps } from '@types';
import React, { createContext } from 'react';
import { artistApiSlice } from 'src/redux/api';
import { Artist } from 'src/redux/api/artist/artist.entity';

const { useFindOneQuery } = artistApiSlice;

export type ArtistPageContextType = {
	moreSheetApi: SheetApi;
	notificationsSheetApi: SheetApi;
	linksSheetApi: SheetApi;
	onPressFollowers: () => void;
	onPressShows: () => void;
	data: Artist | undefined;
	isLoading: boolean;
	error: any;
};

export const ArtistPageContext = createContext({} as ArtistPageContextType);

export const ArtistPageProvider: React.FC<ProviderProps> = ({ children }) => {
	const route = useRoute<ArtistPageRouteProp>();
	const { data, isLoading, error } = useFindOneQuery({
		params: { artist_id: route.params.artistId }
	});
	const { artistFollowersAndShowsPage } = useNavigation();

	const moreSheetApi = useSheet();
	const notificationsSheetApi = useSheet();
	const linksSheetApi = useSheet();

	const onPressFollowers = () =>
		artistFollowersAndShowsPage(route.params.artistId, 0);
	const onPressShows = () =>
		artistFollowersAndShowsPage(route.params.artistId, 1);

	return (
		<ArtistPageContext.Provider
			value={{
				moreSheetApi,
				notificationsSheetApi,
				linksSheetApi,
				onPressFollowers,
				onPressShows,
				data,
				isLoading,
				error
			}}
		>
			{children}
		</ArtistPageContext.Provider>
	);
};
